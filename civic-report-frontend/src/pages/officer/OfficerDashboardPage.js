import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import {
  FaClipboardList,
  FaInbox,
  FaSpinner,
  FaCheckCircle,
  FaRoad,
  FaTrashAlt,
  FaLightbulb,
  FaTint,
  FaExclamationTriangle,
  FaBell,
} from "react-icons/fa";
import HamburgerSidebar from "../../components/HamburgerSidebar";
import "./OfficerDashboardPage.css";
import "../../styles/AuroraOptionTheme.css";

function OfficerDashboardPage() {
  const location = useLocation();
  const isDashboard = location.pathname === "/officer/dashboard";

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [stats, setStats] = useState({
    allocatedIssues: 0,
    newIssues: 0,
    inProgressIssues: 0,
    solvedIssues: 0,
  });
  const [recentIssues, setRecentIssues] = useState([]);

  const officerId = storedUser.id;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/officer/issues",
          { params: { officer_id: officerId } }
        );

        if (!res.data?.success) {
          throw new Error(res.data?.message || "Failed to load officer issues");
        }

        const allIssues = Array.isArray(res.data.issues) ? res.data.issues : [];
        const normalizeStatus = (status = "") =>
          String(status).trim().toUpperCase().replace(/\s+/g, "_");

        const sortedByLatest = [...allIssues].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setStats({
          allocatedIssues: allIssues.length,
          newIssues: allIssues.filter((i) => normalizeStatus(i.status) === "NEW").length,
          inProgressIssues: allIssues.filter(
            (i) => normalizeStatus(i.status) === "IN_PROGRESS"
          ).length,
          solvedIssues: allIssues.filter((i) => normalizeStatus(i.status) === "SOLVED").length,
        });

        setRecentIssues(sortedByLatest.slice(0, 5));
      } catch (error) {
        console.error("Officer Dashboard API Error:", error);
      }
    };

    if (isDashboard && officerId) {
      fetchDashboardData();
    }
  }, [isDashboard, officerId]);

  const email = storedUser.email || "";
  const fullName = storedUser.full_name || storedUser.username || "";
  const role = storedUser.role || "";
  const photoPath = storedUser.photo_url || storedUser.photoPath || null;

  const initial =
    (email && email.trim()[0]) ||
    (fullName && fullName.trim()[0]) ||
    "U";

  const photoUrl = photoPath
    ? `http://localhost:5000/uploads/${photoPath}`
    : null;

  useEffect(() => {
    const userKey =
      storedUser.username || storedUser.email || storedUser.id || "guest";
    const savedTheme =
      (userKey && localStorage.getItem(`theme_${userKey}`)) || "light";
    document.body.dataset.theme = savedTheme;
  }, [storedUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("sessionId");
    window.location.replace("/Login");
  };

  const formatIssueTime = (dateString) => {
    if (!dateString) return "";

    const issueDate = new Date(dateString);
    const today = new Date();

    const isToday =
      issueDate.getDate() === today.getDate() &&
      issueDate.getMonth() === today.getMonth() &&
      issueDate.getFullYear() === today.getFullYear();

    if (isToday) {
      return issueDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return issueDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatIcon = (label) => {
    if (label === "Allocated Issues") return <FaClipboardList />;
    if (label === "New Issues") return <FaInbox />;
    if (label === "In Progress") return <FaSpinner />;
    if (label === "Solved") return <FaCheckCircle />;
    return <FaClipboardList />;
  };

  const getIssueTone = (issueType = "") => {
    const type = String(issueType).toLowerCase();
    if (type.includes("road") || type.includes("pothole")) return "tone-road";
    if (type.includes("garbage") || type.includes("waste")) return "tone-garbage";
    if (type.includes("light")) return "tone-light";
    if (type.includes("drain") || type.includes("water")) return "tone-drain";
    if (type.includes("hazard") || type.includes("danger")) return "tone-hazard";
    return "tone-default";
  };

  const getIssueIcon = (issueType = "") => {
    const type = String(issueType).toLowerCase();
    if (type.includes("road") || type.includes("pothole")) return <FaRoad />;
    if (type.includes("garbage") || type.includes("waste")) return <FaTrashAlt />;
    if (type.includes("light")) return <FaLightbulb />;
    if (type.includes("drain") || type.includes("water")) return <FaTint />;
    if (type.includes("hazard") || type.includes("danger")) return <FaExclamationTriangle />;
    return <FaBell />;
  };

  const menuItems = [
    { to: "/officer/dashboard", label: "Home", icon: "🏠" },
    { to: "/officer/dashboard/issues", label: "Issues", icon: "📋" },
    { to: "/officer/dashboard/reports", label: "Reports", icon: "📈" },
    { to: "/officer/dashboard/gallery-upload", label: "Gallery", icon: "🖼️" },
    { to: "/officer/dashboard/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="dashboard-layout-wrapper">
      <HamburgerSidebar
        user={fullName || email || "User"}
        photoUrl={photoUrl}
        initial={initial}
        menuItems={menuItems}
        onLogout={handleLogout}
        role={role}
      />

      <div className="dashboard-content-wrapper dashboard-bg">
        {isDashboard && (
          <div className="p-4">
            <div className="welcome-section">
              <h2>Welcome, {fullName || email || "Officer"}</h2>
              <p>Here is your latest dashboard overview.</p>
            </div>

            <Row className="g-3 mb-4">
              <Col md={3} sm={6} xs={12}>
                <Card className="stat-card">
                  <div className="stat-left">
                    <div className="stat-icon blue">{getStatIcon("Allocated Issues")}</div>
                    <div>
                      <div className="stat-title">Allocated Issues</div>
                      <div className="stat-value">{stats.allocatedIssues || 0}</div>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col md={3} sm={6} xs={12}>
                <Card className="stat-card">
                  <div className="stat-left">
                    <div className="stat-icon green">{getStatIcon("New Issues")}</div>
                    <div>
                      <div className="stat-title">New Issues</div>
                      <div className="stat-value">{stats.newIssues || 0}</div>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col md={3} sm={6} xs={12}>
                <Card className="stat-card">
                  <div className="stat-left">
                    <div className="stat-icon yellow">{getStatIcon("In Progress")}</div>
                    <div>
                      <div className="stat-title">In Progress</div>
                      <div className="stat-value">{stats.inProgressIssues || 0}</div>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col md={3} sm={6} xs={12}>
                <Card className="stat-card">
                  <div className="stat-left">
                    <div className="stat-icon orange">{getStatIcon("Solved")}</div>
                    <div>
                      <div className="stat-title">Solved</div>
                      <div className="stat-value">{stats.solvedIssues || 0}</div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            <Card className="recent-card">
              <div className="recent-header">
                <h5 className="mb-0">Recent Issues</h5>
              </div>

              <div className="recent-list">
                {recentIssues.length === 0 ? (
                  <div style={{ padding: "10px", color: "#6b7280" }}>No recent issues found.</div>
                ) : (
                  recentIssues.slice(0, 5).map((issue) => (
                    <div key={issue.id} className="recent-item">
                      <div className={`recent-badge ${getIssueTone(issue.issue_type)}`}>
                        {getIssueIcon(issue.issue_type)}
                      </div>

                      <div className="recent-text">
                        <div className="recent-title">{issue.issue_type}</div>
                        <div className="recent-desc">{issue.description}</div>
                      </div>

                      <div className="recent-time">{formatIssueTime(issue.created_at)}</div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
}

export default OfficerDashboardPage;
