import React, { useEffect, useState } from "react";

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

import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";


// actions
import { loginUser, socialLogin } from "../../store/actions";
import { gql, useMutation } from "@apollo/client";

// import images
import logo from "../../assets/images/arabDealLogo.svg";
import logoSvg from "../../assets/images/brands/Logo.svg";


//Import config
import config from "../../config";
import CarouselPage from "../AuthenticationInner/CarouselPage";
import { createSelector } from "reselect";
import { Slide, ToastContainer, toast } from "react-toastify";


interface LoginProps {
  history: object;
}

const Login = (props: any) => {
  const dispatch = useDispatch();


  const [token, setToken] = useState(localStorage.getItem("agent_token") || "");

  // useEffect(() => {
  //   // Check if the user is authenticated and if the token is stored
  //   const token = localStorage.getItem("agent_token");
  //   if (!token) {
  //       navigate("/login"); 
  //      // Redirect to login if no token found
  //   } else {
  //     navigate("/dashboard");  // Redirect to dashboard if token exists
  //   }
  // }, []);

  const errorData = createSelector(

    (state: any) => state.login,
    (state) => ({
      error: state.error,
    })
  );
  // Inside your component
  const { error } = useSelector(errorData);
  const navigate = useNavigate();


  const LOGIN_MUTATION = gql`
      mutation LoginDeliveryAgent($input: LoginDeliveryAgentInput) {
        loginDeliveryAgent(input: $input) {
          status
          fullName
          token
          msg
        }
      }
`;

const [loginAgent] = useMutation(LOGIN_MUTATION);


  document.title = "Login | Arabdeals-Agent & Dashboard ";

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {

      console.log(values)
      try {
        const response = await loginAgent({
          variables: {
            input: {
              userInput: values.email,
              password: values.password,
            },
          },
        });

        console.log("LOGIN response = ",response)

        if (response.data.loginDeliveryAgent.status === "login") {
          const newToken = response.data.loginDeliveryAgent.token;
          console.log("Token received:", newToken); // Log the token
          localStorage.setItem("agent_token", newToken);
          setToken(newToken); // Update token state
          toast("Successfully logged in", {
            position: "top-right",
            hideProgressBar: true,
            className: "bg-success text-white",
            transition: Slide,
            autoClose:2000,
            closeOnClick:true
          });
          navigate("/dashboard")
          
        } else {
          return toast(response.data.loginDeliveryAgent.msg, {
            position: "top-right",
            hideProgressBar: true,
            className: "bg-danger text-white",
            transition: Slide,
            autoClose:2000,
            closeOnClick:true
          });
        }
      } catch (error:any) {
        console.log(error);
        return toast(error.message, {
          position: "top-right",
          hideProgressBar: true,
          className: "bg-danger text-white",
          transition: Slide,
          autoClose:2000,
          closeOnClick:true
        });
      }
    },
  });

  const signIn = (type: any) => {
    dispatch(socialLogin(type, props.router.navigate));
  };
  
  const socialResponse = (type: any) => {
    signIn(type);
  };


  const [passwordShow, setPasswordShow] = useState(false);
  
  // console.log(token)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);



  return (
    <React.Fragment> 
      
      <div className="auth-page overflow-x-hidden">
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4} md={5} className="col-xxl-3">
              <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="auth-content auth-logo-section">
                      <div className="mob-logo-auth">
                        <img src={logoSvg} alt="logo" height="28"  style={{marginBottom:"30px"}} />
                      </div>
                      <div className="intro-show">
                        <h1 style={{color:"#000000",fontSize:"24px",fontWeight:700,lineHeight:"22px"}}>Login</h1>
                        <p style={{color:"#7C7C7C",fontWeight:400,fontSize:"14px",lineHeight:"22px",marginTop:"22px"}}>Enter your email and password to get started!</p>
                      </div>
                      <div className="text-center  logo-show">
                        <img src={logo} alt="" width={"60%"} />
                      </div>
                      <Form
                        
                        className="custom-form auth-form-align  pt-2"
                        style={{
                          // height: "100vh",
                        }}
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
                            placeholder=" Email or contact number"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                                validation.errors.email
                                ? true
                                : false
                            }

                            style={{ borderRadius: "6px ", height: "52px", fontFamily: "Arial", border:" 1px solid #CDCDCD",backgroundColor:"white",outline: "none",boxShadow: "none"}}
                          />
                          {validation.touched.email &&
                            validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <div className="d-flex align-items-start">
                          </div>
                          <div className="auth-pass-inputgroup" style={{position:"relative",width:"100%"}}>
                          <Input
                              name="password"
                              value={validation.values.password || ""}
                              type={passwordShow ? "text" : "password"}
                              placeholder="Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                  validation.errors.password
                                  ? true
                                  : false
                              }
                              style={{ 
                                 borderRadius:"6px",
                                 height: "52px",
                                  fontFamily: "Arial",
                                  backgroundColor:"white" ,
                                   border:" 1px solid #CDCDCD",
                                   paddingRight:"40px",
                                   boxSizing:"border-box",
                                   outline: "none",
                                   boxShadow: "none"
                                  }}
                            />
                          {!validation.errors.password && ( // Only show the eye icon if there is no error
                              <button
                                onClick={() => setPasswordShow(!passwordShow)}
                                className="btn shadow-none ms-0"
                                type="button"
                                id="password-addon"
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  right: "10px",
                                  transform: "translateY(-50%)",
                                  zIndex: 2, // Ensure it's above the input
                                  background: "transparent",
                                  border: "none",
                                  padding: 0,
                                  cursor: "pointer",
                                }}
                              >
                                <i
                                  className={
                                    passwordShow ? "mdi mdi-eye-off-outline" : "mdi mdi-eye-outline"
                                  }
                                  style={{ fontSize: "20px", color: "#000" }}
                                ></i>
                              </button>
                            )}
                            {validation.touched.password &&
                              validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </div>

                          {/* <div
                            className="auth-pass-inputgroup"
                            style={{
                              position: "relative",
                              width: "100%",
                            }}
                          >
                            <Input
                              name="password"
                              type={passwordShow ? "text" : "password"}
                              placeholder="Enter Password"
                              onFocus={(e) => e.target.classList.add("focused")}
                              onBlur={(e) => e.target.classList.remove("focused")}
                              style={{
                                borderRadius: "6px",
                                height: "52px",
                                fontFamily: "Arial",
                                backgroundColor: "white",
                                border: "1px solid #CDCDCD",
                                paddingRight: "40px",
                                boxSizing: "border-box",
                                outline: "none",
                                boxShadow: "none",
                              }}
                            />
                            <button
                              onClick={() => setPasswordShow(!passwordShow)}
                              type="button"
                              style={{
                                position: "absolute",
                                top: "50%",
                                right: "10px",
                                transform: "translateY(-50%)",
                                zIndex: 2, // Ensure it's above the input
                                background: "transparent",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                              }}
                            >
                              <i
                                className={passwordShow ? "mdi mdi-eye-off-outline" : "mdi mdi-eye-outline"}
                                style={{ fontSize: "20px", color: "#000" }}
                              ></i>
                            </button>
                          </div> */}


                        </div>
                        {/* <div className="row mb-4">
                          <div className="col">
                            <div className="auth-button-align d-grid  mt-auto" >
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
                        </div> */}

                        <div
                         className="auth-button-align auth-login-button"
                        //  className=" "
                         style={{
                          // position:"absolute",
                          // bottom:"0",
                          
                         }}

                        >

                            <button
                              className=" "
                              type="submit"
                              style={{
                                display: "block",
                                margin:"auto",
                                backgroundColor: "#131313",
                                width:"100%",
                                color: "#FFFFFF",
                                borderRadius: "8px",
                                fontWeight: 500,
                                fontSize: "16px",
                                lineHeight: "22px",
                                padding: "10px",
                              }}
                            >
                              Login
                            </button>
                          </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <CarouselPage/>
            
           
          </Row>
        </Container>
      </div>
      <ToastContainer/>
    </React.Fragment>
  );
};

export default withRouter(Login);
Login.propTypes = {
  history: PropTypes.object,
};