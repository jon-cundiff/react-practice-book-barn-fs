import React from "react";
import { Route, Routes } from "react-router-dom";

import AddBookPage from "./Components/Books/AddBookPage";
import BookDetailsPage from "./Components/Books/BookDetailsPage";
import UpdateBookPage from "./Components/Books/UpdateBookPage";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Profile from "./Components/Home/Profile";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import ProtectedRoute from "./Components/util/ProtectedRoute";

const App = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/add-book"
                    element={
                        <ProtectedRoute auth>
                            <AddBookPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute auth>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route path="/book/:bookId" element={<BookDetailsPage />} />
                <Route
                    path="/book/:bookId/update"
                    element={
                        <ProtectedRoute auth>
                            <UpdateBookPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <ProtectedRoute auth={false}>
                            <Login />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <ProtectedRoute auth={false}>
                            <Signup />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
