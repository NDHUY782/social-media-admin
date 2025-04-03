import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../../store/users/types";
import { useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../store";
import { useDispatch } from "react-redux";
import {
  loadAdminsPaging,
  loadUsersPaging,
} from "../../../store/users/actions";
import { Pagination } from "../../../components";
import { UrlConstants } from "../../../constants";

export const PageAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users: IUser[] = useSelector((state: AppState) => state.users.items);
  const totalItems = useSelector((state: AppState) => state.users.total);
  const pageSize = useSelector((state: AppState) => state.users.pageSize);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    dispatch(loadAdminsPaging(searchKeyword, currentPage));
  }, [dispatch, currentPage, searchKeyword]);

  const onPageChanged = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(loadAdminsPaging(searchKeyword, pageNumber));
  };

  const handleKeywordPress = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const clearSearch = () => {
    setShowSearch(true);
    dispatch(loadAdminsPaging("", 1));
  };

  const userElement: React.ReactElement[] = users.map((user) => {
    return (
      <tr key={`user_${user._id}`}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>
          <Link to={UrlConstants.ADMIN_EDIT + user._id}>Edit</Link>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Admins List</h1>

      {showSearch && (
        <div className="row mb-3">
          <div className="col-xl-12 col-md-12 mb-12">
            <div className="card">
              <h5 className="card-header">Tìm kiếm</h5>
              <div className="header-buttons">
                <button
                  className="btn btn-default"
                  onClick={() => setShowSearch(false)}
                >
                  Đóng
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="card-body">
                <form className="form-inline">
                  <div className="col-auto">
                    <input
                      type="text"
                      value={searchKeyword}
                      onChange={handleKeywordPress}
                      className="form-control"
                      placeholder="Từ khoá"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(loadUsersPaging(searchKeyword, currentPage))
                    }
                    className="btn btn-primary my-1"
                  >
                    Tìm kiếm
                  </button>
                  <button
                    type="button"
                    onClick={() => clearSearch()}
                    className="btn btn-default my-1"
                  >
                    Xóa
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DataTales Example */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Admins List</h6>
        </div>
        <div className="header-buttons">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => setShowSearch(true)}
          >
            Search Admins
          </button>
          <Link
            to={UrlConstants.ADMIN_ADD}
            className="btn btn-outline-success btn-sm"
          >
            <span className="fa fa-plus"></span> Add Admins
          </Link>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing={0}
            >
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{userElement}</tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <Pagination
            totalRecords={totalItems}
            pageLimit={5}
            pageSize={pageSize}
            onPageChanged={onPageChanged}
          ></Pagination>
        </div>
      </div>
    </Fragment>
  );
};
