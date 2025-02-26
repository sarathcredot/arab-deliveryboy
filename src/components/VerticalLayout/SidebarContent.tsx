import PropTypes from "prop-types";
import React, { useEffect, useRef, useCallback, useState } from "react";
// import settleImg from "./Vector.svg";
import settleImg from "./bargain_183054191.svg";
import "./style.css";
//Import Icons
import FeatherIcon from "feather-icons-react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

//Import images

//i18n
import { withTranslation } from "react-i18next";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link, useLocation } from "react-router-dom";

import withRouter from "../../../src/components/Common/withRouter";
import LogoutPopup from "../LogoutPopup";

const SidebarContent = (props: any) => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!isOpen);
  };

  const ref: any = useRef(null);
  const activateParentDropdown = useCallback((item: any) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items: any) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1] ? parent.childNodes[1] : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul: any = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item: any) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  const handleClick = () => {
    if (window.innerWidth < 992) {
      props.setClick(false);
      document.body.classList.remove("sidebar-enable");
    }
  };

  return (
    <React.Fragment>
      <SimpleBar
        style={{ minHeight: "100%", background: "black" }}
        ref={ref}
      >
        <div
          id="sidebar-menu"
          style={{
            height: "100%",
          }}
        >
          <ul
            className="metismenu list-unstyled"
            id="side-menu"
            style={{
              width: "90%",
              margin: "auto",
              paddingTop: "30px",
            }}
          >
            <li>
              <Link
                className="link"
                to="/dashboard"
                onClick={() => handleClick()}
              >
                <div className="icon_round">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path d="M2.6087 13.6957V5.86958L7.82609 1.95654L13.0435 5.86958V13.6957H9.13044V9.13045H6.52174V13.6957H2.6087Z" />
                  </svg>
                </div>
                <span style={{ color: "#fff" }}>{props.t("Dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link
                className="link"
                to="/orders"
                onClick={() => handleClick()}
              >
                <div className="icon_round">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.91666 12.8333C2.59582 12.8333 2.32117 12.7191 2.0927 12.4906C1.86423 12.2621 1.74999 11.9875 1.74999 11.6666V5.08954C1.57499 4.9826 1.43402 4.84406 1.32707 4.67392C1.22013 4.50378 1.16666 4.3069 1.16666 4.08329V2.33329C1.16666 2.01246 1.28089 1.73781 1.50936 1.50933C1.73784 1.28086 2.01249 1.16663 2.33332 1.16663H11.6667C11.9875 1.16663 12.2621 1.28086 12.4906 1.50933C12.7191 1.73781 12.8333 2.01246 12.8333 2.33329V4.08329C12.8333 4.3069 12.7799 4.50378 12.6729 4.67392C12.566 4.84406 12.425 4.9826 12.25 5.08954V11.6666C12.25 11.9875 12.1358 12.2621 11.9073 12.4906C11.6788 12.7191 11.4042 12.8333 11.0833 12.8333H2.91666ZM2.33332 4.08329H11.6667V2.33329H2.33332V4.08329ZM5.24999 8.16663H8.74999V6.99996H5.24999V8.16663Z"
                      // fill="white"
                    />
                  </svg>
                </div>
                <span style={{ color: "#fff" }}>{props.t("Orders")}</span>
              </Link>
            </li>
            <li>
              <Link
                className="link"
                to="/returns"
                onClick={() => handleClick()}
              >
                <div className="icon_round">
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100.09 103.15"
                  >
                    <path
                      className="cls-1"
                      d="M9.41,0c.44.48,1,1.48,1,2.11v9.75C17.5,6.05,25.96,1.94,35.08.46,36.07.3,37.19.32,38.13,0h10.04l9.44,1.91c17.87,5.19,32.15,20.98,35.7,39.27.36,1.86.42,3.83.86,5.68-.16,3.02.22,6.26,0,9.25-2.42,33.53-37.78,55.32-69.21,44.04-4.97-1.78-13.79-6.53-17.28-10.45-1.74-1.96.09-4.65,2.47-3.68.53.22,1.8,1.61,2.37,2.05,22.48,17.53,54.51,13.03,69.88-11.27C103.56,43.36,76.64-.36,37.26,4.65c-7.07.9-17.22,4.56-22.52,9.43-.25.23-.57.4-.51.8h9.74c.19,0,.96.69,1.08.93.61,1.17.23,2.83-1.12,3.25l-16.24.05c-.96-.12-1.62-.98-1.7-1.91.36-4.92-.46-10.46,0-15.3C6.06,1.1,6.35.49,7,0h2.41Z"
                    />
                    <path
                      className="cls-1"
                      d="M40.34,89.89L8,71.09v-36.6c0-.12.41-.43.62-.22l31.73,18.52v37.1Z"
                    />
                    <polygon
                      className="cls-1"
                      points="76.9 34.19 76.9 71.29 44.76 89.89 44.76 52.79 57.62 45.25 57.62 57.72 61.84 51.57 66.25 52.89 66.25 40.32 76.9 34.19"
                    />
                    <polygon
                      className="cls-1"
                      points="56.01 40.83 55.82 41.33 42.49 49.04 10.41 30.27 23.48 22.63 24.12 22.55 56.01 40.83"
                    />
                    <polygon
                      className="cls-1"
                      points="74.69 30.56 64.03 36.51 32.44 18.27 31.9 17.7 42.75 11.75 74.69 30.56"
                    />
                  </svg>
                </div>
                <span style={{ color: "#fff" }}>{props.t("Returns")}</span>
              </Link>
            </li>
            <li>
              <Link
                className="link"
                to="/warranty-pickups"
                onClick={() => handleClick()}
              >
                <div className="icon_round warranty">
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 507.72 507.72"
                  >
                    <path d="M229.02,99.63c12.52-1.1,25.13.32,36.67,5.31,30.38,13.15,60.53,35.63,90.71,50.05,4.93,3.27,14.48,11.06,15.33,17.06,1.59,11.31-4.27,15.08-12.61,20.29-37.83,23.67-78.71,44.36-117.02,67.34-4.44,1.4-7.84,1.09-12.13-.7l-121.66-70.79c-12.1-11.34-5.26-22.15,5.68-30.46,30.21-16.03,60.94-37.01,91.69-51.56,7.16-3.39,15.43-5.86,23.34-6.55Z" />
                    <path d="M98.18,206.71c3.63-.62,7.4-.14,10.68,1.48l112.38,65.13c4.84,3.34,6.77,8.84,7.3,14.5-2.04,33.79,2.64,70.62,0,104.05-.81,10.28-8.06,18.06-18.87,16.33-5.91-.94-28.98-13.98-35.98-17.59-17.27-8.91-37.66-18.76-53.97-28.87-48.79-30.22-30.27-92.16-33.86-139.95.18-6.79,5.46-13.92,12.32-15.09Z" />
                    <path d="M387.97,278.19l-10.78-6.97c-9.68-4.64-17.78-4.37-27.34.3-4.23,2.06-8.3,6.66-11.88,8.05-4.11,1.6-9.83,1.36-14.49,2.95-10.48,3.59-17.6,11.49-20.03,22.32-.8,3.57-.54,7.38-1.76,10.7-1.12,3.03-4.38,5.88-6.16,8.79-7.12,11.62-7.61,21.71-.62,33.53,1.96,3.33,5.55,6.53,6.79,10.03,1.18,3.33,1.08,7.15,1.86,10.59.37,1.63,3,8.02,2.56,8.7l-38.12,19.84c-10.26,4.29-21.22-2.13-22.06-13.28-2.64-35.15,2.05-73.55,0-109.04.12-3.29,1.9-6.14,3.78-8.68,38.25-24.24,78.21-46.1,117.53-68.69,7.31-4.04,20.72,4.13,20.72,12v58.86Z" />
                    <path d="M405.2,383.23c-5.1,5.09-15.59,3.88-22.2,6.76-6.8,2.95-11.31,10.54-19.63,10.32-8.39-.22-12.94-8.21-19.82-10.75-5.64-2.09-11.2-1.07-16.84-3.71-10.41-4.86-7.36-14.67-10.69-23.57-3.88-10.36-15.27-14.53-8.63-27.95,2.38-4.82,6.64-7.71,8.63-13.17,2.07-5.69,1.19-11.62,3.95-17.23,4.89-9.95,16.72-6.77,25.02-10.48,6.4-2.86,10.23-10.11,18.38-10.33,8.63-.23,13.2,8,20.44,10.76,10,3.8,20.72-.46,24.89,13.1,1.56,5.07,1.1,10.33,3.25,15.44,2.27,5.4,7.62,9.14,9.68,15.23,3.71,10.97-6.35,15.34-9.68,23.38-2.76,6.66-1.3,16.77-6.75,22.21ZM346.46,352.71c1.57,1.64,6.92,7.22,8.28,8.23,5.3,3.93,8.97-1.36,12.38-4.88,7.63-7.9,14.21-16.93,22.1-24.61.47-.71,1.07-1.84,1.15-2.66.18-1.82-6.35-8.87-8.86-6.31l-22.52,26.09c-1.49.37-9.5-9.96-11.51-10.89-2.93-1.36-8.5,4.12-8.11,6.81.12.79,5.99,7.07,7.09,8.23Z" />
                  </svg>
                </div>
                <span style={{ color: "#fff" }}>{props.t("Warranty Pickups")}</span>
              </Link>
            </li>
            <li>
              <Link
                className="link"
                to="/settlements"
                onClick={() => handleClick()}
              >
                <div className="icon_round">
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100.09 103.15"
                  >
                    <path
                      className="cls-1"
                      d="M37.22,21.11s-.44.64-.52.72c-2.6,2.81-4.73,3.62-5.86,7.55-.04.13-.27.11-.3.22-.2.85.09,2.76.38,3.62,1.51,4.47,7.04,6.36,10.99,3.71.59-.39,1.69-1.9,2.23-2l8.97.15,27.03,26.68c.9.25,3.79-.25,4.4.19.17.12.61,1.14.65,1.37.66,3.56-2.99,6.26-6.21,4.69l-12.94-12.73c-1.42-1.01-2.8.72-1.58,1.97l14.55,14.41c-1.09,2.74-4.07,3.48-6.54,1.94l-12.15-12.2c-1.31-.8-2.58.8-1.77,1.92.08.11.32.15.43.27,3.42,3.83,7.59,7.25,11.03,11.03.14.15.77.84.78.94-.24.96-1.25,1.98-2.18,2.33-1.89.71-3.29.25-4.74-1.01-2.8-2.42-5.42-6.04-8.21-8.34-.53-.44-.93-.64-1.61-.4-.95.34-.69.97-.62,1.86l9.28,9.16c.09.54-.69,1.5-1.1,1.82-1.8,1.41-3.99,1.22-5.74-.13l-5.57-5.62c2.1-3.26,1.44-7.62-1.72-9.92-.03-.25,3.04-3.01,3.48-3.66,3.01-4.42.82-10.48-4.54-11.36-.55-2.03-1.56-3.94-3.42-5.05-2.7-1.62-5.82-1.5-8.3.43-.66.51-3.05,3.2-3.47,3.26-.46-.24-.72-.79-1.17-1.17-2.64-2.23-6.79-2.24-9.47-.02-1.61,1.33-7.67,7.35-8.44,8.96-.19.4-.4.93-.41,1.38-.04.05-.31-.2-.31-.23v-26.02h8.31c.09,0,1.51-.63,1.73-.75,1.06-.56,1.78-1.42,2.36-2.46.98-1.74,1.38-4,2.82-5.57,1.03-1.13,2.94-1.93,4.43-1.93h5.05Z"
                    />
                    <path
                      className="cls-1"
                      d="M81.58,58.86l-27.3-26.76-11.38-.11c-1.09.65-1.78,1.89-2.9,2.54-3.88,2.25-7.96-1.91-5.87-5.83.32-.59,5.32-5.67,6.01-6.18,1.26-.93,2.44-1.31,3.99-1.41,6.04-.39,12.7.16,18.77.2,2.21.82,3.89,2.53,5.75,3.89,1.29.95,2.64,1.86,3.93,2.81,1.62,1.18,3.94,3.51,6.05,3.51h11.89v-5.05c0-.18.63-1.77.77-2.02.82-1.46,2.5-2.63,4.2-2.71v47.22c-.41-.04-1.06-.04-1.43-.17-.14-.05-1.31-.82-1.52-.99-.82-.67-2.02-2.55-2.02-3.57v-5.36h-8.93Z"
                    />
                    <path
                      className="cls-1"
                      d="M4.6,21.73c2.69.23,4.64,2.42,4.98,5.04l-.02,37.44c-.3.44-.2.98-.31,1.37-.01.05-.38.6-.48.78-.85,1.49-2.44,2.59-4.17,2.59V21.73Z"
                    />
                    <path
                      className="cls-1"
                      d="M43.2,48.38c.85.86,1.53,2.03,1.03,3.26l-18.26,18.24c-.23.21-.44.3-.76.3-2.05,0-4.16-2.33-3.67-4.38l18.52-18.56c1.29-.25,2.27.26,3.14,1.13Z"
                    />
                    <path
                      className="cls-1"
                      d="M48.97,54.11c.86.7,1.92,2.54,1.14,3.53l-18.55,18.46c-.13.14-.26.14-.43.12-2.02-.23-4.1-2.31-3.65-4.44l18.61-18.59c.75-.38,2.28.42,2.88.91Z"
                    />
                    <path
                      className="cls-1"
                      d="M46.95,67.77c.06.05.72.7.78.77.29.41.78,1.66.84,2.19.07.56-.16,1.57-.39,2.1-.58,1.37-6.05,6.7-7.46,7.92-.58.51-1.62,1.22-2.37,1.36-2.46.46-5.5-1.71-4.87-4.4l10.74-10.7c.83-.3,2.04.24,2.73.75Z"
                    />
                    <path
                      className="cls-1"
                      d="M28.01,49.28s.06.2.17.25c1.61.72,2.8,2.14,2.22,3.98-3.37,3.29-6.65,6.65-10.05,9.91-.68.65-.53.93-1.83.71-2.96-.49-3.89-4.5-2.1-6.85.87-1.15,6.22-6.53,7.34-7.32,1.18-.84,2.87-1.16,4.26-.67Z"
                    />
                  </svg>
                </div>
                <span style={{ color: "#fff" }}>{props.t("Settlements")}</span>
              </Link>
            </li>
            <li>
              <Link
                className="logout_ink"
                to="/"
                onClick={() => {
                  handleClick();
                  setOpen(true);
                }}
              >
                <div className="icon_round">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-power"
                  >
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                    <line
                      x1="12"
                      y1="2"
                      x2="12"
                      y2="12"
                    ></line>
                  </svg>
                </div>
                <span style={{ color: "#fff" }}>{props.t("Logout")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
      <p
        style={{ color: "#fff", fontSize: "9px", position: "absolute", bottom: 10, width: "100%", textAlign: "center" }}
      >
        Arab Deals © 2024. All Rights Reserved
      </p>
      <LogoutPopup
        isOpen={isOpen}
        toggle={toggle}
      />
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withTranslation()(withRouter(SidebarContent));
