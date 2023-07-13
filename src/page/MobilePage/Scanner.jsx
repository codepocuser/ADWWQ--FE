
import React, { useState } from 'react';
import "./Scanner.css";
import axios from "axios";
import {useParams} from "react-router-dom";
const Scanner = () => {
    const {id} = useParams()
    const [user, setUser] = useState("");
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(false);
    const authorize = () => {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_SERVER_API}/external/mobile/acknowledge`, {
            txId: id,
            user,
        }).then(() => setAuthorized(true))
            .catch(() => alert("QRCode is expired."));
    }

    return (
            <div className="auth-box">
                {authorized ? "Done." :
                    <>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={(e) => {
                                setUser(e.target.value);
                            }}
                            placeholder="Logged in user" />
                        <input
                            className="auth-btn"
                            onClick={authorize}
                            type="button"
                            value={loading ? "Loading..." : "Authorize"}
                            disabled={loading}
                        />
                    </>
                }
            </div>

    )
}

export default Scanner;