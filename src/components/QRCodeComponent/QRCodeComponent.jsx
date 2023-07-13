import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { login } from "../../store/auth";
import axios from "axios";

const QRCodeComponent = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { codes } = props;
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const sock = new SockJS(`${process.env.REACT_APP_SERVER_API}/loginListener`);
    const client = Stomp.over(sock);
    setStompClient(client);
  }, []);

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({}, onConnected, onError);
    }
  }, [stompClient]);
  const issueToken = (txId, authCode) => {
    return axios.post(`${process.env.REACT_APP_SERVER_API}/external/auth/token`, {
      txId,
      authCode,
    })
  }
  const onConnected = () => {
    if (stompClient !== undefined && stompClient !== null) {
      stompClient.subscribe(
        "/topic/loginListener/" + codes.txId,
        onMessageReceived
      );
    }
  };

  const onMessageReceived = (payload) => {
    const result = JSON.parse(payload.body);
    if(result.id === codes.txId) {
      issueToken(result.id, result.authCode).then(res => {
        const token = res.data;
        dispatch(
            login({
              token: token.accessToken,
            })
        );
        stompClient.disconnect();
        navigate("/home");
      });
    }
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <div>
      <QRCode
          size={200}
          value={`${window.location.origin}/scan/${codes.txId}`}
          onClick={() => window.open(`${window.location.origin}/scan/${codes.txId}`)}
      />
    </div>
  );
};

export default QRCodeComponent;
