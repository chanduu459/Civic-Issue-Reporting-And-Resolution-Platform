import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function ViewIssueDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("hide-public-scrollbar");

    return () => {
      document.body.classList.remove("hide-public-scrollbar");
    };
  }, []);

  const issue = useMemo(() => {
    if (location.state?.issue) {
      return location.state.issue;
    }

    try {
      const cached = JSON.parse(sessionStorage.getItem("viewIssuesCache") || "[]");
      if (!Array.isArray(cached)) return null;
      return cached.find((item) => String(item.id) === String(id)) || null;
    } catch {
      return null;
    }
  }, [id, location.state]);

  const photoUrls = useMemo(() => {
    if (!issue?.photo_paths) return [];

    try {
      const parsed = Array.isArray(issue.photo_paths)
        ? issue.photo_paths
        : JSON.parse(issue.photo_paths);

      if (!Array.isArray(parsed)) return [];

      return parsed
        .filter(Boolean)
        .map((file) => `http://localhost:5000/uploads/issues/${file}`);
    } catch {
      return [];
    }
  }, [issue]);

  const formatDateTime = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!issue) {
    return (
      <div className="public-issue-page">
        <div className="public-issue-shell public-empty-state">
          <h2>Issue details not available</h2>
          <p>Please go back to your issues list and open the issue again.</p>
          <button className="back-btn" onClick={() => navigate("/view-issues")}>Back to Issues</button>
        </div>

        <style>{`
          .public-issue-page {
            min-height: 100vh;
            padding: 28px 20px 40px;
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          }

          .public-issue-shell {
            width: 100%;
            max-width: 1240px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.96);
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(34, 197, 94, 0.12);
            padding: 28px;
          }

          .public-empty-state {
            text-align: center;
          }

          .public-empty-state h2 {
            margin: 0 0 10px;
            color: #166534;
          }

          .public-empty-state p {
            margin: 0 0 18px;
            color: #475569;
          }

          .back-btn {
            width: auto;
            margin: 0 auto;
            background: linear-gradient(135deg, #16a34a, #15803d);
            color: white;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="public-issue-page">
      <div className="public-issue-shell">
        <div className="details-header">
          <div>
            <p className="details-kicker">Reported Issue</p>
            <h2>{issue.issue_type || "Issue Details"}</h2>
            <p className="details-subtitle">Opened from your submitted issues list</p>
          </div>

          <button className="back-btn" onClick={() => navigate("/view-issues")}>
            Back to Issues
          </button>
        </div>

        <div className="details-grid">
          <div className="detail-card">
            <span className="detail-label">S.No</span>
            <span className="detail-value">{issue.id}</span>
          </div>
          <div className="detail-card">
            <span className="detail-label">Status</span>
            <span className="detail-value status-value">{issue.status || "Pending"}</span>
          </div>
          <div className="detail-card">
            <span className="detail-label">Full Name</span>
            <span className="detail-value">{issue.full_name || "-"}</span>
          </div>
          <div className="detail-card">
            <span className="detail-label">Phone</span>
            <span className="detail-value">{issue.phone || "-"}</span>
          </div>
          <div className="detail-card detail-wide">
            <span className="detail-label">Description</span>
            <span className="detail-value">{issue.description || "-"}</span>
          </div>
          <div className="detail-card detail-wide">
            <span className="detail-label">Location</span>
            <span className="detail-value">{issue.location_text || "-"}</span>
          </div>
          <div className="detail-card">
            <span className="detail-label">Date Submitted</span>
            <span className="detail-value">{formatDateTime(issue.created_at)}</span>
          </div>
          <div className="detail-card">
            <span className="detail-label">Issue ID</span>
            <span className="detail-value">{issue.id}</span>
          </div>
        </div>

        <div className="photos-section">
          <h3>Photos</h3>
          {photoUrls.length > 0 ? (
            <div className="photos-grid">
              {photoUrls.map((url, index) => (
                <img key={url + index} src={url} alt={`Issue ${index + 1}`} className="detail-photo" />
              ))}
            </div>
          ) : (
            <p className="no-photo-text">No photos uploaded for this issue.</p>
          )}
        </div>
      </div>

      <style>{`
        .public-issue-page {
          min-height: 100vh;
          padding: 28px 20px 40px;
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
        }

        body.hide-public-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        body.hide-public-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        .public-issue-shell {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.96);
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(34, 197, 94, 0.12);
          padding: 28px;
        }

        .details-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .details-kicker {
          margin: 0 0 6px;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #16a34a;
        }

        .details-header h2 {
          margin: 0;
          color: #166534;
          font-size: 30px;
        }

        .details-subtitle {
          margin: 8px 0 0;
          color: #475569;
        }

        .back-btn {
          width: auto;
          margin-bottom: 0;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: white;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .detail-card {
          background: #f8fafc;
          border: 1px solid #d1fae5;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-height: 88px;
        }

        .detail-wide {
          grid-column: span 2;
        }

        .detail-label {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          color: #64748b;
        }

        .detail-value {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          word-break: break-word;
        }

        .status-value {
          color: #166534;
        }

        .photos-section {
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid #d1fae5;
        }

        .photos-section h3 {
          margin: 0 0 14px;
          color: #166534;
        }

        .photos-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .detail-photo {
          width: 180px;
          height: 140px;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid #d1fae5;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.12);
        }

        .no-photo-text {
          margin: 0;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .public-issue-shell {
            padding: 20px;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .detail-wide {
            grid-column: span 1;
          }

          .detail-photo {
            width: 100%;
            max-width: 320px;
          }
        }
      `}</style>
    </div>
  );
}

export default ViewIssueDetailsPage;