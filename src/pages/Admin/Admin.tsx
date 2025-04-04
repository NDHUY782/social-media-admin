import React, { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../../styles/sb-admin-2.min.css";
import { LeftMenu } from "./LeftMenu/LeftMenu";
import { TopBar } from "./TopBar/TopBar";
import { useDispatch } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { getCurrentLoginUser } from "../../store/accounts/actions";

import { Home } from "./Home/Home";
import { User } from "./Users/User";
import { useSelector } from "react-redux";
import { PageAdmin } from "./Users/PageAdmin";
import { AddAdmin } from "./Users/AddAdmin";
import { EditAdmin } from "./Users/EditAdmin";

export const Admin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const alert = useSelector((state: AppState) => state.alert);

  useEffect(() => {
    dispatch(getCurrentLoginUser());
  }, [dispatch]);
  return (
    <Fragment>
      <LeftMenu />
      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          <TopBar />

          {/* Begin Page Content */}
          <div className="container-fluid">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<User />} />
              <Route path="/admins" element={<PageAdmin />} />
              <Route path="/add-admins" element={<AddAdmin />} />
              <Route path="/edit-admin/:id" element={<EditAdmin />} />
            </Routes>
          </div>
          {/* /.container-fluid */}
        </div>
        {/* End of Main Content */}
        {/* Footer */}
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright © Your Website 2021</span>
            </div>
          </div>
        </footer>
        {/* End of Footer */}
      </div>
      {/* End of Content Wrapper */}
    </Fragment>
  );
};
