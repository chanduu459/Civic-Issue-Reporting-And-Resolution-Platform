import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import {
  FaClipboardList,
  FaUsers,
  FaUserShield,
  FaCheckCircle,
  FaRoad,
  FaTrashAlt,
  FaLightbulb,
  FaTint,
  FaExclamationTriangle,
  FaBell,
} from "react-icons/fa";
import HamburgerSidebar from "../../components/HamburgerSidebar";
import "./AdminDashboard.css";
import "../../styles/AuroraOptionTheme.css";

function MiddleAdminDashboardPage() {
  const location = useLocation();
  const isDashboard = location.pathname === "/admin/dashboard";

  // ✅ AUTH
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  // ✅ DASHBOARD DATA
  const [stats, setStats] = useState({
    totalIssues: 0,
    registeredUsers: 0,
    onDutyOfficers: 0,
    resolvedIssues: 0,
  });

  const [recentIssues, setRecentIssues] = useState([]);

  // ✅ REMOVED: Auth guard - RequireAuth handles this now

  // ✅ FETCH ADMIN DASHBOARD DATA
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/dashboard/summary"
        );

        setStats(res.data.stats);
        setRecentIssues(res.data.recentIssues);
      } catch (error) {
        console.error("❌ Admin Dashboard Error:", error);
      }
    };

    if (isDashboard) fetchDashboardData();
  }, [isDashboard]);

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

  // ✅ APPLY THEME
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
    // use full replace to unload SPA state and ensure history entry is replaced
    window.location.replace("/Login");
  };

  const getStatIcon = (label) => {
    if (label === "Total Issues") return <FaClipboardList />;
    if (label === "Registered Users") return <FaUsers />;
    if (label === "On-duty Officers") return <FaUserShield />;
    if (label === "Resolved Issues") return <FaCheckCircle />;
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
    } else {
      return issueDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
  };

  // ✅ Menu Items for Admin
  const menuItems = [
    { to: "/admin/dashboard", label: "Home", icon: "🏠" },
    { to: "/admin/dashboard/officers", label: "Officers", icon: "👮" },
    { to: "/admin/dashboard/users", label: "Users", icon: "👥" },
    { to: "/admin/dashboard/issues", label: "Issues", icon: "📋" },
    { to: "/admin/dashboard/reports", label: "Reports", icon: "📈" },
    { to: "/admin/dashboard/settings", label: "Settings", icon: "⚙️" },
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
            {/* ✅ Stat Cards */}
            <Row className="g-3 mb-4">
              <Col md={3} sm={6} xs={12}>
                <Card className="stat-card">
                  <div className="stat-left">
                    <div className="stat-icon blue">
                      {getStatIcon("Total Issues")}
                    </div>
                    <div>
                      <div className="stat-title">Total Issues</div>
                      <div className="stat-value">{stats.totalIssues}</div>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col md={3} sm={6} xs={12}>
                <Card className="stat-card">
                  <div className="stat-left">
                    <div className="stat-icon green">
                      {getStatIcon("Registered Users")}
                    </div>
                    <div>
                      <div className="stat-title">Registered Users</div>
                      <div className="stat-value">{stats.registeredUsers}</div>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col md={3} sm={6} xs={12}>
                <Card className="stat-card">
                  <div className="stat-left">
                    <div className="stat-icon yellow">
                      {getStatIcon("On-duty Officers")}
                    </div>
                    <div>
                      <div className="stat-title">On-duty Officers</div>
                      <div className="stat-value">{stats.onDutyOfficers}</div>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col md={3} sm={6} xs={12}>
                <Card className="stat-card">
                  <div className="stat-left">
                    <div className="stat-icon orange">
                      {getStatIcon("Resolved Issues")}
                    </div>
                    <div>
                      <div className="stat-title">Resolved Issues</div>
                      <div className="stat-value">{stats.resolvedIssues}</div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            {/* ✅ Recent Issues */}
            <Card className="recent-card">
              <div className="recent-header">
                <h5 className="mb-0">Recent Issues</h5>
              </div>

              <div className="recent-list">
                {recentIssues.length === 0 ? (
                  <div style={{ padding: "10px", color: "#6b7280" }}>
                    No recent issues found.
                  </div>
                ) : (
                  recentIssues.slice(0, 5).map((issue) => (
                    <div key={issue.id} className="recent-item">
                      <div className={`recent-badge ${getIssueTone(issue.issue_type)}`}>
                        {getIssueIcon(issue.issue_type)}
                      </div>

                      <div className="recent-text">
                        <div className="recent-title">
                          {issue.issue_type}
                        </div>
                        <div className="recent-desc">{issue.description}</div>
                      </div>

                      <div className="recent-time">
                        {formatIssueTime(issue.created_at)}
                      </div>
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

export default MiddleAdminDashboardPage;
