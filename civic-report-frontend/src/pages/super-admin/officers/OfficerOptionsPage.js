import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/AuroraOptionTheme.css";

export default function OfficerOptionsPage() {
  const options = [
    {
      to: "add",
      title: "Add Officer",
      description: "Create and assign a new officer profile.",
      icon: "➕",
      tone: "tone-emerald",
    },
    {
      to: "list",
      title: "View Officer List",
      description: "See all officers and their status.",
      icon: "☰",
      tone: "tone-azure",
    },
    {
      to: "manage",
      title: "Block / Delete Officer",
      description: "Manage access and remove officer accounts.",
      icon: "⛔",
      tone: "tone-rose",
    },
    {
      to: "edit",
      title: "Edit Officer Details",
      description: "Update officer profile and assignment data.",
      icon: "✎",
      tone: "tone-violet",
    },
  ];

  return (
    <div className="aurora-page">
      <div className="aurora-shell">
      <div className="aurora-heading">
        <h2 className="aurora-title">Officer Staff Management</h2>
        <p className="aurora-subtitle">Control officer onboarding and operations.</p>
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
