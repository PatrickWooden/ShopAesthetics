import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navigation.css";
import NavigationIcon from "../icons/navigationIcon.js";
import CloseIcon from "../icons/closeIcon.js";
import MessageIcon from "../icons/messageIcon.js";
import Notification from "../icons/notificationIcon";

function NavBarSeller() {
  const [clicked, setClicked] = useState(true);
  const [openDropDown, setShowDropDown] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const getLocation = useLocation();

  // active navigation
  const handleOnClickNavBar = (e) => {
    if (openDropDown === true) {
      setClicked((prevState) => !prevState);
      setShowDropDown(false);
    }

    setClicked((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const handleOnClickNavBarReload = (e) => {
    navigate(e);
    window.location.reload();
  };

  // dropdown toggle
  const handleDropDownToggle = () => {
    setShowDropDown((prevState) => !prevState);
  };

  // make sure the active page should be current
  useEffect(() => {
    setCurrentLocation(window.location.pathname);
    if (getLocation.pathname === currentLocation) {
      setClicked((prevState) => !prevState);
    }
  }, [openDropDown, getLocation, currentLocation]);

  return (
    <nav>
      {/* logo */}
      <div onClick={handleOnClickNavBar}>
        <li className="navbar-website-name">
          <NavLink to="/"> ShopAesthetics </NavLink>
        </li>
      </div>

      {/* navigation link */}
      <div>
        <ul
          className={`navbar-links + ${clicked ? "active_navigation" : ""}`}
          onClick={handleOnClickNavBar}
        >
          <li
            to="/dashboard"
            className={
              currentLocation === "/dashboard" ? "active_page_navigation" : ""
            }
            onClick={handleOnClickNavBar}
          >
            <NavLink to="/dashboard"> Dashboard </NavLink>
          </li>
          <li
            to="/analytics"
            className={
              currentLocation === "/analytics" ? "active_page_navigation" : ""
            }
            onClick={handleOnClickNavBar}
          >
            <NavLink to="/analytics"> Analytics </NavLink>
          </li>
          <li
            to="/business_orders"
            className={
              currentLocation === "/business_orders"
                ? "active_page_navigation"
                : ""
            }
            onClick={handleOnClickNavBar}
          >
            <NavLink to="/business_orders"> Orders </NavLink>
          </li>
          <li
            to="/postAd"
            className={
              currentLocation === "/postAd" ? "active_page_navigation" : ""
            }
            onClick={handleOnClickNavBar}
          >
            <NavLink to="/postAd"> Post Ad </NavLink>
          </li>
          <li to="#">
            <NavLink to="#">
              <MessageIcon />
            </NavLink>
          </li>
          <li to="#">
            <NavLink to="#">
              <Notification />
            </NavLink>
          </li>
          <li
            onClick={handleDropDownToggle}
            className={`dropdown ${openDropDown ? "open" : ""}`}
          >
            <NavLink> Account </NavLink>
            <div className={`dropdown-menu ${openDropDown ? "show" : ""}`}>
              <ul>
                <li>
                  <NavLink onClick={() => handleOnClickNavBarReload("/")}>
                    {" "}
                    Switch to Buyer{" "}
                  </NavLink>
                </li>
                <li
                  className={
                    currentLocation === "/profile_setting"
                      ? "active_page_navigation"
                      : ""
                  }
                  onClick={handleOnClickNavBar}
                >
                  <NavLink to="/profile_setting"> Profile Setting </NavLink>
                </li>
                <li
                  className={
                    currentLocation === "/notification_setting"
                      ? "active_page_navigation"
                      : ""
                  }
                  onClick={handleOnClickNavBar}
                >
                  <NavLink to="/notification_setting">
                    {" "}
                    Notification Setting{" "}
                  </NavLink>
                </li>
                <li
                  className={
                    currentLocation === "/about_us"
                      ? "active_page_navigation"
                      : ""
                  }
                  onClick={handleOnClickNavBar}
                >
                  <NavLink to="/about_us"> About Us </NavLink>
                </li>
                <li
                  className={
                    currentLocation === "/customer_support"
                      ? "active_page_navigation"
                      : ""
                  }
                  onClick={handleOnClickNavBar}
                >
                  <NavLink to="/customer_support"> Customer Support </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li
            to="/login"
            className={
              currentLocation === "/login" ? "active_page_navigation" : ""
            }
            onClick={handleOnClickNavBar}
          >
            <NavLink to="/login">
              Sign In
              <br />
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>

      {/* mobile version links */}
      <div className="mobile-version" onClick={handleOnClickNavBar}>
        <i className={clicked ? "close_icon" : "navigation_icon"}></i>
        {clicked ? <CloseIcon /> : <NavigationIcon />}
      </div>
    </nav>
  );
}

export default NavBarSeller;
