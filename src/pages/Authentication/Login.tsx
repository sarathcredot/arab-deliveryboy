import React, { useState } from "react";

import {
  Row,
  Col,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
  Alert,
} from "reactstrap";

import PropTypes from "prop-types";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";


// actions
import { loginUser, socialLogin } from "../../store/actions";

// import images
import logo from "../../assets/images/arabDealLogo.svg";

//Import config
import config from "../../config";
import CarouselPage from "../AuthenticationInner/CarouselPage";
import { createSelector } from "reselect";

interface LoginProps {
  history: object;
}

const Login = (props: any) => {
  const dispatch = useDispatch();

  const errorData = createSelector(

    (state: any) => state.login,
    (state) => ({
      error: state.error,
    })
  );
  // Inside your component
  const { error } = useSelector(errorData);


  document.title = "Login | Arabdeals-Agent & Dashboard ";

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "admin@themesbrand.com",
      password: "123456",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    },
  });

  const signIn = (type: any) => {
    dispatch(socialLogin(type, props.router.navigate));
  };
  
  const socialResponse = (type: any) => {
    signIn(type);
  };


  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <React.Fragment>
      <div className="auth-page">
        <Container fluid className="p-0">
          <Row className="g-0">


            <Col lg={4} md={5} className="col-xxl-3">
              <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    {/* <div className="mb-4 mb-md-5 text-center">
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img src={logo} alt="" height="28" />{" "}
                        <span className="logo-txt">Minia</span>
                      </Link>
                    </div> */}
                    <div className="auth-content auth-logo-section">
                      <div className="intro-show">
                        <h1 style={{color:"#000000",fontSize:"24px",fontWeight:700,lineHeight:"22px"}}>Login</h1>
                        <p style={{color:"#7C7C7C",fontWeight:400,fontSize:"14px",lineHeight:"22px",marginTop:"22px"}}>Enter your email and password to get started!</p>
                      </div>
                      <div className="text-center  logo-show">
                        {/* <h5 className="mb-0">Welcome Back !</h5>
                        <p className="text-muted mt-2">
                          Sign in to continue to Minia.
                        </p> */}

                        <img src={logo} alt="" width={"60%"} />
                        {/* <p
                          className="text-muted mt-5"
                          style={{
                            color: "#00000",
                            textAlign: "center",
                            fontSize: "25px",
                            fontWeight: "300",
                            lineHeight: "normal",
                            letterSpacing: "0.5px",
                            fontFamily: "Arial",
                          }}
                        >
                          Welcome Back!
                        </p> */}
                      </div>
                      <Form
                        
                        className="custom-form auth-form-align  pt-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        {/* {error ? <Alert color="danger">{error}</Alert> : null} */}
                        <div className="mb-3">
                          {/* <Label className="form-label">Email</Label> */}
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                                validation.errors.email
                                ? true
                                : false
                            }

                            style={{ borderRadius: "6px ", height: "52px", fontFamily: "Arial", border:" 1px solid #CDCDCD",backgroundColor:"white"}}
                          />
                          {validation.touched.email &&
                            validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          {/* <Label className="form-label">Password</Label> */}
                          <div className="d-flex align-items-start">
                            {/* <div className="flex-grow-1">
                              <Label className="form-label">Password</Label>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="">
                                <Link to="/page-recoverpw" className="text-muted">Forgot password?</Link>
                              </div>
                            </div> */}
                          </div>
                          <div className="input-group auth-pass-inputgroup" style={{position:"relative",width:"100%"}}>
                          <Input
                              name="password"
                              value={validation.values.password || ""}
                              type={passwordShow ? "text" : "password"}
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                  validation.errors.password
                                  ? true
                                  : false
                              }
                              style={{  borderRadius:"6px", height: "52px", fontFamily: "Arial",backgroundColor:"white" , border:" 1px solid #CDCDCD",paddingRight:"40px",boxSizing:"border-box"}}
                            />
                            <button onClick={() => setPasswordShow(!passwordShow)} className="btn  shadow-none ms-0" type="button" id="password-addon" style={{position:"absolute",top: "50%", right: "10px", transform: "translateY(-50%)",}}><i className="mdi mdi-eye-outline"></i></button>
                            {validation.touched.password &&
                              validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </div>
                          
                        </div>

                        <div className="row mb-4">
                          <div className="col">


                            {/* <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="remember-check"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="remember-check"
                              >
                                Remember me
                              </label>
                            </div> */}

                            <div className="auth-button-align d-grid">
                              <button
                                className="btn btn-block"
                                type="submit"
                                style={{backgroundColor:"#131313",color:"#FFFFFF",borderRadius:"8px",fontWeight:500,fontSize:"16px",lineHeight:"22px",padding:"10px"}}
                              // onClick={() => logIn()}
                              >
                                Login
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>

                      {/* <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <FacebookLogin
                              appId={config.facebook.APP_ID}
                              autoLoad={false}
                              callback={facebookResponse}
                              render={(renderProps: any) => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-facebook" />
                                </Link>
                              )}
                            />
                            <Link
                              to="#"
                              className="social-list-item bg-primary text-white border-primary"
                              onClick={e => {
                                e.preventDefault();
                                socialResponse("facebook");
                              }}
                            >
                              <i className="mdi mdi-facebook" />
                            </Link>
                          </li> */}
                          {/* <li className="list-inline-item">*/}
                          {/*  <TwitterLogin*/}
                          {/*    loginUrl={*/}
                          {/*      "http://localhost:4000/api/v1/auth/twitter"*/}
                          {/*    }*/}
                          {/*    onSuccess={this.twitterResponse}*/}
                          {/*    onFailure={this.onFailure}*/}
                          {/*    requestTokenUrl={*/}
                          {/*      "http://localhost:4000/api/v1/auth/twitter/revers"*/}
                          {/*    }*/}
                          {/*    showIcon={false}*/}
                          {/*    tag={"div"}*/}
                          {/*  >*/}
                          {/*    <a*/}
                          {/*      href=""*/}
                          {/*      className="social-list-item bg-info text-white border-info"*/}
                          {/*    >*/}
                          {/*      <i className="mdi mdi-twitter"/>*/}
                          {/*    </a>*/}
                          {/*  </TwitterLogin>*/}
                          {/*</li> */}
                          {/* <li className="list-inline-item"> */}
                            {/* <GoogleLogin
                              clientId="CLIENT_ID" // u can add your Client ID
                              render={(renderProps) => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-google" />
                                </Link>
                              )}
                              // onSuccess={googleResponse}
                              onFailure={() => { }}
                            /> */}

                            {/* <Link
                              to="#"
                              className="social-list-item bg-danger text-white border-danger"
                              onClick={e => {
                                e.preventDefault();
                                socialResponse("google");
                              }}
                            >
                              <i className="mdi mdi-google" />
                            </Link>
                          </li>
                        </ul>
                      </div> */}

                      {/* <div className="mt-5 text-center">
                        <p className="text-muted mb-0">
                          Don't have an account ?{" "}
                          <Link
                            to="/register"
                            className="text-primary fw-semibold"
                          >
                            {" "}
                            Signup now{" "}
                          </Link>{" "}
                        </p>
                      </div> */}
                    </div>






                    <div className="mt-4 mt-md-5 text-center">
                      {/* <p className="mb-0">
                        © {new Date().getFullYear()} Minia . Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by
                        Themesbrand
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </Col>



            <CarouselPage/>
            
           
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
Login.propTypes = {
  history: PropTypes.object,
};