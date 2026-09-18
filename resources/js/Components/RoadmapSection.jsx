import { useState } from 'react';
import Grain from '@/Components/Grain';


const defaultLevels = [
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

export default function RoadmapSection({ roadmaps = [] }) {
    const [hovered, setHovered] = useState(null);
    const levels = roadmaps.length > 0
      ? roadmaps.map((roadmap) => ({
          ...roadmap,
          img: toRoadmapImageUrl(roadmap.img),
          alt: roadmap.alt || roadmap.label,
          tags: Array.isArray(roadmap.tags) ? roadmap.tags : [],
        }))
      : defaultLevels;

    return (
    <section className="roadmap-section">
      {/* Paper grain */}
      <Grain opacity={0.06} blend="multiply" zIndex={1} />

      {/* Faint ruled lines */}
      <div className="roadmap-section__ruled-lines" />

      {/* Section header */}
      <div className="roadmap-section__header">
        {/* Top ornament line */}
        <div className="roadmap-section__eyebrow">
          <div className="roadmap-section__eyebrow-mark" />
          <span className="roadmap-section__eyebrow-label">
            Chương Trình Đào Tạo
          </span>
          <div className="roadmap-section__eyebrow-line" />
        </div>

        <div className="roadmap-section__title-row">
          <h2 className="roadmap-section__title">
            Lộ Trình Học
          </h2>
          <span className="roadmap-section__subtitle">
            — Ba cấp độ
          </span>
        </div>

        {/* Thick bottom rule */}
        <div className="roadmap-section__rule" />
      </div>

      {/* Cards grid */}
      <div className="roadmap-grid">
        {levels.map((lvl, i) => (
          <div
            key={lvl.num}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="roadmap-card"
          >
            {/* Roman numeral label above */}
            <div className="roadmap-card__sublabel">
              <span className="roadmap-card__sublabel-text">
                {lvl.sublabel}
              </span>
            </div>

            {/* Image card */}
            <div
              className={`roadmap-card__image ${hovered === i ? 'is-hovered' : ''}`}
            >
              {/* Photo */}
              <img
                src={lvl.img}
                alt={lvl.alt}
                className={`roadmap-card__photo ${hovered === i ? 'is-hovered' : ''}`}
              />

              {/* Gradient overlay */}
              <div className="roadmap-card__overlay" />

              {/* Film grain on photo */}
              <Grain opacity={0.2} />

              {/* Corner registration marks */}
              {[
                "top-left", "top-right", "bottom-left", "bottom-right",
              ].map((corner) => (
                <div key={corner} className={`roadmap-card__corner roadmap-card__corner--${corner}`} />
              ))}

              {/* Content overlay */}
              <div className="roadmap-card__content">
                {/* Roman numeral */}
                <div className="roadmap-card__level">
                  Cấp {lvl.num}
                </div>

                {/* Big level name */}
                <div className="roadmap-card__english-title">
                  {lvl.eng}
                </div>

                {/* Thin rule */}
                <div className="roadmap-card__divider" />

                {/* Vietnamese title */}
                <div className="roadmap-card__label">
                  {lvl.label}
                </div>

                {/* Stats row */}
                <div className="roadmap-card__stats">
                  {[lvl.weeks, lvl.lessons].map((stat, si) => (
                    <div key={si} className="roadmap-card__stat">
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Below-card info panel */}
            <div className="roadmap-card__details">
              <p className="roadmap-card__description">
                {lvl.desc}
              </p>
              <div className="roadmap-card__tags">
                {lvl.tags.map(tag => (
                  <span key={tag} className="roadmap-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer ornament */}
      <div className="roadmap-section__footer">
        <div className="roadmap-section__footer-line roadmap-section__footer-line--left" />
        <span className="roadmap-section__footer-label">
          ✦ Whammy Private Guitar Lessons ✦
        </span>
        <div className="roadmap-section__footer-line roadmap-section__footer-line--right" />
      </div>
    </section>
  );
}

function toRoadmapImageUrl(imageUrl) {
  if (!imageUrl || imageUrl.startsWith('data:') || imageUrl.startsWith('http')) {
    return imageUrl;
  }

  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }

  return `/storage/${imageUrl}`;
}


