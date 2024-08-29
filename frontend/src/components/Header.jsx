import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../redux/auth/authSlice.js";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = async () => {
    await dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const { userToken } = useSelector((state) => state.auth);

  return (
    <header className="flex h-14 w-full items-center justify-between bg-primary px-4 shadow-md">
      <div>
        <Link to="/" className="text-lg font-semibold text-button-text">
          GoalSetter
        </Link>
      </div>
      <ul className="flex space-x-4 md:space-x-8">
        {userToken ? (
          <li>
            <button
              className="flex items-center space-x-2 text-button-text hover:text-gray-300"
              onClick={onLogout}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="flex items-center space-x-2 text-button-text hover:text-gray-300"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center space-x-2 text-button-text hover:text-gray-300"
              >
                <FaUser />
                <span>Register</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
