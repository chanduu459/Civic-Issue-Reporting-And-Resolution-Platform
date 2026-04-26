import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../../styles/AuroraOptionTheme.css";

function MiddleAdminIssuesOptions() {
  const navigate = useNavigate();

  return (
    <div className="aurora-page">
      <div className="aurora-shell">
        <div className="aurora-heading">
          <h2 className="aurora-title">Issues Management</h2>
          <p className="aurora-subtitle">Review and route issue queues smoothly.</p>
        </div>

        <div className="aurora-grid" style={{ maxWidth: "980px" }}>
          {/* ✅ CARD 1: VIEW / MANAGE ISSUES */}
          <Card className="aurora-option-card aurora-reveal" style={{ "--stagger": "0.04s" }}>
            <Card.Body>
              <div className="aurora-option-link" style={{ alignItems: "flex-start" }}>
                <span className="aurora-icon tone-azure">☰</span>
                <div>
                  <h3 className="aurora-copy-title">View / Manage Issues</h3>

                  <p className="aurora-copy-text">
                    View all complaints, filter by status (New, In-Progress, Solved)
                    and update issue details or status.
                  </p>

                  <div className="aurora-actions">
                    <Button
                      variant="success"
                      className="aurora-action-btn"
                      onClick={() =>
                        navigate("/admin/dashboard/issues/list")
                      }
                    >
                      Open Issues List
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* ✅ CARD 2: ASSIGN ISSUES */}
          <Card className="aurora-option-card aurora-reveal" style={{ "--stagger": "0.12s" }}>
            <Card.Body>
              <div className="aurora-option-link" style={{ alignItems: "flex-start" }}>
                <span className="aurora-icon tone-emerald">📌</span>
                <div>
                  <h3 className="aurora-copy-title">
                    Assign Issues to Officers
                  </h3>

                  <p className="aurora-copy-text">
                    Assign each issue to a specific officer so they can view and
                    resolve only their assigned tasks.
                  </p>

                  <div className="aurora-actions">
                    <Button
                      variant="outline-success"
                      className="aurora-action-btn"
                      onClick={() =>
                        navigate("/admin/dashboard/issues/assign")
                      }
                    >
                      Assign Issues
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MiddleAdminIssuesOptions;
