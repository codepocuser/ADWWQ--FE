import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import QRCodeComponent from "../../components/QRCodeComponent/QRCodeComponent";
import axios from "axios";
import "./LoginPage.css";

const RefreshInterval = ({ interval }) => {
  return (
      <p>Refresh ({interval})</p>
  )
}
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qrcode, setQRCode] = useState({
    txId: "",
    authCode: "",
    expires: "",
  })
  const REFRESH_INTERVAL = 60;
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if(counter >= 0){
      setTimeout(() => setCounter(counter - 1), 1000);
    }else {
      refreshCode()
    }
  }, [counter]);

  const refreshCode = () => {
    axios.get(`${process.env.REACT_APP_SERVER_API}/external/qrcode/generate`).then((result) => {
      setQRCode(result.data)
      setCounter(REFRESH_INTERVAL)
    });
  }


  return (

      <div className="login-page">
        {/*<div className="login-header">*/}
        {/*  <img src="https://www.cncbinternational.com/_images/logo-new.gif" className="bank-logo" alt="logo" />*/}
        {/*</div>*/}
        {counter > 0 ?
            <>
              <QRCodeComponent codes={qrcode} />
              <RefreshInterval interval={counter} />
            </>
            :
            <Spinner className="spinner" animation="border" />
        }
      </div>
  );
};

export default LoginPage;
