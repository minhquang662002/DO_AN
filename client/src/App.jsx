import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDarkMode } from "./hooks/hooks";
import HomePage from "./components/home/HomePage";
import ProfilePage from "./components/profile/ProfilePage";
import AuthLayout from "./components/auth/AuthLayout";
import Page404 from "./components/404/Page404";
import FriendsPage from "./components/friends/FriendsPage";
import ExplorePage from "./components/explore/ExplorePage";
import Messenger from "./components/messenger/Messenger";
import WeatherPage from "./components/weather/WeatherPage";
import SavedPage from "./components/saved/SavedPage";
import ProtectedRoute from "./components/layout/Protected";
import NotificationPage from "./components/notification/NotificationPage";
import WatchPage from "./components/watch/WatchPage";
import GroupPage from "./components/group/GroupPage";
import SettingsPage from "./components/settings/SettingsPage";
import MovieDetaiWatch from "./components/watch/pages/movie/MovieDetailWatch";
import MovieDetail from "./components/watch/pages/movie/MovieDetail";
function App() {
  useDarkMode();

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col min-h-screen font-poppins bg-slate-50 dark:bg-slate-800">
        <Routes>
          <Route path="/login" element={<AuthLayout />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/messenger" element={<Messenger />} />
            <Route path="/watch" element={<WatchPage />}>
              <Route path="genre"></Route>
              <Route path="tv"></Route>
            </Route>
            <Route path="/watch/:media_type/:id" element={<MovieDetail />} />
            <Route
              path="/watch/:media_type/:id/watch"
              element={<MovieDetaiWatch />}
            />
            <Route path="/group" element={<GroupPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/notification" element={<NotificationPage />} />
          </Route>
          <Route path="/404" element={<Page404 />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
