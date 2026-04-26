import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/AuroraOptionTheme.css";

export default function UserOptionsPage() {
  const options = [
    {
      to: "list",
      title: "View All Users",
      description: "Browse all registered users and details.",
      icon: "👥",
      tone: "tone-azure",
    },
    {
      to: "manage",
      title: "Block / Unblock Users",
      description: "Control account access for user safety.",
      icon: "🛡",
      tone: "tone-rose",
    },
    {
      to: "activity",
      title: "User Activity",
      description: "Review engagement and issue activity logs.",
      icon: "📈",
      tone: "tone-violet",
    },
  ];

  return (
    <div className="aurora-page">
      <div className="aurora-shell">
      <div className="aurora-heading">
        <h2 className="aurora-title">User Management</h2>
        <p className="aurora-subtitle">Track, manage, and secure user access.</p>
      </div>
      <Row className="g-3">
        {options.map((option, index) => (
          <Col md={6} key={option.to} className="aurora-reveal" style={{ "--stagger": `${index * 0.08}s` }}>
            <Card className="h-100 aurora-option-card">
              <Card.Body>
                <Link to={option.to} className="aurora-option-link">
                  <span className={`aurora-icon ${option.tone}`}>{option.icon}</span>
                  <div>
                    <h3 className="aurora-copy-title">{option.title}</h3>
                    <p className="aurora-copy-text">{option.description}</p>
                  </div>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </div>
    </div>
  );
}
