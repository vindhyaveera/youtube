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
import UserChannel from "../Components/HomeComponents/UserChannel/UserChannel";

const AppContent = () => {
  const userid = useSelector((state) => state.videos.userId);
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  const videos = useSelector((state) => state.videos.originalData);

  const location = useLocation();

  const noSidebarRoutes = ["/details/:id"];

  console.log("userid from index", userid);
  console.log("Videos:", videos);

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

  return (
    <div>
      <Header />
      {shouldShowSidebar && <Sidebar />}
      {shouldShowScrollMenu && <ScrollMenu />}
      <Routes>
        <Route path="/details/:id" element={<BigVideosDetails />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchComponent />} />
        <Route path="/profile/:userid" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/watchlater" element={<WatchLaterPage />} />
        <Route path="/channel/:channelname" element={<UserChannel/>}/>
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
