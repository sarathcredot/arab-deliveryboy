import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Import Icons
import FeatherIcon from "feather-icons-react";

// Redux Store
import { showRightSidebarAction } from "../../store/actions";

//import component
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import LightDark from "../CommonForBoth/Menus/LightDark";

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";

//import images
import logoSvg from "../../assets/images/brands/Logo.svg";
// import logoSvg from "../../assets/images/logo-sm.svg";
import github from "../../assets/images/brands/github.png";
import bitbucket from "../../assets/images/brands/bitbucket.png";
import dribbble from "../../assets/images/brands/dribbble.png";
import dropbox from "../../assets/images/brands/dropbox.png";
import mail_chimp from "../../assets/images/brands/mail_chimp.png";
import slack from "../../assets/images/brands/slack.png";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Header = (props: any) => {
  const dispatch = useDispatch();

  const nonauthData = createSelector(
    (state: any) => state.Layout,
    (layout) => ({
      layoutMode: layout.layoutMode,
      showRightSidebar: layout.showRightSidebar,
    })
  );
  // Inside your component
  const { layoutMode, showRightSidebar } = useSelector(nonauthData);

  const [search, setsearch] = useState<boolean>(false);
  const [socialDrp, setsocialDrp] = useState<boolean>(false);
  const [isClick, setClick] = useState<boolean>(true);

  /*** Sidebar menu icon and default menu set */
  function tToggle() {
    var body = document.body;
    setClick(!isClick);
    if (isClick === true) {
      body.classList.remove("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "sm");
    } else {
      body.classList.add("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "lg");
    }
  }
  useEffect(() => {
    if (window.innerWidth < 992) {
      setClick(false);
    }
  }, []);

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            {isClick ? (
              <div className="navbar-brand-box ">
                <Link
                  to="/dashboard"
                  className="logo logo-dark"
                >
                  {isClick && (
                    <span className="logo-sm">
                      <img
                        style={{
                          display: "block",
                          margin: "22px auto ",
                        }}
                        src={logoSvg}
                        width="80%"
                      />
                    </span>
                  )}
                  <span className="logo-lg">
                    <img
                      style={{
                        paddingLeft: 15,
                      }}
                      src={logoSvg}
                      alt=""
                      width="63%"
                    />{" "}
                  </span>
                </Link>

                <Link
                  to="/dashboard"
                  className="logo logo-light"
                >
                  <span className="logo-sm">
                    <img
                      style={{
                        display: "block",
                        margin: "auto ",
                      }}
                      src={logoSvg}
                      alt=""
                      width="100%"
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      style={{
                        paddingLeft: 15,
                      }}
                      src={logoSvg}
                      alt=""
                      height="36"
                      width="63%"
                    />{" "}
                  </span>
                </Link>
              </div>
            ) : null}

            <button
              onClick={() => {
                tToggle();
              }}
              type="button"
              className="btn btn-sm px-3 font-size-16 header-item"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>
            {!isClick && (
              <Link
                to="/dashboard"
                className="logo logo-dark"
              >
                {/* <span className="logo-sm"> */}
                <img
                  style={{
                    display: "block",
                    margin: "22px 0 ",
                  }}
                  src={logoSvg}
                  width="100%"
                />
                {/* </span> */}
              </Link>
            )}
          </div>
          <ProfileMenu />
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
