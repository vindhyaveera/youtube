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
// import Test from '../Components/HomeComponents/Test'

const AppContent = () => {
  const isLoggedIn = useSelector((state) => state.videos.isLoggedIn); // Login status

  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  const location = useLocation();

  // List of routes where the sidebar should NOT be displayed
  // const noSidebarRoutes = ["/details/:id"];

  // List of routes where ScrollMenu should NOT be displayed
  const noSidebarRoutes = ["/details/:id"];

  const shouldShowSidebar = useMemo(() => {
    return (
      location.pathname === "/search" || // Sidebar should always show on SearchComponent
      location.pathname.startsWith("/profile/") || // Sidebar should show on profile pages
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

  console.log("Scroll:", shouldShowScrollMenu);

  return (
    <div>
      <Header />
      {shouldShowSidebar && <Sidebar />}
      {isLoggedIn ? (
        <>
          {shouldShowScrollMenu && <ScrollMenu />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:id" element={<BigVideosDetails />} />
            <Route path="/search" element={<SearchComponent />} />
            <Route path="/watchlater" element={<WatchLaterPage />} />
            <Route path="/profile/:userid" element={<Profile />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </>
      ) : (
        // Placeholder content when user is not logged in
        <div
        style={{
          textAlign: "center",
          marginTop: "10%",
          padding: "20px", // Adds padding inside the box
          border: "0.1px solid #ADD8E6", // Light blue border
          borderRadius: "10px", // Rounded corners
          boxShadow: "8px 0 8px rgba(173, 216, 230, 0.5), -8px 0 8px rgba(173, 216, 230, 0.5)", // Light blue shadow on left and right
          backgroundColor: "#f0f8ff", // Light background color (like Alice Blue)
          marginLeft: "auto", // Centers the box horizontally
          marginRight: "auto", // Centers the box horizontally
          width:"50%",
        }}
      >
        <h1>Welcome to the App</h1>
        <p>Please log in to access your account.</p>
      </div>
      
      )}
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
