import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, AppState } from "../../../store";
import { IUpdateUserRequest } from "../../../store/users/types";
import { Link, useNavigate } from "react-router-dom";
import { UrlConstants } from "../../../constants";
import { validateEmail } from "../../../helpers";
import { updateAdmin, getAdminById } from "../../../store/users/actions";
import { useParams } from "react-router-dom";

export const EditAdmin = () => {
  let { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: AppState) => state.users.editUser);
  console.log(useSelector((state: AppState) => state.users.editUser));
  useEffect(() => {
    dispatch(getAdminById(id as string));
  }, [dispatch, id]);

  //   useEffect(() => {
  //     setFormInputs({
  //       first_name: user !== null ? user.first_name : "",
  //       last_name: user !== null ? user.last_name : "",
  //       email: user !== null ? user.email : "",
  //       mobile: user !== null ? user.mobile : "",
  //       role: user !== null ? user.role : "",
  //     });
  //   }, [user]);
  useEffect(() => {
    console.log("User data received:", user?._id);
    if (user) {
      setFormInputs({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        role: user.role || "",
      });
    }
  }, [user]);
  const [formInputs, setFormInputs] = useState({
    email: "",
    first_name: "",
    last_name: "",
    mobile: "",
    role: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { email, first_name, last_name, mobile, role } = formInputs;
  const loading = useSelector<AppState>((state) => state.users.loading);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (email && first_name && last_name && mobile && role) {
      const user: IUpdateUserRequest = {
        email,
        first_name,
        last_name,
        mobile,
        role,
      };
      dispatch(updateAdmin(id as string, user, navigate));
    }
  };

  return (
    <Fragment>
      <h1 className="h3 mb-4 text-gray-800">Cập Nhật admin</h1>
      <div className="card">
        <div className="card-header">Thông tin Admin</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className={`form-control ${
                  formSubmitted && (!email || !validateEmail(email))
                    ? "is-invalid"
                    : ""
                }`}
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={handleChange}
              />
              {formSubmitted && !email && (
                <div className="invalid-feedback">Email is required</div>
              )}
              {formSubmitted && !validateEmail(email) && (
                <div className="invalid-feedback">Email is not valid</div>
              )}
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className={`form-control ${
                  formSubmitted && !first_name ? "is-invalid" : ""
                }`}
                name="first_name"
                value={first_name}
                onChange={handleChange}
              />
              {formSubmitted && !first_name && (
                <div className="invalid-feedback">First name is required</div>
              )}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className={`form-control ${
                  formSubmitted && !last_name ? "is-invalid" : ""
                }`}
                name="last_name"
                value={last_name}
                onChange={handleChange}
              />
              {formSubmitted && !last_name && (
                <div className="invalid-feedback">Last name is required</div>
              )}
            </div>

            <div className="form-group">
              <label>Mobile</label>
              <input
                type="tel"
                className={`form-control ${
                  formSubmitted && !mobile ? "is-invalid" : ""
                }`}
                name="mobile"
                value={mobile}
                onChange={handleChange}
              />
              {formSubmitted && !mobile && (
                <div className="invalid-feedback">Mobile is required</div>
              )}
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                className={`form-control ${
                  formSubmitted && !role ? "is-invalid" : ""
                }`}
                name="role"
                value={role}
                onChange={handleChange}
              >
                <option value="">Chọn vai trò</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {formSubmitted && !role && (
                <div className="invalid-feedback">Role is required</div>
              )}
            </div>

            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1"></span>{" "}
                    Đang lưu...
                  </>
                ) : (
                  "Lưu"
                )}
              </button>
              <Link className="btn btn-danger" to={UrlConstants.ADMIN_LIST}>
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
