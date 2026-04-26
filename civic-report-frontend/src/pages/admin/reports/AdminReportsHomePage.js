import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/AuroraOptionTheme.css";

const MiddleAdminReportsHomePage = () => {
  const reportCards = [
    {
      to: "/admin/dashboard/reports/issues",
      title: "Total Issues",
      description: "Daily, weekly, and monthly issue trends.",
      icon: "📊",
      tone: "tone-azure",
    },
    {
      to: "/admin/dashboard/reports/areas",
      title: "Top Areas",
      description: "Most problematic areas based on complaints.",
      icon: "📍",
      tone: "tone-amber",
    },
    {
      to: "/admin/dashboard/reports/officers/performance",
      title: "Officer Performance",
      description: "Issues handled, resolved, and efficiency metrics.",
      icon: "🏅",
      tone: "tone-violet",
    },
  ];

  return (
    <div className="aurora-page">
      <div className="aurora-shell">
        <div className="aurora-heading">
          <h2 className="aurora-title">Reports & Analytics</h2>
          <p className="aurora-subtitle">Check issue trends and team productivity.</p>
        </div>

        <div className="aurora-grid">
          {reportCards.map((card, index) => (
            <Link
              key={card.to}
              to={card.to}
              className="aurora-option-card aurora-option-link aurora-reveal"
              style={{ "--stagger": `${index * 0.08}s` }}
            >
              <span className={`aurora-icon ${card.tone}`}>{card.icon}</span>
              <div>
                <h3 className="aurora-copy-title">{card.title}</h3>
                <p className="aurora-copy-text">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiddleAdminReportsHomePage;
