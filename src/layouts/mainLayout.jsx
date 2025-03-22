import React, { useEffect } from "react";
import Sidebar from "../components/sideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { navigations } from "../navigations";
import useAuth from "../hooks/useAuth";
import { observer } from "mobx-react-lite";

function MainLayout() {
  const {auth, getRole} = useAuth()
  return (
    <div className="flex h-screen">
      <Sidebar
        navigations={navigations}
        userInfo={auth.user}
        userRole={getRole}
        logoSrc="/bolsta_logo.png"
      />
      <div className="flex-1 bg-red-500 h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default observer(MainLayout);
