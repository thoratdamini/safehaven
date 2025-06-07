import "./App.css";
import DataProvider from "./context/DataProvider";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import { useState } from "react";
import { Box } from "@mui/material";
import CreatePost from "./components/create/CreatePost";
import DetailView from "./components/details/DetailView";
import UpdatePost from "./components/create/UpdatePost";
import AdminIndex from "./pages/admin/adminIndex.jsx";
import MainDashboard from "./components/MainDashboard/MainDashboard.jsx";
import HomeAboutSection from "../src/components/MainDashboard/About.jsx";
import HomeContactSection from "../src/components/MainDashboard/Contact.jsx";
import HomeFAQ from "../src/components/MainDashboard/FAQ.jsx";

import Community from "./pages/admin/Community.jsx";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/home" />
  );
};
const AdminRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
          <Outlet />

    </>
  ) : (
    <Navigate replace to="/home" />
  );
};

const DetailViewRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/home" />
  );
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/home">
              <Route path="/home" element={<MainDashboard />} />
            </Route>
            
            <Route path="/home/about">
              <Route path="/home/about" element={<HomeAboutSection />} />
            </Route>
            <Route path="/home/contact">
              <Route path="/home/contact" element={<HomeContactSection />} />
            </Route>
            <Route path="/home/faq">
              <Route path="/home/faq" element={<HomeFAQ />} />
            </Route>
            <Route
              path="/login"
              element={<Login isUserAuthenticated={isUserAuthenticated} />}
            />
            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/" element={<Home />} />
            </Route>
            <Route
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route element={<Header/>} />
            </Route>
            <Route
              path="/create"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/create" element={<CreatePost />} />
            </Route>
            <Route
              path="/details/:id"
              element={<DetailViewRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/details/:id" element={<DetailView />} />
            </Route>
            <Route
              path="/update/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/update/:id" element={<UpdatePost />} />
            </Route>
            <Route
              path="/admin"
              element={<AdminRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/admin" element={<AdminIndex />} />
            </Route>
            <Route
              path="/admin/community"
              element={<AdminRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/admin/community" element={<Community />} />
            </Route>
            <Route
              path="/admin/community/details/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route
                path="/admin/community/details/:id"
                element={<DetailView />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
