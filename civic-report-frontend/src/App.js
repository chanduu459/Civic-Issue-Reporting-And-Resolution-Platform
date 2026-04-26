// App.js
import React from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container, Row, Col, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  FaLeaf,
  FaHandshake,
  FaUsers,
  FaBolt,
  FaPen,
  FaDatabase,
  FaUserShield,
  FaCheckCircle,
  FaHome,
  FaChartLine,
  FaGlobe,
  FaHandsHelping,
  FaRoad,
  FaTrashAlt,
  FaLightbulb,
  FaTint,
  FaExclamationTriangle,
  FaCity,
} from "react-icons/fa";

import RequireAuth from "./components/RequireAuth";
import "./utils/axiosConfig";
import HamburgerSidebar from "./components/HamburgerSidebar";

// 1) Public / common
import ReportIssuePage from "./pages/ReportIssue/ReportIssuePage";
import ViewIssuePage from "./pages/ViewIssue/ViewIssuePage";
import ViewIssueDetailsPage from "./pages/ViewIssue/ViewIssueDetailsPage";
import ContactPage from "./pages/contact/ContactPage";
import MainGalleryPage from "./pages/gallary/MainGalleryPage";

// Login routes
import AdminLoginPage from "./pages/Login/AdminLoginPage";
// import AdminForgotPassword from "./pages/Login/AdminForgotPassword";
// import AdminResetPassword from "./pages/Login/AdminResetPassword";

// 2) ADMIN (super admin)
// Admin main dashboard
import WelcomePage from "./pages/super-admin/SuperAdminDashboardPage";

// Admin: middle admins
import MiddleAdminpageoptions from "./pages/super-admin/admins/AdminPageOptions";
import AddMiddleAdminForm from "./pages/super-admin/admins/AddAdminForm";
import ViewMiddleAdminsList from "./pages/super-admin/admins/ViewAdminsList";
import EditMiddleAdminForm from "./pages/super-admin/admins/EditAdminForm";
import EditMiddleAdminsList from "./pages/super-admin/admins/EditAdminsList";
import DeleteBlockUnblockMiddleAdmins from "./pages/super-admin/admins/DeleteBlockUnblockAdmins";

// Admin: officers
import OfficerOptionsPage from "./pages/super-admin/officers/OfficerOptionsPage";
import AddOfficerForm from "./pages/super-admin/officers/AddOfficerForm";
import OfficerListPage from "./pages/super-admin/officers/OfficerListPage";
import ManageOfficersPage from "./pages/super-admin/officers/ManageOfficersPage";
import OfficerListEdit from "./pages/super-admin/officers/OfficerListEdit";
import EditOfficerForm from "./pages/super-admin/officers/EditOfficerForm";

// Admin: users
import UserOptionsPage from "./pages/super-admin/users/UserOptionsPage";
import UserListPage from "./pages/super-admin/users/UserListPage";
import ManageUsersPage from "./pages/super-admin/users/ManageUsersPage";
import UserActivityPage from "./pages/super-admin/users/UserActivityPage";

// Admin: issues
import Issuesoptions from "./pages/super-admin/issues/Issuesoptions";
import Issueslist from "./pages/super-admin/issues/Issueslist";
import IssueDetails from "./pages/super-admin/issues/IssueDetails";

// Admin: settings
import AdminSettingsPage from "./pages/super-admin/settings/SuperAdminSettingsPage";
import ProfileSettingsPage from "./pages/super-admin/settings/ProfileSettingsPage";
import SecuritySettingsPage from "./pages/super-admin/settings/SecuritySettingsPage";

// Admin: reports
import ReportsHomePage from "./pages/super-admin/reports/ReportsHomePage";
import IssuesReportPage from "./pages/super-admin/reports/IssuesReportPage";
import AreasReportPage from "./pages/super-admin/reports/AreasReportPage";
import AreaDetailsPage from "./pages/super-admin/reports/AreaDetailsPage";
import OfficerPerformancePage from "./pages/super-admin/reports/OfficerPerformancePage";

// Middle admin dashboard
import MiddleAdminDashboardPage from "./pages/admin/AdminDashboard";

// middle-admin-officers
import MiddleAdminOfficerOptionsPage from "./pages/admin/officers/AdminOfficerOptionsPage";
import MiddleAdminAddOfficerForm from "./pages/admin/officers/AdminAddOfficerForm";
import MiddleAdminEditOfficerForm from "./pages/admin/officers/AdminEditOfficerForm";
import MiddleAdminManageOfficersPage from "./pages/admin/officers/AdminManageOfficersPage";
import MiddleAdminOfficerListEdit from "./pages/admin/officers/AdminOfficerListEdit";
import MiddleAdminOfficerListPage from "./pages/admin/officers/AdminOfficerListPage";

// m-a-users
import MiddleAdminUserOptionsPage from "./pages/admin/users/AdminUserOptionsPage";
import MiddleAdminManageUsersPage from "./pages/admin/users/AdminManageUsersPage";
import MiddleAdminUserActivityPage from "./pages/admin/users/AdminUserActivityPage";
import MiddleAdminUserListPage from "./pages/admin/users/AdminUserListPage";

// m-a-issues
import MiddleAdminIssuesOptions from "./pages/admin/issues/AdminIssuesOptions";
import MiddleAdminIssueDetails from "./pages/admin/issues/AdminIssueDetails";
import MiddleAdminIssuesList from "./pages/admin/issues/AdminIssuesList";
import MiddleAdminAssignIssuesPage from "./pages/admin/issues/AdminAssignIssuesPage";

// m-a-reports
import MiddleAdminReportsHomePage from "./pages/admin/reports/AdminReportsHomePage";
import MiddleAdminAreaDetailsPage from "./pages/admin/reports/AdminAreaDetailsPage";
import MiddleAdminAreasReportPage from "./pages/admin/reports/AdminAreasReportPage";
import MiddleAdminIssuesReportPage from "./pages/admin/reports/AdminIssuesReportPage";
import MiddleAdminOfficerPerformancePage from "./pages/admin/reports/AdminOfficerPerformancePage";

// m-a-settings
import MiddleAdminSettingsPage from "./pages/admin/settings/AdminSettingsPage";
import MiddleAdminProfileSettingsPage from "./pages/admin/settings/AdminProfileSettingsPage";
import MiddleAdminSecuritySettingsPage from "./pages/admin/settings/AdminSecuritySettingsPage";

// officer dashboard
import OfficerDashboardPage from "./pages/officer/OfficerDashboardPage";
import OfficerIssuesList from "./pages/officer/issues/OfficerIssuesList";
import OfficerIssueDetails from "./pages/officer/issues/OfficerIssueDetails";

import OfficerSettingsPage from "./pages/officer/settings/OfficerSettingsPage";
import OfficerProfileSettingsPage from "./pages/officer/settings/OfficerProfileSettingsPage";
import OfficerSecuritySettingsPage from "./pages/officer/settings/OfficerSecuritySettingsPage";

import OfficerIssuesReportPage from "./pages/officer/reports/OfficerIssuesReportPage";

import GalleryOptionsPage from "./pages/officer/gallary/GalleryOptionsPage";
import GalleryListPage from "./pages/officer/gallary/GalleryListPage";
import OfficerGalleryUploadPage from "./pages/officer/gallary/OfficerGalleryUploadPage";

function HomePage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const animateElements = document.querySelectorAll(
      '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
    );
    
    animateElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO BANNER - Embassy Style */}
      <section className="hero-wrapper">
        <Container fluid className="px-0">
          <div className="hero-content-wrapper">
            {/* Left Content */}
            <div className="hero-left-content">
              <h1 className="hero-title">
                Your Voice, Our Action - Building Cleaner, Safer Cities Together
              </h1>
              <p className="hero-subtitle">
                A smart platform that connects citizens and authorities to resolve civic problems like potholes, garbage, drainage, and streetlights with real-time updates and full transparency.
              </p>
              <div className="hero-actions">
                <Button className="hero-primary-btn" onClick={() => navigate("/report")}>
                  Report an Issue
                </Button>
                <Button className="hero-secondary-btn" onClick={() => navigate("/view-issues")}>
                  View Issues
                </Button>
              </div>
            </div>

            {/* Right Image Container */}
            <div className="hero-image-container">
              <div className="hero-image-frame">
                <img 
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop" 
                  alt="City Infrastructure" 
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* REPORT PROBLEMS */}
      <section className="section-wrapper report-problems-section">
        <Container>
          <h2 className="section-title scroll-animate">What You Can Report</h2>
          <p className="section-subtitle scroll-animate">
            Quickly raise civic issues using clear categories with photo evidence and location details.
          </p>

          <div className="problem-report-grid">
            <div className="problem-report-card scroll-animate">
              <div className="feature-icon">
                <FaRoad />
              </div>
              <h5>Road Damage</h5>
              <p>Potholes, broken surfaces, and unsafe roads affecting public transport and safety.</p>
            </div>

            <div className="problem-report-card scroll-animate">
              <div className="feature-icon">
                <FaTrashAlt />
              </div>
              <h5>Garbage Overflow</h5>
              <p>Missed pickups, overflowing bins, and unmanaged waste in streets and neighborhoods.</p>
            </div>

            <div className="problem-report-card scroll-animate">
              <div className="feature-icon">
                <FaLightbulb />
              </div>
              <h5>Streetlight Failure</h5>
              <p>Broken or non-functional lights that create dark and unsafe public spaces.</p>
            </div>

            <div className="problem-report-card scroll-animate">
              <div className="feature-icon">
                <FaTint />
              </div>
              <h5>Drainage Issues</h5>
              <p>Blocked drains and waterlogging problems that cause flooding and sanitation risks.</p>
            </div>

            <div className="problem-report-card scroll-animate">
              <div className="feature-icon">
                <FaExclamationTriangle />
              </div>
              <h5>Public Hazards</h5>
              <p>Open manholes, damaged barriers, and other immediate threats in public areas.</p>
            </div>

            <div className="problem-report-card scroll-animate">
              <div className="feature-icon">
                <FaCity />
              </div>
              <h5>Civic Infrastructure</h5>
              <p>Damaged signs, bus stops, footpaths, and other essential city infrastructure.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ABOUT OUR MISSION */}
      <section className="section-wrapper">
        <Container>
          <h2 className="section-title scroll-animate">About Our Mission</h2>
          <p className="section-subtitle scroll-animate">
            We empower citizens to build cleaner, safer, and stronger communities.
          </p>
          
          <div className="feature-cards-grid">
            <div className="feature-card scroll-animate">
              <div className="feature-icon">
                <FaLeaf />
              </div>
              <h5>Clean & Green</h5>
              <p>Promoting environmental sustainability through technology-driven civic solutions.</p>
            </div>
            
            <div className="feature-card scroll-animate">
              <div className="feature-icon">
                <FaHandshake />
              </div>
              <h5>Trust & Transparency</h5>
              <p>Building accountability between citizens and authorities with full transparency.</p>
            </div>
            
            <div className="feature-card scroll-animate">
              <div className="feature-icon">
                <FaUsers />
              </div>
              <h5>Community Driven</h5>
              <p>Empowering citizens to actively participate in making their city better.</p>
            </div>
            
            <div className="feature-card scroll-animate">
              <div className="feature-icon">
                <FaBolt />
              </div>
              <h5>Efficient Resolution</h5>
              <p>Streamlined processes ensure issues are resolved quickly and effectively.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-wrapper">
        <Container>
          <h2 className="section-title scroll-animate">How It Works</h2>
          <p className="section-subtitle scroll-animate">
            Our streamlined process ensures your civic issues are handled efficiently from report to resolution.
          </p>
          
          <div className="feature-cards-grid">
            <div className="feature-card scroll-animate">
              <span className="step-number">01</span>
              <div className="feature-icon">
                <FaPen />
              </div>
              <h5>Report an Issue</h5>
              <p>Submit details with description, photo, and location through our simple form.</p>
            </div>
            
            <div className="feature-card scroll-animate">
              <span className="step-number">02</span>
              <div className="feature-icon">
                <FaDatabase />
              </div>
              <h5>Stored in System</h5>
              <p>Issue is recorded in a centralized database for tracking and management.</p>
            </div>
            
            <div className="feature-card scroll-animate">
              <span className="step-number">03</span>
              <div className="feature-icon">
                <FaUserShield />
              </div>
              <h5>Authorities Take Action</h5>
              <p>Concerned department is automatically notified and assigned the issue.</p>
            </div>
            
            <div className="feature-card scroll-animate">
              <span className="step-number">04</span>
              <div className="feature-icon">
                <FaCheckCircle />
              </div>
              <h5>Track & Resolve</h5>
              <p>Citizen receives real-time updates until the issue is completely resolved.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="section-wrapper">
        <Container>
          <h2 className="section-title scroll-animate">Why This Matters</h2>
          <p className="section-subtitle scroll-animate">
            A clean and well-managed city is every citizen's right.
          </p>
          
          <div className="feature-cards-grid">
            <div className="feature-card scroll-animate-scale">
              <div className="feature-icon">
                <FaHome />
              </div>
              <h5>Quality of Life</h5>
              <p>Cleaner streets, better infrastructure, and safer neighborhoods improve daily life.</p>
            </div>
            
            <div className="feature-card scroll-animate-scale">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h5>Good Governance</h5>
              <p>Transparent communication between citizens and authorities builds trust.</p>
            </div>
            
            <div className="feature-card scroll-animate-scale">
              <div className="feature-icon">
                <FaGlobe />
              </div>
              <h5>Environmental Impact</h5>
              <p>Quick resolution of environmental issues contributes to greener cities.</p>
            </div>
            
            <div className="feature-card scroll-animate-scale">
              <div className="feature-icon">
                <FaHandsHelping />
              </div>
              <h5>Community Unity</h5>
              <p>Citizens and authorities working together create stronger communities.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* FOOTER - CONDENSED */}
      <footer className="footer-section">
        <Container>
          <Row className="g-3">
            <Col md={4}>
              <h5>Embassy Of India</h5>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '0.5rem' }}>
                Guatemala, Guatemala City
              </p>
              <p style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                Mon-Fri: 9:30am - 6:00pm
              </p>
            </Col>
            
            <Col md={4}>
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <Link to="/">• Home</Link>
                </li>
                <li>
                  <Link to="/report">• Report Issue</Link>
                </li>
                <li>
                  <Link to="/view-issues">• View Issues</Link>
                </li>
                <li>
                  <Link to="/gallery">• Gallery</Link>
                </li>
                <li>
                  <Link to="/contact">• Contact</Link>
                </li>
              </ul>
            </Col>
            
            <Col md={4}>
              <h6>Contact Information</h6>
              <p className="footer-contact">support@civicreport.com</p>
              <p className="footer-contact">+91-1234567890</p>
            </Col>
          </Row>
          
          <div className="footer-bottom">
            <p>© Embassy Of India, Guatemala | All Rights Reserved</p>
          </div>
        </Container>
      </footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function LegacyPathRedirect({ fromPrefix, toPrefix }) {
  const location = useLocation();
  const path = location.pathname || "";
  const suffix = path.startsWith(fromPrefix)
    ? path.slice(fromPrefix.length)
    : "";

  return (
    <Navigate
      to={`${toPrefix}${suffix}${location.search || ""}${location.hash || ""}`}
      replace
    />
  );
}

function AppRoutes() {
  const location = useLocation();
  const path = location.pathname || "";
  const navigate = useNavigate();
  
  const isPublicPath = (p) => {
    if (!p) return false;
    const normalized = String(p).toLowerCase();
    const publicPaths = [
      "/",
      "/report",
      "/view-issues",
      "/contact",
      "/gallery",
      "/login",
      "/login/login",
      "/login/forgot-password",
      "/login/reset-password",
      "/login/",
    ];
    return publicPaths.includes(normalized);
  };

  const getRoleHome = (role) => {
    if (!role) return null;
    const r = String(role).toLowerCase();
    if (r === "super_admin") return "/super-admin/welcome";
    if (r === "middle_admin") return "/admin/dashboard";
    if (r === "officer") return "/officer/dashboard";
    return null;
  };

  React.useEffect(() => {
    const getSessionId = () => sessionStorage.getItem("sessionId");
    const getStoredRole = () => {
      try {
        const u = JSON.parse(localStorage.getItem("user") || "{}") || {};
        return u?.role ? String(u.role).toLowerCase() : null;
      } catch (e) {
        return null;
      }
    };

    const isAuth = !!(localStorage.getItem("token") && getStoredRole());
    if (!isAuth) return;

    const onPopState = (ev) => {
      const cur = window.location.pathname || "/";
      const currentSession = getSessionId();
      const poppedSession = ev?.state?.sessionId || null;

      if (poppedSession && currentSession && poppedSession !== currentSession) {
        const role = getStoredRole();
        const home = getRoleHome(role);
        if (home) {
          navigate(home, { replace: true });
        }
        return;
      }

      if (isPublicPath(cur)) {
        const role = getStoredRole();
        const home = getRoleHome(role);
        if (home) {
          navigate(home, { replace: true });
        }
      }
    };

    window.addEventListener("popstate", onPopState);

    if (isPublicPath(path)) {
      const role = getStoredRole();
      const home = getRoleHome(role);
      if (home) {
        navigate(home, { replace: true });
      }
    }

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [path, navigate]);

  React.useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    const isAuth = !!(localStorage.getItem("token") && sessionId);
    if (!isAuth) return;

    try {
      const state = window.history.state || {};
      if (state.sessionId !== sessionId) {
        window.history.replaceState({ ...state, sessionId }, "", window.location.href);
      }
    } catch (e) {
      // ignore
    }
  }, [location]);

  const hideNav =
    path.startsWith("/officer/dashboard") ||
    path.startsWith("/admin/dashboard") ||
    path.startsWith("/super-admin/welcome");

  const hasPublicImageBackground = (p) => {
    if (!p) return false;
    const normalized = String(p).toLowerCase();
    const imageBackgroundPaths = [
      "/",
      "/gallery",
      "/report",
      "/view-issues",
      "/contact",
      "/login",
      "/login/login",
      "/login/",
    ];
    return imageBackgroundPaths.includes(normalized);
  };

  React.useEffect(() => {
    const shouldUseImageBg = hasPublicImageBackground(path);
    document.body.classList.toggle("public-image-bg", shouldUseImageBg);

    return () => {
      document.body.classList.remove("public-image-bg");
    };
  }, [path]);

  const publicMenuItems = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/gallery", label: "Gallery", icon: "🖼️" },
    { to: "/report", label: "Report Issue", icon: "📝" },
    { to: "/view-issues", label: "View Issues", icon: "📋" },
    { to: "/contact", label: "Contact", icon: "📞" },
    { to: "/Login", label: "Login", icon: "🔐" },
  ];

  const publicNavLinkClass = ({ isActive }) =>
    `nav-link custom-nav-link${isActive ? " active" : ""}`;

  return (
    <>
      {/* Horizontal navbar - Desktop only */}
      {!hideNav && (
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar d-none d-lg-block">
          <div className="container-fluid px-4">
            <Link to="/" className="navbar-brand custom-navbar-brand">
              🏛️ Civic Report
            </Link>

            <div className="collapse navbar-collapse">
              <div className="navbar-nav me-auto">
                <NavLink to="/gallery" className={publicNavLinkClass}>
                  Gallery
                </NavLink>
                <NavLink to="/report" className={publicNavLinkClass}>
                  Report Issue
                </NavLink>
                <NavLink to="/view-issues" className={publicNavLinkClass}>
                  View Issues
                </NavLink>
                <NavLink to="/contact" className={publicNavLinkClass}>
                  Contact
                </NavLink>
              </div>

              <div className="d-flex">
                <Link to="/Login" className="btn custom-login-btn">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Hamburger sidebar - Mobile only */}
      {!hideNav && (
        <div className="d-lg-none">
          <HamburgerSidebar
            user={""}
            photoUrl={null}
            initial={"U"}
            menuItems={publicMenuItems}
            onLogout={() => {}}
            role={null}
          />
        </div>
      )}

      <Routes>
        {/* ================= LEGACY PATH REDIRECTS ================= */}
        <Route
          path="/admin/welcome/*"
          element={
            <LegacyPathRedirect
              fromPrefix="/admin/welcome"
              toPrefix="/super-admin/welcome"
            />
          }
        />
        <Route
          path="/middle-admin/dashboard/*"
          element={
            <LegacyPathRedirect
              fromPrefix="/middle-admin/dashboard"
              toPrefix="/admin/dashboard"
            />
          }
        />
        <Route
          path="/super-admin/welcome/middle-admins/*"
          element={
            <LegacyPathRedirect
              fromPrefix="/super-admin/welcome/middle-admins"
              toPrefix="/super-admin/welcome/admins"
            />
          }
        />

        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportIssuePage />} />
          <Route path="/view-issues" element={<ViewIssuePage />} />
          <Route path="/view-issues/:id" element={<ViewIssueDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<MainGalleryPage />} />
          <Route path="/Login" element={<AdminLoginPage />} />
          <Route path="/Login/login" element={<AdminLoginPage />} />
          {/* <Route path="/Login/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/Login/reset-password" element={<AdminResetPassword />} /> */}
        </Route>

        {/* ================= MIDDLE ADMIN DASHBOARD ================= */}
        <Route element={<RequireAuth allowedRoles={["middle_admin"]} />}>
          <Route path="/admin/dashboard" element={<MiddleAdminDashboardPage />}>
            <Route index element={<></>} />
            <Route path="officers" element={<MiddleAdminOfficerOptionsPage />} />
            <Route path="officers/add" element={<MiddleAdminAddOfficerForm />} />
            <Route path="officers/edit" element={<MiddleAdminOfficerListEdit />} />
            <Route path="officers/editform" element={<MiddleAdminEditOfficerForm />} />
            <Route path="officers/manage" element={<MiddleAdminManageOfficersPage />} />
            <Route path="officers/list" element={<MiddleAdminOfficerListPage />} />
            <Route path="users" element={<MiddleAdminUserOptionsPage />} />
            <Route path="users/manage" element={<MiddleAdminManageUsersPage />} />
            <Route path="users/activity" element={<MiddleAdminUserActivityPage />} />
            <Route path="users/list" element={<MiddleAdminUserListPage />} />
            <Route path="issues" element={<MiddleAdminIssuesOptions />} />
            <Route path="issues/:id" element={<MiddleAdminIssueDetails />} />
            <Route path="issues/list" element={<MiddleAdminIssuesList />} />
            <Route path="issues/assign" element={<MiddleAdminAssignIssuesPage />} />
            <Route path="reports" element={<MiddleAdminReportsHomePage />} />
            <Route path="reports/areas/details" element={<MiddleAdminAreaDetailsPage />} />
            <Route path="reports/areas" element={<MiddleAdminAreasReportPage />} />
            <Route path="reports/issues" element={<MiddleAdminIssuesReportPage />} />
            <Route path="reports/officers/performance" element={<MiddleAdminOfficerPerformancePage />} />
            <Route path="settings" element={<MiddleAdminSettingsPage />} />
            <Route path="settings/profile" element={<MiddleAdminProfileSettingsPage />} />
            <Route path="settings/security" element={<MiddleAdminSecuritySettingsPage />} />
          </Route>
        </Route>

        {/* ================= OFFICER DASHBOARD ================= */}
        <Route element={<RequireAuth allowedRoles={["officer"]} />}>
          <Route path="/officer/dashboard" element={<OfficerDashboardPage />}>
            <Route index element={<></>} />
            <Route path="issues" element={<OfficerIssuesList />} />
            <Route path="issues/:id" element={<OfficerIssueDetails />} />
            <Route path="reports" element={<OfficerIssuesReportPage />} />
            <Route path="settings" element={<OfficerSettingsPage />} />
            <Route path="settings/profile" element={<OfficerProfileSettingsPage />} />
            <Route path="settings/security" element={<OfficerSecuritySettingsPage />} />
            <Route path="gallery-upload" element={<GalleryOptionsPage />} />
            <Route path="gallery-upload/list" element={<GalleryListPage />} />
            <Route path="gallery-upload/new" element={<OfficerGalleryUploadPage />} />
          </Route>
        </Route>

        {/* ================= SUPER ADMIN DASHBOARD ================= */}
        <Route element={<RequireAuth allowedRoles={["super_admin"]} />}>
          <Route path="/super-admin/welcome" element={<WelcomePage />}>
            <Route index element={<></>} />
            <Route path="issues" element={<Issuesoptions />} />
            <Route path="issues/list" element={<Issueslist />} />
            <Route path="issues/:id" element={<IssueDetails />} />
            <Route path="admins" element={<MiddleAdminpageoptions />} />
            <Route path="admins/add" element={<AddMiddleAdminForm />} />
            <Route path="admins/list" element={<ViewMiddleAdminsList />} />
            <Route path="admins/edit" element={<EditMiddleAdminForm />} />
            <Route path="admins/edit-list" element={<EditMiddleAdminsList />} />
            <Route path="admins/manage" element={<DeleteBlockUnblockMiddleAdmins />} />
            <Route path="officers" element={<OfficerOptionsPage />} />
            <Route path="officers/add" element={<AddOfficerForm />} />
            <Route path="officers/list" element={<OfficerListPage />} />
            <Route path="officers/manage" element={<ManageOfficersPage />} />
            <Route path="officers/edit" element={<OfficerListEdit />} />
            <Route path="officers/editform" element={<EditOfficerForm />} />
            <Route path="users" element={<UserOptionsPage />} />
            <Route path="users/list" element={<UserListPage />} />
            <Route path="users/manage" element={<ManageUsersPage />} />
            <Route path="users/activity" element={<UserActivityPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="settings/profile" element={<ProfileSettingsPage />} />
            <Route path="settings/security" element={<SecuritySettingsPage />} />
            <Route path="reports" element={<ReportsHomePage />} />
            <Route path="reports/issues" element={<IssuesReportPage />} />
            <Route path="reports/areas" element={<AreasReportPage />} />
            <Route path="reports/areas/details" element={<AreaDetailsPage />} />
            <Route path="reports/officers/performance" element={<OfficerPerformancePage />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;