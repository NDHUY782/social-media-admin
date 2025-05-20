import { api, IPagination, setAuthToken } from "../helpers";
import {
  IAddUserRequest,
  IReportedUser,
  IUpdateUserRequest,
  IUser,
} from "../store/users/types";

const login = async (email: string, password: string) => {
  const body = { email, password };
  return await api.post("/users/admin-login", body).then((response) => {
    sessionStorage.setItem("user", JSON.stringify(response.data));
    setAuthToken(response.data.data.token);
    return response.data;
  });
};

const logout = () => {
  sessionStorage.removeItem("user");
};

const getCurrentLoginUser = async (): Promise<any> => {
  return await api.get<any>("/users/current-user").then((response) => {
    return response.data;
  });
};

const getUsersPaging = async (
  keyword: string,
  currentPage: number
): Promise<IPagination<IUser>> => {
  const res = await api
    .get<IPagination<IUser>>(
      `users/paging-users/${currentPage}?keyword=${keyword}`
    )
    .then((response) => {
      return response.data;
    });

  return res;
};
const getAdminsPaging = async (
  keyword: string,
  currentPage: number
): Promise<IPagination<IUser>> => {
  const res = await api
    .get<IPagination<IUser>>(`users/paging/${currentPage}?keyword=${keyword}`)
    .then((response) => {
      return response.data;
    });

  return res;
};

const addAdminForSystem = async (user: IAddUserRequest): Promise<any> => {
  const res = await api.post("/users/add-admin", user).then((response) => {
    return response.data;
  });
  return res;
};

const updateAdmin = async (id: string, user: IUpdateUserRequest) => {
  const res = await api
    .put(`/users/update-admin/${id}`, user)
    .then((response) => {
      return response.data;
    });
  return res;
};
const getAdminById = async (id: string): Promise<IUser> => {
  const res = await api.get<IUser>(`/users/admin/${id}`).then((response) => {
    return response.data;
  });
  return res;
};
// const deleteAdmin = async (id: string) => {
//   const res = await api.delete(`/users/delete-admin/${id}`).then((response) => {
//     return response.data;
//   });
//   return res;
// };
const deleteAdmins = async (user_ids: string[]) => {
  const res = await api
    .delete("/users/delete-admins", { data: { user_ids } })
    .then((response) => {
      return response.data;
    });
  console.log(res);
  return res;
};
// Report user
const reportUser = async (user_id: string, reason: string) => {
  const res = await api
    .post(`/users/report/${user_id}`, { reason })
    .then((response) => response.data);
  return res;
};

// Get all reported users
const getReportedUsers = async (): Promise<IReportedUser[]> => {
  const res = await api
    .get(`/users/admin/reported-users`)
    .then((response) => response.data.data);
  return res;
};

// Ban a user
const banUser = async (user_id: string): Promise<any> => {
  const res = await api
    .patch(`/users/ban/${user_id}`)
    .then((response) => response.data);
  return res;
};

// Unban a user
const unbanUser = async (user_id: string): Promise<any> => {
  const res = await api
    .patch(`/users/unban/${user_id}`)
    .then((response) => response.data);
  return res;
};

export const userService = {
  login,
  getCurrentLoginUser,
  logout,
  getAdminsPaging,
  getUsersPaging,
  addAdminForSystem,
  updateAdmin,
  getAdminById,
  // deleteAdmin,
  deleteAdmins,
  reportUser,
  getReportedUsers,
  banUser,
  unbanUser,
};
