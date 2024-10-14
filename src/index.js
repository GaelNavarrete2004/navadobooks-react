import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Booklist from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import { AppProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/navadobooks-react" element={<Home />}>
          <Route path="/navadobooks-react/about" element={<About />} />
          <Route path="/navadobooks-react/book" element={<Booklist />} />
          <Route path="/navadobooks-react/book/:id" element={<BookDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);
