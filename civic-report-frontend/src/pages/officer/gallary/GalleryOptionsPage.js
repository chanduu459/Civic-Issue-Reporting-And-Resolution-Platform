import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/AuroraOptionTheme.css";

export default function GalleryOptionsPage() {
  return (
    <div className="aurora-page">
      <Container className="aurora-shell">
        <div className="aurora-heading">
          <h2 className="aurora-title">Gallery Options</h2>
          <p className="aurora-subtitle">Review uploads or publish new images.</p>
        </div>

        <Row className="g-4">
          <Col md={6} className="aurora-reveal" style={{ "--stagger": "0.04s" }}>
            <div className="aurora-option-card" style={{ height: "100%" }}>
              <div className="aurora-option-link" style={{ alignItems: "flex-start" }}>
                <span className="aurora-icon tone-azure">🖼</span>
                <div>
                  <h3 className="aurora-copy-title">List of Images</h3>
                  <p className="aurora-copy-text">
                    View all photos uploaded to the gallery. You can also delete
                    images that are no longer needed.
                  </p>

                  <div className="aurora-actions">
                    <Button
                      as={Link}
                      to="/officer/dashboard/gallery-upload/list"
                      variant="success"
                      className="aurora-action-btn"
                    >
                      Open Gallery
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col md={6} className="aurora-reveal" style={{ "--stagger": "0.12s" }}>
            <div className="aurora-option-card" style={{ height: "100%" }}>
              <div className="aurora-option-link" style={{ alignItems: "flex-start" }}>
                <span className="aurora-icon tone-emerald">⬆</span>
                <div>
                  <h3 className="aurora-copy-title">New Upload</h3>
                  <p className="aurora-copy-text">
                    Add a new photo to the gallery. The image will be stored and
                    linked with your officer account.
                  </p>

                  <div className="aurora-actions">
                    <Button
                      as={Link}
                      to="/officer/dashboard/gallery-upload/new"
                      variant="outline-success"
                      className="aurora-action-btn"
                    >
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
