import React, { useState } from "react";
import { Input, Button, Form } from "antd";

const Login = ({ setAuthenticated, setUserId }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [disabled, setDisabled] = useState(false);

    const login = () => {
        setDisabled(true);
        fetch("http://localhost:8080/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then((res) => {
                if (res.ok) {
                    setAuthenticated(true);
                    return res.json();
                } else {
                    alert("Not Authorized");
                    setDisabled(false);
                }
            })
            .then((data) => setUserId(data));
    };

    return (
        <div
            style={{
                backgroundColor: "#2D2D2D",
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "66.6vh",
                    height: "33.3vh",
                    backgroundColor: "#D2D2D2",
                    borderRadius: 20,
                    padding: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexDirection: "column",
                }}
            >
                <h1>Login</h1>

                <Form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                    }}
                    disabled={disabled}
                >
                    <Form.Item
                        name={"E-mail"}
                        rules={[
                            {
                                required: true,
                                message: "Please Enter a Valid Email",
                                type: "email",
                            },
                        ]}
                        style={{ width: "75%" }}
                    >
                        <Input
                            size="large"
                            placeholder="Email"
                            inputMode="text"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name={"Password"}
                        rules={[
                            {
                                required: true,
                                message: "Please Enter Your Password",
                            },
                        ]}
                        style={{ width: "75%" }}
                    >
                        <Input.Password
                            size="large"
                            placeholder="Password"
                            inputMode="text"
                            hidden
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            onClick={() => login()}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
