import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux'
import { userAuthorLoginThunk } from '../redux/slices/userAuthorSlice';

function Signin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let {isPending,currentUser,loginUserStatus,errorOccured,errMsg} = useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  let dispatch = useDispatch();
  let navigate = useNavigate()

  function onSignInFormSubmit(userObj){
    // Add your form submission logic here
    console.log(userObj);
    dispatch(userAuthorLoginThunk(userObj))

  };

  useEffect(() => {
    console.log(loginUserStatus)
    console.log(currentUser)
    if (loginUserStatus) {
      if (currentUser.userType === "user") {
        navigate("/user-profile");
      }
      if (currentUser.userType === "author") {
        navigate("/author-profile");
      }
    }
  }, [loginUserStatus,currentUser]);

  return (
    <div className="text-center">
      <h1 className="display-6 text-black pt-5">Sign In</h1>
      <div className="form">
        <div className="mb-4">
                <label htmlFor="user" className="form-check-label me-3" style={{fontSize:'1.2rem',color:"var(--light-dark-grey)"}}>
                      Login as
                    </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="author"
                      value='author'
                      {...register("userType")}
                    />
                    <label htmlFor="author" className="form-check-label">
                      Author
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value='user'
                      {...register("userType")}
                    />
                    <label htmlFor="user" className="form-check-label">
                      User
                    </label>
                  </div>
        </div>
        <div>
          <input
            placeholder='Enter Your User Name'
            style={{ width:'300px'}}
            type="text"
            {...register("username", { required: true, minLength: 4 })}
            className={`form-control mx-auto mb-4 mt-5 ${errors.username ? 'is-invalid' : ''}`}
          />
          {errors.username?.type === "required" && (
            <p className="text-danger">User Name is required</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="text-danger">Min Length should be 4</p>
          )}
        </div>

        <div>
          <input
          placeholder='Enter Password'
            style={{ width: '300px' }}
            type="password"
            {...register('password', { required: true, minLength: 4 })}
            className={`form-control mx-auto mb-4 ${errors.password ? 'is-invalid' : ''}`}
          />
          {errors.password?.type === 'required' && (
            <p className="text-danger">Password is required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-danger">Password should be at least 4 characters long</p>
          )}
        </div>

        <button
          className="btn btn-success mt-3"
          onClick={handleSubmit(onSignInFormSubmit)}
        >
          Sign In
        </button>

        <h5 className='p-3'>
          New User?{" "}
          <Link to='/SignUp'>Sign Up</Link>{" "}
          here
        </h5>
      </div>
      
    </div>
  );
}

export default Signin;
