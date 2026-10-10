import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { MOCK_NOTIFICATIONS } from "../data";
import { RepostIcon, Avatar } from "./UI";
import { supabase } from "../lib/supabaseClient";

const NAV_LINKS = [
  {
    to: "/feed",
    label: "Feed",
    key: "feed",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="20"
        height="20"
      >
        <path d="M4 11a9 9 0 019-9" />
        <path d="M4 4a16 16 0 0116 16" />
        <circle cx="5" cy="19" r="1" />
      </svg>
    ),
  },
  {
    to: "/dashboard",
    label: "Studio",
    key: "dashboard",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="20"
        height="20"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    to: "/jobs",
    label: "My Gigs",
    key: "jobs",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="20"
        height="20"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
  },
  {
    to: "/wallet",
    label: "Wallet",
    key: "wallet",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="20"
        height="20"
      >
        <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path d="M16 3H8L4 7h16l-4-4z" />
        <circle cx="17" cy="13" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

export default function AppShell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);
  const [userName, setUserName] = useState("User");
  const [avatarColor] = useState("#B8F34A");

  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  const isActive = (key) => {
    if (key === "feed") return location.pathname === "/feed";
    return location.pathname.startsWith("/" + key);
  };

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted || !user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      if (mounted) {
        setUserName(
          profile?.full_name ||
            user.user_metadata?.full_name ||
            user.email?.split("@")[0] ||
            "User",
        );
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSignOut() {
    setSigningOut(true);

    const { error } = await supabase.auth.signOut();

    setSigningOut(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/login", { replace: true });
  }

  return (
    <>
      <div className="app-ambient noise" aria-hidden="true" />

      {/* Desktop/top header */}
      <header className="app-header">
        <div className="app-header-inner">
          <Link to="/" className="logo-link">
            <span className="logo-icon">
              <RepostIcon />
            </span>
            <span className="logo-text">
              repost<span className="text-volt">.</span>
            </span>
          </Link>
          <nav className="app-nav">
            {NAV_LINKS.map((n) => (
              <Link
                key={n.key}
                to={n.to}
                className={`app-nav-link${isActive(n.key) ? " active" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="app-header-actions">
            <Link to="/campaign-new" className="btn-new-campaign">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                width="16"
                height="16"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              New campaign
            </Link>
            <Link
              to="/notifications"
              className="notif-btn"
              aria-label="Notifications"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="18"
                height="18"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {unread > 0 && (
                <span className="notif-badge">
                  {unread > 9 ? "9+" : unread}
                </span>
              )}
            </Link>

            <Link to="/profile" aria-label="Profile">
              <Avatar name={userName} color={avatarColor} />
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="btn-new-campaign"
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="app-main">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          {NAV_LINKS.map((n, i) => (
            <Fragment key={n.key}>
              <Link
                to={n.to}
                className={`bnav-link${isActive(n.key) ? " active" : ""}`}
              >
                {n.icon}
                {n.label}
              </Link>
              {i === 1 && (
                <Link
                  key="create-fab"
                  to="/campaign-new"
                  className="bnav-create"
                  aria-label="Create campaign"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    width="24"
                    height="24"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </Link>
              )}
            </Fragment>
          ))}
        </div>
      </nav>
    </>
  );
}
