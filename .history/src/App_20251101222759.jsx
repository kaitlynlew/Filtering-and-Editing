import React, { useState, useEffect, useMemo } from "react"; // useMemo added
import Header from "./components/Header";
import BookList from "./components/BookList";
import LoanManager from "./components/LoanManager";
import AuthorFilter from "./components/AuthorFilter"; // Import Filter
import "./index.css";

const LOCAL_STORAGE_BOOKS_KEY = 'book-catalog-data';
const LOCAL_STORAGE_LOANS_KEY = 'book-loan-data';

function App() {
  const [view, setView] = useState('catalog'); 
  const [selectedBookIsbn, setSelectedBookIsbn] = useState(null); // HOISTED
  const [authorFilter, setAuthorFilter] = useState(""); // NEW FILTER STATE

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

  // CRUD handlers for books
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
    setLoans(prevLoans => prevLoans.filter(loan => loan.isbn13 !== isbn13));
    setSelectedBookIsbn(null); // Deselect on delete
  };

  // Handlers for loans
  const handleLoanBook = (newLoan) => {
    setLoans(prevLoans => [...prevLoans, newLoan]);
  };

  // Filter Logic (HOISTED)
  const uniqueAuthors = useMemo(() => {
    const authors = books.map(book => book.author).filter(Boolean);
    return [...new Set(authors)].sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      if (authorFilter === "") return true;
      return book.author === authorFilter;
    });
  }, [books, authorFilter]);
  
  // Handlers for selected book (HOISTED)
  const handleSelect = (isbn13) => {
    setSelectedBookIsbn(prevIsbn => (prevIsbn === isbn13 ? null : isbn13));
  };
  
  const handleFilterChange = (e) => {
    setAuthorFilter(e.target.value);
    setSelectedBookIsbn(null); // Deselect when filter changes
  };
  
  // Determine selected book for form/display (HOISTED)
  const selectedBook = useMemo(() => {
    return books.find(book => book.isbn13 === selectedBookIsbn);
  }, [books, selectedBookIsbn]);


  const commonHeader = (
    // NEW WRAPPER DIV for layout:
    <div className="top-control-bar">
      {/* View Switcher (Left side) */}
      <div className="view-switch-container">
        <button 
          className="update-btn"
          onClick={() => {
              setView(view === 'catalog' ? 'loans' : 'catalog');
              setAuthorFilter(""); // Clear filter on view switch
          }}
        >
          {view === 'catalog' ? 'Go to Loan Management' : 'Go to Book Catalog'}
        </button>
      </div>

      {/* Author Filter (Right side, only visible in catalog view) */}
      {view === 'catalog' && (
        <AuthorFilter 
          uniqueAuthors={uniqueAuthors}
          authorFilter={authorFilter}
          onFilterChange={handleFilterChange}
        />
      )}
    </div>
  );

  const currentView = view === 'catalog' ? (
    <BookList 
      books={filteredBooks} // Pass filtered books
      loans={loans}
      onAddBook={handleAddBook} 
      onUpdateBook={handleUpdateBook} 
      onDeleteBook={handleDeleteBook}
      // HOISTED PROPS
      selectedBookIsbn={selectedBookIsbn}
      onSelect={handleSelect}
      selectedBook={selectedBook}
    />
  ) : (
    <LoanManager 
      books={books} 
      loans={loans} 
      onLoanBook={handleLoanBook} 
      onSwitchView={setView}
    />
  );

  return (
    <div className="app">
      <Header />
      <div className="main-content-wrapper">
        {/* Render the new control bar */}
        {commonHeader} 
        {currentView}
      </div>
      <footer className="footer">
        © Kaitlyn Lew, 2025
      </footer>
    </div>
  );
}

export default App;