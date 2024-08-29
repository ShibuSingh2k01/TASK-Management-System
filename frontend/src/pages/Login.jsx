import React from "react";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../redux/auth/authSlice.js";

import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner.jsx";

const Login = () => {
  //   FormData
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //   Destrcture for access In Form
  const { email, password } = formData;

  // ReduxState
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userToken, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || userToken) {
      navigate("/");
    }

    dispatch(reset());
  }, [userToken, isError, isSuccess, message]);

  //   FormFunctions
  const onChange = (e) => {
    setFormData((currState) => ({
      ...currState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="self-center rounded-lg bg-primary p-6 text-button-text shadow-lg">
        <h1 className="mb-4 flex items-center justify-center space-x-2 text-3xl font-bold">
          <FaUser className="text-accent" />
          <span>Login</span>
        </h1>
        <p className="text-secondary">Please Login To Your Account</p>
      </section>

      <section className="mt-6 flex w-96 self-center rounded-lg bg-secondary p-6 shadow-lg">
        <form onSubmit={onSubmit} className="flex flex-1 flex-col space-y-4">
          <input
            type="email"
            className="w-full rounded-lg border border-gray-500 bg-background p-3 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            name="email"
            value={email}
            placeholder="Please enter your Email"
            onChange={onChange}
          />
          <input
            type="password"
            className="w-full rounded-lg border border-gray-500 bg-background p-3 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            name="password"
            value={password}
            placeholder="Please enter your Password"
            onChange={onChange}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-accent p-3 text-button-text transition duration-200 hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
