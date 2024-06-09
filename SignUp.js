import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [err, setErr] = useState("");
  const [state, setState] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  async function onSignUpFormSubmit(userObj) {
    try {
      const res = await axios.post(`http://localhost:4000/${userObj.userType}-api/user`, userObj);
      if (res.status === 201) {
        setState(true);
        setSignupSuccess(true);
        setErr("");
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      setErr("An error occurred during signup.");
    }
  }

  return (
    <div className="text-center">
      <h1 className="display-6 text-black pt-5">Sign Up</h1>
      <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
        <div className="form">
          {err.length !== 0 && <p className="text-danger fs-3">{err}</p>}
          <div className="mb-4">
            <label htmlFor="user" className="form-check-label me-3" style={{ fontSize: '1.2rem', color: "var(--light-dark-grey)" }}>
              Register as
            </label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="author"
                value="author"
                {...register("userType", { required: true })}
              />
              <label htmlFor="author" className="form-check-label" style={{ color: "var(--crimson)" }}>
                Author
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="user"
                value="user"
                {...register("userType", { required: true })}
              />
              <label htmlFor="user" className="form-check-label" style={{ color: "var(--crimson)" }}>
                User
              </label>
            </div>
          </div>
          {errors.userType && <p className="text-danger">User type is required</p>}
          <input
            style={{ width: '300px' }}
            type="text"
            {...register("username", { required: true, minLength: 4 })}
            className={`form-control mx-auto mt-5 p-2 ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Username"
          />
          {errors.username?.type === "required" && (
            <p className="text-danger">Username is required</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="text-danger">Min Length should be 4</p>
          )}
          <input
            style={{ width: '300px' }}
            type="password"
            {...register("password", { required: true, minLength: 8 })}
            className={`form-control mx-auto mt-4 p-2 ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-danger">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-danger">Password should be at least 8 characters long</p>
          )}
          <input
            style={{ width: '300px' }}
            type="text"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className={`form-control mx-auto mt-4 p-2 ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-danger">Email is required</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-danger">Invalid email format</p>
          )}
        </div>
        <button className="btn btn-success mt-4" type="submit">
          Sign Up
        </button>
        <h5 className="p-4">
          Already have an account? <Link to="/SignIn">Sign In</Link> here
        </h5>
      </form>
    </div>
  );
}

export default Signup;
