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

const App = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-book" element={<AddBookPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/book/:bookId" element={<BookDetailsPage />} />
                <Route
                    path="/book/:bookId/update"
                    element={<UpdateBookPage />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
};

export default App;
