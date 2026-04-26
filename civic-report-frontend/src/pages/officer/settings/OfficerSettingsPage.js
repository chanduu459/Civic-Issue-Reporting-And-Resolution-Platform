// src/pages/officer/settings/OfficerSettingsPage.jsx
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";
import "../../../styles/AuroraOptionTheme.css";

function OfficerSettingsPage() {
  const navigate = useNavigate();
  const cards = [
    {
      title: "Profile",
      description: "Update name, phone number, and profile photo.",
      icon: "👤",
      tone: "tone-azure",
      action: "/officer/dashboard/settings/profile",
    },
    {
      title: "Security",
      description: "Change password, manage sessions, and login security.",
      icon: "🔒",
      tone: "tone-rose",
      action: "/officer/dashboard/settings/security",
    },
  ];

  return (
    <div className="aurora-page">
      <div className="aurora-shell">
        <div className="aurora-heading">
          <h2 className="aurora-title">Settings</h2>
          <p className="aurora-subtitle">Tune your profile and security.</p>
        </div>

        <Row className="g-4 mb-4">
          {cards.map((card, index) => (
            <Col md={6} key={card.title} className="aurora-reveal" style={{ "--stagger": `${index * 0.08}s` }}>
              <Card
                className="h-100 aurora-option-card"
                onClick={() => navigate(card.action)}
                role="button"
              >
                <div className="aurora-option-link">
                  <span className={`aurora-icon ${card.tone}`}>{card.icon}</span>
                  <div>
                    <h3 className="aurora-copy-title">{card.title}</h3>
                    <p className="aurora-copy-text">{card.description}</p>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Child routes render here */}
        <Outlet />
      </div>
    </div>
  );
}

export default OfficerSettingsPage;
