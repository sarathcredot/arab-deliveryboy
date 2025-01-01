import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { Link } from "react-router-dom";

// users
import userIcon from "../../../assets/images/icons/userIcon.svg";

//redux
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const ProfileMenu = (props: any) => {
  // const { success } = useSelector((state: any) => ({
  //   success: state.profile.success,
  // }));

  const profiledata = createSelector(
    (state: any) => state.profile,
    (state) => ({
      success: state.success,
    })
  );
  // Inside your component
  const { success } = useSelector(profiledata);

  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState<boolean>(false);

  const [username, setusername] = useState("Admin");

  useEffect(() => {
    const getAuthUser = localStorage.getItem("authUser");
    if (getAuthUser) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(getAuthUser);
        setusername(obj.displayName);
      } else if (process.env.REACT_APP_DEFAULTAUTH === "fake" || process.env.REACT_APP_DEFAULTAUTH === "jwt") {
        const obj = JSON.parse(getAuthUser);
        setusername(obj.username);
      }
    }
  }, [success]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
        // style={{
        //   background:"red"
        // }}
      >
        <DropdownToggle
          className="btn header-item bg-soft-light "
          id="page-header-user-dropdown"
          tag="button"
        >
          {/* <img
            className="rounded-circle header-profile-user"
            src={userIcon}
            alt="Header Avatar"
          /> */}
          <Link to="/profile">
            <svg
              className="rounded-circle header-profile-user"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1.5C7.035 1.5 5.4375 3.0975 5.4375 5.0625C5.4375 6.99 6.945 8.55 8.91 8.6175C8.97 8.61 9.03 8.61 9.075 8.6175C9.09 8.6175 9.0975 8.6175 9.1125 8.6175C9.12 8.6175 9.12 8.6175 9.1275 8.6175C11.0475 8.55 12.555 6.99 12.5625 5.0625C12.5625 3.0975 10.965 1.5 9 1.5Z"
                fill="#131313"
              />
              <path
                d="M12.81 10.6125C10.7175 9.21753 7.30497 9.21753 5.19747 10.6125C4.24497 11.25 3.71997 12.1125 3.71997 13.035C3.71997 13.9575 4.24497 14.8125 5.18997 15.4425C6.23997 16.1475 7.61997 16.5 8.99997 16.5C10.38 16.5 11.76 16.1475 12.81 15.4425C13.755 14.805 14.28 13.95 14.28 13.02C14.2725 12.0975 13.755 11.2425 12.81 10.6125Z"
                fill="#131313"
              />
            </svg>
          </Link>
        </DropdownToggle>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};
export default withTranslation()(ProfileMenu);
