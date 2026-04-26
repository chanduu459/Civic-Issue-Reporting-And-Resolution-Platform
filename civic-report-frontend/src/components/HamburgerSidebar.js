import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import {
  FaHome,
  FaUserShield,
  FaUsers,
  FaClipboardList,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaChevronRight,
  FaImage,
} from "react-icons/fa";
import "../styles/HamburgerSidebar.css";

function HamburgerSidebar({
  user,
  photoUrl,
  initial,
  menuItems,
  onMenuItemClick,
  onLogout,
  role,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (to) => {
    if (!to) return false;

    // Exact path match
    if (location.pathname === to) return true;

    // For nested child routes: only check startsWith if the "to" route
    // is NOT a parent/dashboard route (doesn't end with /welcome or /dashboard)
    const isParentRoute = to.endsWith("/welcome") || to.endsWith("/dashboard");
    
    if (isParentRoute) {
      // Parent routes must match exactly
      return false;
    }

    // For child routes, allow nested matching
    return location.pathname.startsWith(`${to}/`);
  };

  const getMenuIcon = (label = "") => {
    const normalizedLabel = String(label).toLowerCase();

    if (normalizedLabel === "home") return { icon: <FaHome />, tone: "tone-home" };
    if (normalizedLabel === "admins") return { icon: <FaUserShield />, tone: "tone-admins" };
    if (normalizedLabel === "officers") return { icon: <FaUserShield />, tone: "tone-officers" };
    if (normalizedLabel === "users") return { icon: <FaUsers />, tone: "tone-users" };
    if (normalizedLabel === "issues") return { icon: <FaClipboardList />, tone: "tone-issues" };
    if (normalizedLabel === "reports") return { icon: <FaChartLine />, tone: "tone-reports" };
    if (normalizedLabel === "gallery") return { icon: <FaImage />, tone: "tone-gallery" };
    if (normalizedLabel === "settings") return { icon: <FaCog />, tone: "tone-settings" };
    return { icon: <FaChevronRight />, tone: "tone-default" };
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
    if (onMenuItemClick) {
      onMenuItemClick();
    }
  };

  return (
    <div className="hamburger-sidebar-wrapper">
      {/* Hamburger Button */}
      {isMobile && (
        <button
          className={`hamburger-btn ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      {/* Sidebar */}
      <div className={`hamburger-sidebar ${isOpen ? "open" : ""}`}>
        {/* Profile Header */}
        {user && (
          <div className="sidebar-header">
            {isMobile && (
              <button
                className="close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            )}

            {/* Avatar */}
            <div className="sidebar-avatar">
              {photoUrl ? (
                <img src={photoUrl} alt="Profile" />
              ) : (
                <span>{initial?.toUpperCase()}</span>
              )}
            </div>

            {/* User Info */}
            <div className="sidebar-user-info">
              <div className="user-name">{user}</div>
             {role && (
  <div className="user-role">
    {role === "middle_admin"
      ? "Admin"
      : role
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
  </div>
)}
            </div>
          </div>
        )}

        {/* Close Button if no user */}
        {!user && isMobile && (
          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        )}

        {/* Menu Items */}
        <div className="sidebar-menu-wrapper">
          <ListGroup variant="flush">
            {menuItems.map((item, index) => (
              <ListGroup.Item
                key={index}
                className="sidebar-menu-item border-0 p-0"
              >
                <Link
                  to={item.to}
                  className={`menu-link ${
                    isActive(item.to) ? "active" : ""
                  }`}
                  onClick={handleMenuItemClick}
                >
                  <span
                    className={`menu-icon ${getMenuIcon(item.label).tone}`}
                    aria-hidden="true"
                  >
                    {getMenuIcon(item.label).icon}
                  </span>
                  <span className={`menu-text ${getMenuIcon(item.label).tone}`}>{item.label}</span>
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        {/* Logout */}
        {user && (
          <div className="sidebar-footer">
            <button
              className="logout-btn"
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              title="Logout"
            >
              <span className="menu-icon tone-logout" aria-hidden="true">
                <FaSignOutAlt />
              </span>
              <span className="menu-text tone-logout">Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isMobile && isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default HamburgerSidebar;