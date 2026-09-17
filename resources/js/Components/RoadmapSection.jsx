import { useState } from 'react';
import Grain from '@/Components/Grain';


const levels = [
  {
    num: "I",
    label: "Nhập Môn",
    sublabel: "Dành cho người mới, từ con số 0",
    eng: "Beginner",
    img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=560&fit=crop&auto=format",
    alt: "Bàn tay chơi guitar acoustic",
    weeks: "12 tuần",
    lessons: "24 bài học",
    desc: "Nhạc lý căn bản, tư thế, hợp âm mở, bài dân ca đơn giản. Từ chưa biết gì đến tự đệm hát được.",
    tags: ["Nhạc Lý", "Hợp Âm Mở", "Picking"],
  },
  {
    num: "II",
    label: "Nâng Cao",
    sublabel: "Dành cho người đã biết chơi cơ bản",
    eng: "Advanced",
    img: "https://images.unsplash.com/photo-1501962679900-bea61483313b?w=800&h=560&fit=crop&auto=format",
    alt: "Guitarist biểu diễn trên sân khấu",
    weeks: "16 tuần",
    lessons: "32 bài học",
    desc: "Hợp âm nâng cao, fingerpicking, capo, chuyển điệu. Chơi được nhạc trữ tình, bolero, nhạc vàng.",
    tags: ["Fingerpicking", "Capo", "Bolero"],
  },
  {
    num: "III",
    label: "Chuyên Nghiệp",
    sublabel: "Dành cho biểu diễn chuyên nghiệp",
    eng: "Profi",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=560&fit=crop&auto=format",
    alt: "Phòng thu âm chuyên nghiệp",
    weeks: "20 tuần",
    lessons: "40 bài học",
    desc: "Hoà âm phối khí, solo, ứng tấu, thu âm, và kỹ thuật biểu diễn sân khấu chuyên nghiệp.",
    tags: ["Solo", "Hoà Âm", "Thu Âm"],
  },
];

export default function RoadmapSection() {
    const [hovered, setHovered] = useState(null);
    return (
    <section style={{ backgroundColor: "#f0e6c8", position: "relative", overflow: "hidden", padding: "72px 52px 80px" }}>
      {/* Paper grain */}
      <Grain opacity={0.06} blend="multiply" zIndex={1} />

      {/* Faint ruled lines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(122,104,64,0.07) 32px)" }} />

      {/* Section header */}
      <div style={{ position: "relative", marginBottom: "52px" }}>
        {/* Top ornament line */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div style={{ height: "1px", width: "32px", backgroundColor: "#8b2e1a" }} />
          <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8b2e1a" }}>
            Chương Trình Đào Tạo · 1978
          </span>
          <div style={{ height: "1px", flex: 1, backgroundColor: "#c8a96e", opacity: 0.4 }} />
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "20px", flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2a1f0e", lineHeight: 1, margin: 0 }}>
            Lộ Trình Học
          </h2>
          <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a6840" }}>
            — Ba cấp độ
          </span>
        </div>

        {/* Thick bottom rule */}
        <div style={{ marginTop: "16px", height: "2px", background: "linear-gradient(90deg, #2a1f0e 0%, #2a1f0e 48px, transparent 48px)" }} />
      </div>

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2px", position: "relative" }}>
        {levels.map((lvl, i) => (
          <div
            key={lvl.num}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ position: "relative", cursor: "default" }}
          >
            {/* Roman numeral label above */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b2e1a" }}>
                {lvl.sublabel}
              </span>
            </div>

            {/* Image card */}
            <div
              style={{
                position: "relative", overflow: "hidden",
                aspectRatio: "4/3",
                backgroundColor: "#1a1208",
                transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                transform: hovered === i ? "scale(1.01)" : "scale(1)",
              }}
            >
              {/* Photo */}
              <img
                src={lvl.img}
                alt={lvl.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "sepia(0.3) contrast(1.05)", transition: "transform 0.6s ease", transform: hovered === i ? "scale(1.04)" : "scale(1)" }}
              />

              {/* Gradient overlay */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,8,4,0.85) 0%, rgba(10,8,4,0.3) 50%, rgba(10,8,4,0.15) 100%)" }} />

              {/* Film grain on photo */}
              <Grain opacity={0.2} />

              {/* Corner registration marks */}
              {[
                { top: 8, left: 8, borderTop: "1.5px solid rgba(200,169,110,0.5)", borderLeft: "1.5px solid rgba(200,169,110,0.5)" },
                { top: 8, right: 8, borderTop: "1.5px solid rgba(200,169,110,0.5)", borderRight: "1.5px solid rgba(200,169,110,0.5)" },
                { bottom: 8, left: 8, borderBottom: "1.5px solid rgba(200,169,110,0.5)", borderLeft: "1.5px solid rgba(200,169,110,0.5)" },
                { bottom: 8, right: 8, borderBottom: "1.5px solid rgba(200,169,110,0.5)", borderRight: "1.5px solid rgba(200,169,110,0.5)" },
              ].map((s, ci) => (
                <div key={ci} style={{ position: "absolute", width: 12, height: 12, ...s }} />
              ))}

              {/* Content overlay */}
              <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px 22px" }}>
                {/* Roman numeral */}
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(200,169,110,0.7)", textTransform: "uppercase", marginBottom: "6px" }}>
                  Cấp {lvl.num}
                </div>

                {/* Big level name */}
                <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#f5efe0", lineHeight: 1, letterSpacing: "0.02em", textShadow: "0 2px 16px rgba(0,0,0,0.6)", marginBottom: "10px" }}>
                  {lvl.eng}
                </div>

                {/* Thin rule */}
                <div style={{ width: 36, height: 1, backgroundColor: "#8b2e1a", marginBottom: "10px" }} />

                {/* Vietnamese title */}
                <div style={{ fontFamily: "'Lora', serif", fontSize: "0.8rem", color: "rgba(240,230,200,0.8)", marginBottom: "12px" }}>
                  {lvl.label}
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", gap: "16px" }}>
                  {[lvl.weeks, lvl.lessons].map((stat, si) => (
                    <div key={si} style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(200,169,110,0.75)" }}>
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Below-card info panel */}
            <div style={{ backgroundColor: "#ebe0c4", borderTop: "2px solid #2a1f0e", padding: "16px 0 0" }}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: "0.82rem", lineHeight: 1.7, color: "#3a2c14", marginBottom: "12px" }}>
                {lvl.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {lvl.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7a6840", border: "1px solid #c8a96e", padding: "2px 8px" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer ornament */}
      <div style={{ marginTop: "52px", display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, #c8a96e, transparent)", opacity: 0.4 }} />
        <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#8b2e1a" }}>
          ✦ Trường Nhạc Dân Gian · Hà Nội ✦
        </span>
        <div style={{ height: "1px", flex: 1, background: "linear-gradient(270deg, #c8a96e, transparent)", opacity: 0.4 }} />
      </div>
    </section>
  );
}


