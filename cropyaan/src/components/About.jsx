import React from "react";
import { useTranslation } from "react-i18next";

const IMAGES = {
  who:     "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1000&q=75&auto=format&fit=crop",
  mission: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1000&q=75&auto=format&fit=crop",
  vision:  "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1000&q=75&auto=format&fit=crop",
};

const s = {
  root: {
    minHeight: "100vh",
    background: "color-mix(in srgb, var(--bg-main, #0a0a0a) 94%, #f5e6c8 6%)",
    color: "var(--color-text, #ede8df)",
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },

  /* HERO — centred, full width */
  hero: {
    textAlign: "center",
    padding: "7rem 2rem 5rem",
    maxWidth: "100%",
  },
  heroEyebrow: {
    fontSize: "0.63rem",
    letterSpacing: "0.26em",
    textTransform: "uppercase",
    color: "#22c55e",
    fontFamily: "'Courier New', monospace",
    display: "block",
    marginBottom: "1.4rem",
  },
  heroTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
    fontWeight: 700,
    letterSpacing: "-0.025em",
    lineHeight: 1.08,
    marginBottom: "1.5rem",
    color: "var(--color-text, #ede8df)",
  },
  heroAccent: {
    color: "#22c55e",
    textShadow: "0 0 48px rgba(34,197,94,0.28)",
  },
  heroSubtitle: {
    fontSize: "1.05rem",
    lineHeight: 1.85,
    color: "var(--color-text-muted, #9a9488)",
    fontWeight: 400,
    maxWidth: 560,
    margin: "0 auto",
    fontStyle: "italic",
  },

  /* DIVIDER */
  divider: {
    width: "100%",
    height: "1px",
    background: "rgba(245,230,200,0.10)",
    border: "none",
    margin: 0,
  },

  /* SECTION TEXT BLOCK */
  textBlock: {
    textAlign: "left",
    padding: "0 0.5rem",
  },
  sectionLabel: {
    fontSize: "0.63rem",
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    color: "#22c55e",
    margin: "0 0 0.85rem",
    fontFamily: "'Courier New', monospace",
    fontWeight: 600,
    display: "block",
  },
  sectionTitle: {
    fontSize: "clamp(1.3rem, 2.6vw, 1.75rem)",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    lineHeight: 1.22,
    marginBottom: "1.1rem",
    color: "var(--color-text, #ede8df)",
    fontFamily: "'Georgia', serif",
  },
  sectionContent: {
    fontSize: "0.97rem",
    lineHeight: 1.95,
    color: "var(--color-text-muted, #9a9488)",
    fontWeight: 400,
    margin: 0,
  },
  imageWrap: {
    width: "100%",
    aspectRatio: "16 / 10",
    overflow: "hidden",
    outline: "1px solid rgba(245,230,200,0.07)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    filter: "grayscale(20%) brightness(0.68) sepia(8%)",
  },

  /* CLOSING */
  closing: {
    textAlign: "center",
    padding: "4rem 2rem 5rem",
    fontSize: "1.05rem",
    lineHeight: 1.85,
    color: "var(--color-text-muted, #9a9488)",
    fontStyle: "italic",
    maxWidth: 500,
    margin: "0 auto",
  },
};

/* All layout via CSS — full-bleed rows, edge-to-edge */
const css = `
  .ca-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
    min-height: 420px;
  }

  .ca-text-cell {
    padding: 4.5rem 5vw 4.5rem 7vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .ca-img-cell {
    overflow: hidden;
  }

  /* reversed row: push image to the left */
  .ca-row.rev .ca-text-cell { order: 2; padding: 4.5rem 7vw 4.5rem 5vw; }
  .ca-row.rev .ca-img-cell  { order: 1; }

  /* thin band between sections */
  .ca-band {
    height: 1px;
    background: rgba(245,230,200,0.08);
    width: 100%;
  }

  @media (max-width: 680px) {
    .ca-row,
    .ca-row.rev {
      grid-template-columns: 1fr;
      min-height: unset;
    }
    .ca-row .ca-img-cell   { order: -1; aspect-ratio: 16/9; }
    .ca-row.rev .ca-img-cell { order: -1; aspect-ratio: 16/9; }
    .ca-text-cell,
    .ca-row.rev .ca-text-cell {
      padding: 2.5rem 1.5rem;
      order: unset;
    }
  }
`;

const Divider = () => <div className="ca-band" />;

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <style>{css}</style>
      <div style={s.root}>

        {/* ── HERO ── */}
        <section style={s.hero}>
          <span style={s.heroEyebrow}>{t("about.hero_eyebrow")}</span>
          <h1 style={s.heroTitle}>
  {t("about.hero_title", { brand: "CROPYAAN" })}
</h1>
          <p style={s.heroSubtitle}>{t("about.hero_subtitle")}</p>
        </section>

        <Divider />

        {/* ── WHO WE ARE — text left · image right ── */}
        <div className="ca-row">
          <div className="ca-text-cell">
            <span style={s.sectionLabel}>{t("about.who_label")}</span>
            <h2 style={s.sectionTitle}>{t("about.who_title")}</h2>
            <p style={s.sectionContent}>{t("about.who_content")}</p>
          </div>
          <div className="ca-img-cell">
            <img src={IMAGES.who} alt="" style={{ ...s.image, height: "100%", aspectRatio: "unset" }} loading="lazy" />
          </div>
        </div>

        <Divider />

        {/* ── MISSION — image left · text right ── */}
        <div className="ca-row rev">
          <div className="ca-text-cell">
            <span style={s.sectionLabel}>{t("about.mission_label")}</span>
            <h2 style={s.sectionTitle}>{t("about.mission_title")}</h2>
            <p style={s.sectionContent}>{t("about.mission_content")}</p>
          </div>
          <div className="ca-img-cell">
            <img src={IMAGES.mission} alt="" style={{ ...s.image, height: "100%", aspectRatio: "unset" }} loading="lazy" />
          </div>
        </div>

        <Divider />

        {/* ── VISION — text left · image right ── */}
        <div className="ca-row">
          <div className="ca-text-cell">
            <span style={s.sectionLabel}>{t("about.vision_label")}</span>
            <h2 style={s.sectionTitle}>{t("about.vision_title")}</h2>
            <p style={s.sectionContent}>{t("about.vision_content")}</p>
          </div>
          <div className="ca-img-cell">
            <img src={IMAGES.vision} alt="" style={{ ...s.image, height: "100%", aspectRatio: "unset" }} loading="lazy" />
          </div>
        </div>

        <Divider />

        {/* ── CLOSING ── */}
        <p style={s.closing}>{t("about.closing")}</p>

      </div>
    </>
  );
}