import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FeedPage from './pages/FeedPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import DashboardPage from './pages/DashboardPage';
import CampaignNewPage from './pages/CampaignNewPage';
import JobsPage from './pages/JobsPage';
import WalletPage from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/campaign/:id" element={<CampaignDetailPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/campaign-new" element={<CampaignNewPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
