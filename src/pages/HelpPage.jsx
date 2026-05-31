import { Link } from "react-router-dom";

const guideSections = [
  {
    title: "처음 설정",
    items: [
      "직원 관리에서 함께 근무표를 볼 직원을 먼저 등록합니다.",
      "설정에서 오전, 오후, 야간, 휴무, 연차 같은 근무유형을 등록합니다.",
      "근무로 집계되는 유형은 기본 시작시간과 종료시간을 꼭 입력합니다.",
    ],
  },
  {
    title: "근무 등록",
    items: [
      "달력에서 날짜를 선택한 뒤 직원별 근무유형을 저장합니다.",
      "상세 등록 화면에서는 근무유형을 바꾸면 설정에 저장된 시간이 자동 적용됩니다.",
      "OFF, 휴무, 연차/휴가는 근무 건수와 근무시간에서 제외됩니다.",
    ],
  },
  {
    title: "반복 등록",
    items: [
      "요일별 반복은 월요일마다 야간, 화요일마다 주간처럼 같은 규칙을 빠르게 넣을 때 사용합니다.",
      "주차별로 다르면 설정에서 패턴 템플릿을 만든 뒤 반복 등록에서 주차마다 선택합니다.",
      "기존 스케줄이 있을 때는 덮어쓰기 또는 빈 날짜에만 등록 중 선택할 수 있습니다.",
    ],
  },
  {
    title: "근무표 복사",
    items: [
      "월, 주, 직접 중 편한 방식으로 복사할 기간과 붙여넣을 기간을 선택합니다.",
      "복사는 일자가 아니라 같은 주차의 같은 요일 기준으로 적용됩니다.",
      "한국 공휴일 표기를 추가하더라도 요일 기준 복사 흐름을 유지하기 좋습니다.",
    ],
  },
  {
    title: "통계 기준",
    items: [
      "통계는 주간, 월별, 기간별로 확인할 수 있습니다.",
      "근무시간은 설정된 시작시간과 종료시간을 기준으로 계산합니다.",
      "야간근로 시간은 오후 10시부터 다음 날 오전 6시까지 겹치는 시간만 계산합니다.",
    ],
  },
];

function HelpPage() {
  return (
    <div style={{ padding: "6px" }}>
      <section
        style={{
          background: "#fff",
          border: "1px solid #e9ecef",
          borderRadius: "16px",
          padding: "16px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            color: "#868e96",
            fontSize: "12px",
            fontWeight: "800",
            marginBottom: "4px",
          }}
        >
          ShiftMate
        </div>

        <h2
          style={{
            color: "#191f28",
            fontSize: "20px",
            lineHeight: "1.25",
            marginBottom: "8px",
          }}
        >
          사용 가이드
        </h2>

        <p
          style={{
            color: "#495057",
            fontSize: "13px",
            fontWeight: "700",
            lineHeight: "1.55",
          }}
        >
          근무표를 만들고, 반복 등록하고, 통계까지 확인하는 기본 흐름입니다.
        </p>
      </section>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {guideSections.map((section, sectionIndex) => (
          <section
            key={section.title}
            style={{
              background: "#fff",
              border: "1px solid #e9ecef",
              borderRadius: "16px",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "999px",
                  background: "#edf4ff",
                  color: "#3182f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "900",
                  flexShrink: 0,
                }}
              >
                {sectionIndex + 1}
              </div>

              <h3 style={{ fontSize: "16px", color: "#191f28" }}>
                {section.title}
              </h3>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {section.items.map((item) => (
                <div
                  key={item}
                  style={{
                    color: "#495057",
                    background: "#f8f9fb",
                    borderRadius: "10px",
                    padding: "10px",
                    fontSize: "13px",
                    fontWeight: "700",
                    lineHeight: "1.45",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Link
        to="/settings"
        style={{
          display: "block",
          marginTop: "12px",
          padding: "14px",
          borderRadius: "12px",
          background: "#3182f6",
          color: "#fff",
          textAlign: "center",
          textDecoration: "none",
          fontSize: "15px",
          fontWeight: "800",
        }}
      >
        설정으로 돌아가기
      </Link>
    </div>
  );
}

export default HelpPage;
