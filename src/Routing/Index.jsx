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
  // const isLoggedIn = useSelector((state) => state.videos.isLoggedIn); // Login status
  const userid = useSelector((state) => state.videos.userId);
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  const location = useLocation();

  const noSidebarRoutes = ["/details/:id"];

  console.log("userid from index", userid);
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

  // const handleStartImageClick = () => {
  //   if (!isLoggedIn) {
  //     console.log("Hi Hello")
  //     alert("You need to sign in to access this feature!");
  //   } else {
  //     // Perform your actual functionality for the start image here
  //     console.log("Start image clicked!");
  //   }
  // };

  return (
    <div>
      {/* onStartImageClick={handleStartImageClick} */}
      {/* <Header onStartImageClick={handleStartImageClick} /> */}
      <Header />
      {shouldShowSidebar && <Sidebar />}
      {shouldShowScrollMenu && <ScrollMenu />}
      <Routes>
        {/* Search is accessible to everyone */}
        <Route path="/details/:id" element={<BigVideosDetails />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchComponent />} />
        {userid ? (
          <>
            <Route path="/profile/:userid" element={<Profile />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/watchlater" element={<WatchLaterPage />} />
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
