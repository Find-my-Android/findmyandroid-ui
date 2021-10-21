import React, {useState} from "react";
import Notification from "../components/Notification";
import Form from "react-bootstrap/Form";
import App from "../App";
import Button from "react-bootstrap/Button";

function Setnewpassword(history){
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const validatePasswords = (e) => {
        if (password1 !== e.target.value) {
            e.target.setCustomValidity("Passwords do not match");
        } else {
            e.target.setCustomValidity("");
        }
    };


    return (
        <div>
            <Notification></Notification>
            <h1>
                New Password
            </h1>

            <Form.Group controlId="NewPassword1">
                <Form.Label>Type Your New Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="NewPassword2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    value={password2}
                    onChange={(e) => {
                        setPassword2(e.target.value);
                        validatePasswords(e);
                    }}
                />

                <Button type="submit">Confirm</Button>
            </Form.Group>
        </div>
    )
}

export default Setnewpassword;
