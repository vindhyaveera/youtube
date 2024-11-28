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
import AdminPage from '../Components/HomeComponents/AdminComponents/AdminComponents'
// import Test from '../Components/HomeComponents/Test'

const AppContent = () => {
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
      {shouldShowScrollMenu && <ScrollMenu />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<BigVideosDetails />} />
        <Route path="/search" element={<SearchComponent />} />
        <Route path="/watchlater" element={<WatchLaterPage />} />
        <Route path="/profile/:userid" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} /> {/* Define the route */}
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
