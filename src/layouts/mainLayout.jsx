import React, { useEffect } from "react";
import Sidebar from "../components/sideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { navigations } from "../navigations";
import useAuth from "../hooks/useAuth";
import { observer } from "mobx-react-lite";

function MainLayout() {
  const store = useAuth();
  const { getUser, getRole } = store;
  console.log(getUser);
  return (
    <div className="flex h-screen">
      <Sidebar
        onLogout={store.logout}
        navigations={navigations}
        userInfo={getUser}
        userRole={getRole}
        logoSrc="/bolsta_logo.png"
      />
      <div className="flex-1 h-full md:ml-64">
        <Outlet />
      </div>
    </div>
  );
}

export default observer(MainLayout);
