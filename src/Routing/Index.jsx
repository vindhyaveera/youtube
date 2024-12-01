import React, { useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "../Components/HomeComponents/BigVideos/BigVideos";
import BigVideosDetails from "../Components/HomeComponents/BigVideosDetails/BigVideosDetails";
import SearchComponent from "../Components/HomeComponents/SearchComponents/SearchComponents";
import WatchLaterPage from "../Components/HomeComponents/WatchLaterPage/WatchLaterPage";
import Header from "../Layouts/Header/Header";
import Sidebar from "../Layouts/Sidebar/Sidebar";
import ScrollMenu from "../Layouts/ScrollMenu/ScrollMenu";
import Profile from "../Components/HomeComponents/ProileForm/ProfileForm";
import AdminPage from "../Components/HomeComponents/AdminComponents/AdminComponents";

const AppContent = () => {
  const isLoggedIn = useSelector((state) => state.videos.isLoggedIn); // Login status
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  const location = useLocation();

  const noSidebarRoutes = ["/details/:id"];

  const shouldShowSidebar = useMemo(() => {
    return (
      location.pathname === "/search" ||
      location.pathname.startsWith("/profile/") ||
      (!noSidebarRoutes.some((route) =>
        location.pathname.startsWith(route.split("/:")[0])
      ) &&
        !isMenuOpen)
    );
  }, [location.pathname, noSidebarRoutes, isMenuOpen]);

  const shouldShowScrollMenu = useMemo(
    () => ["/", "/search"].includes(location.pathname),
    [location.pathname]
  );

  const handleStartImageClick = () => {
    if (!isLoggedIn) {
      alert("You need to sign in to access this feature!");
    } else {
      // Perform your actual functionality for the start image here
      console.log("Start image clicked!");
    }
  };

  return (
    <div>
      <Header onStartImageClick={handleStartImageClick} />
      {shouldShowSidebar && <Sidebar />}
      {shouldShowScrollMenu && <ScrollMenu />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<BigVideosDetails />} />

        {/* Search is accessible to everyone */}
        <Route path="/search" element={<SearchComponent />} />
        <Route path="/watchlater" element={<WatchLaterPage />} />

        {/* Content restricted to logged-in users */}
        {isLoggedIn ? (
          <>
            <Route path="/profile/:userid" element={<Profile />} />
            <Route path="/admin" element={<AdminPage />} />
          </>
        ) : (
          // Placeholder content for unauthenticated users
          <Route
            path="/"
            element={
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10%",
                  padding: "20px",
                  border: "0.1px solid #ADD8E6",
                  borderRadius: "10px",
                  boxShadow:
                    "8px 0 8px rgba(173, 216, 230, 0.5), -8px 0 8px rgba(173, 216, 230, 0.5)",
                  backgroundColor: "#f0f8ff",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "50%",
                }}
              >
                <h1>Welcome to the App</h1>
                <p>Please log in to access your account.</p>
              </div>
            }
          />
        )}
      </Routes>
    </div>
  );
};

const Index = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default Index;
