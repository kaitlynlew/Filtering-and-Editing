// import React from "react";
// import Header from "./components/Header";
// import BookList from "./components/BookList";
// import "./index.css";

// function App() {
//   return (
//     <div className="app">
//       <Header />
//       <BookList />
//       <footer className="footer">
//         © Kaitlyn Lew, 2025
//       </footer>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import BookList from "./components/BookList";
import LoanManager from "./components/LoanManager";
import "./index.css";

const LOCAL_STORAGE_BOOKS_KEY = 'book-catalog-data';
const LOCAL_STORAGE_LOANS_KEY = 'book-loan-data';

function App() {
  const [view, setView] = useState('catalog'); // 'catalog' or 'loans'

  // Load books from localStorage
  const [books, setBooks] = useState(() => {
    try {
      const storedBooks = localStorage.getItem(LOCAL_STORAGE_BOOKS_KEY);
      return storedBooks ? JSON.parse(storedBooks) : [];
    } catch (error) {
      console.error("Failed to load books from localStorage:", error);
      return [];
    }
  });

  // Load loans from localStorage
  const [loans, setLoans] = useState(() => {
    try {
      const storedLoans = localStorage.getItem(LOCAL_STORAGE_LOANS_KEY);
      return storedLoans ? JSON.parse(storedLoans) : [];
    } catch (error) {
      console.error("Failed to load loans from localStorage:", error);
      return [];
    }
  });

  // Effect to save books to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BOOKS_KEY, JSON.stringify(books));
    } catch (error) {
      console.error("Failed to save books to localStorage:", error);
    }
  }, [books]);

  // Effect to save loans to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_LOANS_KEY, JSON.stringify(loans));
    } catch (error) {
      console.error("Failed to save loans to localStorage:", error);
    }
  }, [loans]);

  // CRUD handlers for books (moved from BookList)
  const handleAddBook = (newBook) => {
    setBooks(prevBooks => [...prevBooks, newBook]);
  };

  const handleUpdateBook = (updatedBook) => {
    setBooks(prevBooks => 
      prevBooks.map(book => book.isbn13 === updatedBook.isbn13 ? updatedBook : book)
    );
  };

  const handleDeleteBook = (isbn13) => {
    setBooks(prevBooks => prevBooks.filter(book => book.isbn13 !== isbn13));
    // Also remove any corresponding loan if the book is deleted
    setLoans(prevLoans => prevLoans.filter(loan => loan.isbn13 !== isbn13));
  };

  // Handlers for loans
  const handleLoanBook = (newLoan) => {
    setLoans(prevLoans => [...prevLoans, newLoan]);
  };

  const handleReturnBook = (isbn13) => {
    setLoans(prevLoans => prevLoans.filter(loan => loan.isbn13 !== isbn13));
  };
  
  const currentView = view === 'catalog' ? (
    <BookList 
      books={books} 
      loans={loans}
      onAddBook={handleAddBook} 
      onUpdateBook={handleUpdateBook} 
      onDeleteBook={handleDeleteBook}
    />
  ) : (
    <LoanManager 
      books={books} 
      loans={loans} 
      onLoanBook={handleLoanBook} 
      onReturnBook={handleReturnBook} 
      onSwitchView={setView}
    />
  );

  return (
    <div className="app">
      <Header />
      <div className="main-content-wrapper">
        <div className="view-switch-container">
          <button 
            className="update-btn"
            onClick={() => setView(view === 'catalog' ? 'loans' : 'catalog')}
          >
            {view === 'catalog' ? 'Go to Loan Management' : 'Go to Book Catalog'}
          </button>
        </div>
        {currentView}
      </div>
      <footer className="footer">
        © Kaitlyn Lew, 2025
      </footer>
    </div>
  );
}

export default App;