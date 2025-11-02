import React from "react";
import Header from "./components/Header";
import BookList from "./components/BookList";
import "./index.css";

function App() {
  return (
    <div className="app">
      <Header />
      <BookList />
      <footer className="footer">
        © Kaitlyn Lew, 2025
      </footer>
    </div>
  );
}

export default App;
