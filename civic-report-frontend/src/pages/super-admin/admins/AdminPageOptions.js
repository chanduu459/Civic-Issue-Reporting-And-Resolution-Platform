// src/pages/admin/middleAdmins/MiddleAdminpageoptions.js
import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/AuroraOptionTheme.css";

export default function MiddleAdminpageoptions() {
  const options = [
    {
      to: "add",
      title: "Add Admin",
      description: "Create a new admin account.",
      icon: "➕",
      tone: "tone-emerald",
    },
    {
      to: "list",
      title: "View Admin List",
      description: "See all admins in the system.",
      icon: "☰",
      tone: "tone-azure",
    },
    {
      to: "edit-list",
      title: "Edit Admin Details",
      description: "Update profile info and access details.",
      icon: "✎",
      tone: "tone-violet",
    },
    {
      to: "manage",
      title: "Delete Admin",
      description: "Remove an admin from the system.",
      icon: "🗑",
      tone: "tone-rose",
    },
  ];

  return (
    <div className="aurora-page">
      <div className="aurora-shell">
      <div className="aurora-heading">
        <h2 className="aurora-title">Admin Management</h2>
        <p className="aurora-subtitle">Manage your admins efficiently.</p>
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
