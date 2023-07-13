import React, { useEffect, useRef, useState } from "react";
import {Alert, Button} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/auth";
import "./HomePage.css";
import jwt_decode from "jwt-decode";
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.value.token);
  const json = JSON.stringify(jwt_decode(token), null, 2)
  const logoutFunction = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="home-page">
      <Alert key={"dark"} variant={"dark"}>
        Access token: {token}
      </Alert>
        <Alert key={"primary"} variant={"primary"}>
          {json}
        </Alert>
      <a onClick={logoutFunction}>Logout</a>
    </div>
  );
};

export default HomePage;
