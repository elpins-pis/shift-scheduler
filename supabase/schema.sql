create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('ADMIN', 'USER')),
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create table public.employees (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  role text not null default 'USER' check (role in ('ADMIN', 'USER')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (workspace_id, name)
);

create table public.shift_types (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  icon text not null default '*',
  color text not null default '#3182f6',
  category text not null default 'WORK' check (category in ('WORK', 'OFF', 'VACATION', 'OTHER')),
  start_time time,
  end_time time,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (workspace_id, name),
  check (
    (category = 'WORK' and start_time is not null and end_time is not null)
    or
    (category <> 'WORK' and start_time is null and end_time is null)
  )
);

create table public.schedules (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  employee_id uuid not null references public.employees(id) on delete cascade,
  shift_type_id uuid not null references public.shift_types(id),
  work_date date not null,
  start_time time,
  end_time time,
  category text not null check (category in ('WORK', 'OFF', 'VACATION', 'OTHER')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, employee_id, work_date)
);

create table public.pattern_templates (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (workspace_id, name)
);

create table public.pattern_template_days (
  id uuid primary key default gen_random_uuid(),
  pattern_template_id uuid not null references public.pattern_templates(id) on delete cascade,
  weekday integer not null check (weekday between 0 and 6),
  shift_type_id uuid references public.shift_types(id) on delete set null,
  unique (pattern_template_id, weekday)
);

alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.employees enable row level security;
alter table public.shift_types enable row level security;
alter table public.schedules enable row level security;
alter table public.pattern_templates enable row level security;
alter table public.pattern_template_days enable row level security;

create or replace function public.is_workspace_member(target_workspace_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members
    where workspace_id = target_workspace_id
      and user_id = auth.uid()
  );
$$;

create or replace function public.is_workspace_admin(target_workspace_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members
    where workspace_id = target_workspace_id
      and user_id = auth.uid()
      and role = 'ADMIN'
  );
$$;

create policy "members can read their workspaces"
on public.workspaces for select
using (public.is_workspace_member(id));

create policy "members can read workspace members"
on public.workspace_members for select
using (public.is_workspace_member(workspace_id));

create policy "members can read employees"
on public.employees for select
using (public.is_workspace_member(workspace_id));

create policy "admins can manage employees"
on public.employees for all
using (public.is_workspace_admin(workspace_id))
with check (public.is_workspace_admin(workspace_id));

create policy "members can read shift types"
on public.shift_types for select
using (public.is_workspace_member(workspace_id));

create policy "admins can manage shift types"
on public.shift_types for all
using (public.is_workspace_admin(workspace_id))
with check (public.is_workspace_admin(workspace_id));

create policy "members can read schedules"
on public.schedules for select
using (public.is_workspace_member(workspace_id));

create policy "admins can manage schedules"
on public.schedules for all
using (public.is_workspace_admin(workspace_id))
with check (public.is_workspace_admin(workspace_id));

create policy "members can read pattern templates"
on public.pattern_templates for select
using (public.is_workspace_member(workspace_id));

create policy "admins can manage pattern templates"
on public.pattern_templates for all
using (public.is_workspace_admin(workspace_id))
with check (public.is_workspace_admin(workspace_id));

create policy "members can read pattern days"
on public.pattern_template_days for select
using (
  exists (
    select 1
    from public.pattern_templates
    where pattern_templates.id = pattern_template_days.pattern_template_id
      and public.is_workspace_member(pattern_templates.workspace_id)
  )
);

create policy "admins can manage pattern days"
on public.pattern_template_days for all
using (
  exists (
    select 1
    from public.pattern_templates
    where pattern_templates.id = pattern_template_days.pattern_template_id
      and public.is_workspace_admin(pattern_templates.workspace_id)
  )
)
with check (
  exists (
    select 1
    from public.pattern_templates
    where pattern_templates.id = pattern_template_days.pattern_template_id
      and public.is_workspace_admin(pattern_templates.workspace_id)
  )
);
