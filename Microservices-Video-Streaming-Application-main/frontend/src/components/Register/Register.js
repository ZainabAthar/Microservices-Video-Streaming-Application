import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function Register(props) {
  const [focusState, setFocusState] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);


  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    setError("");

    try {
      const apiEndpoint = process.env.REACT_APP_AUTH_BACKEND;
      const response = await axios.post(`${apiEndpoint}/users/register`, values);
      toast.success("Account created successful!");
      navigate("/login");
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const loginHandler = (event) => {
    event.preventDefault();
    navigate("/login");
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit,
  });



  const handleInputFocus = (field) => {
    setFocusState((prevFocusState) => ({ ...prevFocusState, [field]: true }));
  };

  const handleInputBlur = (field) => {
    setFocusState((prevFocusState) => ({ ...prevFocusState, [field]: false }));
  };

  return (
    <div
    >
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        {/* Font Awesome */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          rel="stylesheet"
        />
        {/* MDB */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/7.1.0/mdb.min.css"
          rel="stylesheet"
        />
        <style
          //   dangerouslySetInnerHTML={{
          //     __html:
          //       "\n      body,\n      html {\n        height: 100%;\n        margin: 0;\n      }\n\n      .container {\n        min-height: 100vh;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .cascading-right {\n        margin-right: -50px;\n      }\n\n      @media (max-width: 991.98px) {\n        .cascading-right {\n          margin-right: 0;\n        }\n      }\n    ",
          //   }
          // }
          dangerouslySetInnerHTML={{
            __html: `
          body, html {
            height: 100%;
            margin: 0;
            background:black;
          }
    
          .container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
    
          .cascading-right {
            margin-right: -50px;
          }
    
          @media (max-width: 991.98px) {
            .cascading-right {
              margin-right: 0;
            }
          }

          .form-outline input:focus {
            border-bottom: 2px solid #007bff;
            box-shadow: none;
          }
    
          .form-outline input:not(:focus) {
            border-bottom: 1px solid #ced4da;
          }
        `,
          }}
        />
        {/* Section: Design Block */}
        <section className="text-center text-lg-start">
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n        .cascading-right {\n          margin-right: -50px;\n        }\n\n        @media (max-width: 991.98px) {\n          .cascading-right {\n            margin-right: 0;\n          }\n        }\n      ",
            }}
          />
          {/* Jumbotron */}
          <div className="container">
            <div className="row g-0 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div
                  className="card cascading-right"
                  style={{
                    background: "hsla(0, 0%, 100%, 0.55)",
                    backdropFilter: "blur(30px)",
                  }}
                >
                  <div className="card-body p-5 shadow-5 text-center">
                    <h2 className="fw-bold mb-5">Sign up now</h2>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="row">
                        <div className="mb-4 col-8">
                          <div className="form-outline">
                            <input
                              name="username"
                              value={formik.values.username}
                              onChange={formik.handleChange}
                              onBlur={() => handleInputBlur("username")}
                              onFocus={() => handleInputFocus("username")}
                              type="username"
                              id="form3Example1"
                              className="form-control"
                              style={{
                                width: '20rem'
                              }}
                            />

                            {(!formik.values.username ||
                              focusState.username) && (
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1"
                                >
                                  User name
                                </label>
                              )}

                            {/* <label className="form-label" htmlFor="form3Example1">
                            User name
                          </label> */}
                          </div>
                        </div>
                      </div>
                      {/* Email input */}
                      <div className="form-outline mb-4 col-8">
                        <input
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={() => handleInputBlur("email")}
                          onFocus={() => handleInputFocus("email")}
                          type="email"
                          id="form3Example3"
                          className="form-control"
                          style={{
                            width: '20rem'
                          }}
                        />

                        {(!formik.values.email || focusState.email) && (
                          <label className="form-label" htmlFor="form3Example3">
                            Email address
                          </label>
                        )}

                        {/* <label className="form-label" htmlFor="form3Example3">
                        Email address
                      </label> */}
                      </div>

                      {/* Password input */}
                      <div className="form-outline mb-4 row">
                        <span className="col-8">
                          <input
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={() => handleInputBlur("password")}
                            onFocus={() => handleInputFocus("password")}
                            type={showPassword ? "text" : "password"}
                            id="form3Example4"
                            className="form-control"
                            style={{
                              width: '20rem'
                            }}
                          />
                          {(!formik.values.password || focusState.password) && (
                            <label className="form-label mx-3 d-flex justify-content-between" htmlFor="form3Example4">
                              Password
                            </label>
                          )}

                          <span className="eye-icon-container form-outline col-2"
                            style={{
                              position: 'relative',
                              top: '-2rem',
                              left: '10rem'
                            }}>
                            <FontAwesomeIcon
                              icon={showPassword ? faEye : faEyeSlash}
                              className="eye-icon"
                              onClick={togglePasswordVisibility}
                            />
                          </span>

                        </span>
                        {/* <span className="eye-icon-container form-outline col-2" >
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                          className="eye-icon"
                          onClick={togglePasswordVisibility}
                        />
                        </span> */}
                        <div>
                          {formik.touched.username && formik.errors.username}
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-4">
                        <label
                          className="form-check-label"
                          htmlFor="form2Example33"
                        >
                          Create your account now!
                        </label>
                      </div>
                      {/* Submit button */}
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting ? "Registering..." : "Register"}
                      </button>
                      {/* Register buttons */}
                      <div className="text-center">
                        <p>
                          Already have an account?{" "}
                          <span
                            style={{
                              color: "#007bff",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                            onClick={loginHandler}
                          >
                            Click here
                          </span>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-5 mb-lg-0">
                <img
                  src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                  className="w-100 rounded-4 shadow-4"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

   
  );
}

export default Register;
