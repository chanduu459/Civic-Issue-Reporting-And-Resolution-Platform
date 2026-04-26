import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/AuroraOptionTheme.css";

export default function MiddleAdminOfficerOptionsPage() {
  const options = [
    {
      to: "/admin/dashboard/officers/add",
      title: "Add Officer",
      description: "Create a new officer profile quickly.",
      icon: "➕",
      tone: "tone-emerald",
    },
    {
      to: "/admin/dashboard/officers/list",
      title: "View Officer List",
      description: "Inspect all officers and their details.",
      icon: "☰",
      tone: "tone-azure",
    },
    {
      to: "/admin/dashboard/officers/manage",
      title: "Block / Delete Officer",
      description: "Adjust access and remove accounts.",
      icon: "⛔",
      tone: "tone-rose",
    },
    {
      to: "/admin/dashboard/officers/edit",
      title: "Edit Officer Details",
      description: "Update profile and assignment information.",
      icon: "✎",
      tone: "tone-violet",
    },
  ];

  return (
    <div className="aurora-page">
      <div className="aurora-shell">
      <div className="aurora-heading">
        <h2 className="aurora-title">Officer Staff Management</h2>
        <p className="aurora-subtitle">Control officer workflow and account status.</p>
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
