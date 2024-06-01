import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./modules/Home";
import Login from "./modules/Login";

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(0);

    return (
        <Router>
            <Routes>
                {authenticated ? (
                    <Route
                        path="/"
                        element={
                            <Home
                                setAuthenticated={setAuthenticated}
                                userId={userId}
                            />
                        }
                    />
                ) : (
                    <Route
                        path="/"
                        element={
                            <Login
                                setAuthenticated={setAuthenticated}
                                setUserId={setUserId}
                            />
                        }
                    />
                )}
            </Routes>
        </Router>
    );
};

export default App;
