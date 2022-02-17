import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddBookPage from "./Components/Books/AddBookPage";
import BookDetailsPage from "./Components/Books/BookDetailsPage";
import UpdateBookPage from "./Components/Books/UpdateBookPage";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";

const App = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-book" element={<AddBookPage />} />
                <Route path="/book/:bookId" element={<BookDetailsPage />} />
                <Route
                    path="/book/:bookId/update"
                    element={<UpdateBookPage />}
                />
            </Routes>
        </div>
    );
};

export default App;
