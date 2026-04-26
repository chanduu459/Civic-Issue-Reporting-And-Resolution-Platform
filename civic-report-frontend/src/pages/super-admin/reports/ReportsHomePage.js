import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/AuroraOptionTheme.css";

const ReportsHomePage = () => {
  const reportCards = [
    {
      to: "/super-admin/welcome/reports/issues",
      title: "Total Issues",
      description: "Daily / weekly / monthly issues, pending vs resolved.",
      icon: "📊",
      tone: "tone-azure",
    },
    {
      to: "/super-admin/welcome/reports/areas",
      title: "Top Areas",
      description: "Top problematic areas by number of issues.",
      icon: "📍",
      tone: "tone-amber",
    },
    {
      to: "/super-admin/welcome/reports/officers/performance",
      title: "Officer Performance",
      description: "Issues handled, resolved, and average resolution time.",
      icon: "🏅",
      tone: "tone-violet",
    },
  ];

  return (
    <div className="aurora-page">
      <div className="aurora-shell">
        <div className="aurora-heading">
          <h2 className="aurora-title">Reports & Analytics</h2>
          <p className="aurora-subtitle">Track trends and team output in one place.</p>
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

export default ReportsHomePage;
