import React from "react";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../redux/auth/authSlice.js";

import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner.jsx";

const Register = () => {
  //   FormData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  //   Destrcture for access In Form
  const { name, email, password, confirmPass } = formData;

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

    if (password !== confirmPass) {
      toast.error("Passwords don't match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="bg-primary text-button-text self-center rounded-lg p-6 shadow-lg">
        <h1 className="mb-4 flex items-center justify-center space-x-2 text-3xl font-bold">
          <FaUser className="text-accent" />
          <span>Register</span>
        </h1>
        <p className="text-secondary">Please Create An Account</p>
      </section>

      <section className="bg-secondary mt-6 flex w-96 self-center rounded-lg p-6 shadow-lg">
        <form onSubmit={onSubmit} className="flex flex-1 flex-col space-y-4">
          <input
            type="text"
            className="bg-background text-text focus:ring-accent w-full rounded-lg border border-gray-500 p-3 focus:outline-none focus:ring-2"
            name="name"
            value={name}
            placeholder="Please enter your Name"
            onChange={onChange}
          />
          <input
            type="email"
            className="bg-background text-text focus:ring-accent w-full rounded-lg border border-gray-500 p-3 focus:outline-none focus:ring-2"
            name="email"
            value={email}
            placeholder="Please enter your Email"
            onChange={onChange}
          />
          <input
            type="password"
            className="bg-background text-text focus:ring-accent w-full rounded-lg border border-gray-500 p-3 focus:outline-none focus:ring-2"
            name="password"
            value={password}
            placeholder="Please enter your Password"
            onChange={onChange}
          />
          <input
            type="password"
            className="bg-background text-text focus:ring-accent w-full rounded-lg border border-gray-500 p-3 focus:outline-none focus:ring-2"
            name="confirmPass"
            value={confirmPass}
            placeholder="Please confirm your Password"
            onChange={onChange}
          />
          <button
            type="submit"
            className="bg-accent text-button-text w-full rounded-lg p-3 transition duration-200 hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default Register;
