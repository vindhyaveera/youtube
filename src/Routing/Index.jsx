import React from "react";
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


const AppContent = () => {
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  const location = useLocation();

  // List of routes where the sidebar should NOT be displayed
  const noSidebarRoutes = ["/details/:id"];

  // Determine if Sidebar should be hidden for specific routes
  const shouldShowSidebar =
    location.pathname === "/search" || // Sidebar should always show on SearchComponent
    (!noSidebarRoutes.some((route) => {
      const routeBase = route.split("/:")[0];
      return location.pathname.startsWith(routeBase);
    }) &&
      !isMenuOpen);

  // Check if ScrollMenu should be shown
  const shouldShowScrollMenu = ["/", "/search"].includes(location.pathname);

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
