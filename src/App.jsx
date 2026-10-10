import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { supabase } from "./lib/supabaseClient";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FeedPage from "./pages/FeedPage";
import CampaignDetailPage from "./pages/CampaignDetailPage";
import DashboardPage from "./pages/DashboardPage";
import CampaignNewPage from "./pages/CampaignNewPage";
import JobsPage from "./pages/JobsPage";
import WalletPage from "./pages/WalletPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";

function ProtectedRoute({ session, loading, children }) {
  const location = useLocation();

  if (loading) {
    return <p>Checking your login...</p>;
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();

      if (isMounted) {
        if (error) {
          console.error("Unable to check session:", error.message);
        }

        setSession(data?.session ?? null);
        setLoading(false);
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/feed"
        element={
          <ProtectedRoute session={session} loading={loading}>
            <FeedPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/campaign/:id"
        element={
          <ProtectedRoute session={session} loading={loading}>
            <CampaignDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute session={session} loading={loading}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/campaign-new"
        element={
          <ProtectedRoute session={session} loading={loading}>
            <CampaignNewPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute session={session} loading={loading}>
            <JobsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wallet"
        element={
          <ProtectedRoute session={session} loading={loading}>
            <WalletPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute session={session} loading={loading}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute session={session} loading={loading}>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
