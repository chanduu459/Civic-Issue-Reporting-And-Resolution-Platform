import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../../styles/AuroraOptionTheme.css";

function Issuesoptions() {
  const navigate = useNavigate();

  return (
    <div className="aurora-page">
      <div className="aurora-shell">
        <div className="aurora-heading">
          <h2 className="aurora-title">Issues Management</h2>
          <p className="aurora-subtitle">
            Handle complaints, update status, and coordinate assignments.
          </p>
        </div>

        <Card className="aurora-option-card aurora-reveal" style={{ "--stagger": "0.04s", maxWidth: "760px" }}>
          <Card.Body>
            <div className="aurora-option-link" style={{ alignItems: "flex-start" }}>
              <span className="aurora-icon tone-azure">☰</span>
              <div>
                <h3 className="aurora-copy-title">View / Manage Issues</h3>

                <p className="aurora-copy-text">
                  See all complaints, filter by status (Pending, In-Progress,
                  Resolved) and open details to update status or assignment.
                </p>

                <div className="aurora-actions">
                  <Button
                    variant="success"
                    className="aurora-action-btn"
                    onClick={() => navigate("/super-admin/welcome/issues/list")}
                  >
                    Open Issues List
                  </Button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Issuesoptions;
