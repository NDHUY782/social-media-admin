import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../store";
import { loadReportedUsers, banUser } from "../../../store/users/actions";

export default function ManagerAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  const reportedUsers = useSelector(
    (state: AppState) => state.users.reportedUsers
  );
  const loading = useSelector((state: AppState) => state.users.loading);

  useEffect(() => {
    dispatch(loadReportedUsers());
  }, [dispatch]);

  const handleBan = (userId: string) => {
    dispatch(banUser(userId));
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Quản lý người dùng bị báo cáo</h1>
      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Danh sách người dùng bị báo cáo
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                width="100%"
                cellSpacing={0}
              >
                <thead>
                  <tr>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>Số lần báo cáo</th>
                    <th>Lý do báo cáo</th>
                    <th>Trạng thái</th>
                    <th>Người báo cáo</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {reportedUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        {user.first_name} {user.last_name}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.reports.length}</td>
                      <td>
                        <ul className="mb-0 pl-3">
                          {user.reports.map((r, index) => (
                            <li key={index}>{r.reason}</li>
                          ))}
                        </ul>
                      </td>
                      <td>Đã bị báo cáo</td>
                      <td>
                        <ul className="mb-0 pl-3">
                          {user.reports.map((r, index) => (
                            <li key={index}>
                              {r.reporter_id?.first_name &&
                              r.reporter_id?.last_name
                                ? `${r.reporter_id.first_name} ${r.reporter_id.last_name} ( ${r.reporter_id?.email} )`
                                : r.reporter_id?.email}
                            </li>
                          ))}
                        </ul>
                      </td>

                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleBan(user._id)}
                        >
                          Khoá acc
                        </button>
                      </td>
                    </tr>
                  ))}
                  {reportedUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center">
                        Không có người dùng nào bị báo cáo
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
