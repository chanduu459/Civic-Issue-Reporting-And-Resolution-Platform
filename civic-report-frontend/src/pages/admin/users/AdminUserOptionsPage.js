import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/AuroraOptionTheme.css";

export default function MiddleAdminUserOptionsPage() {
  const options = [
    {
      to: "/admin/dashboard/users/list",
      title: "View All Users",
      description: "Browse user accounts and current details.",
      icon: "👥",
      tone: "tone-azure",
    },
    {
      to: "/admin/dashboard/users/manage",
      title: "Block / Unblock Users",
      description: "Control account access and user restrictions.",
      icon: "🛡",
      tone: "tone-rose",
    },
    {
      to: "/admin/dashboard/users/activity",
      title: "User Activity",
      description: "Review user actions and activity history.",
      icon: "📈",
      tone: "tone-violet",
    },
  ];

  return (
    <div className="aurora-page">
      <div className="aurora-shell">
      <div className="aurora-heading">
        <h2 className="aurora-title">User Management</h2>
        <p className="aurora-subtitle">Manage users from your admin panel.</p>
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
