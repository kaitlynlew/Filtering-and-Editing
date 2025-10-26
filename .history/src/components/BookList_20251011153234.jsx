import React, { useState } from "react";
import BookCard from "./BookCard";
import NewCard from "./NewCard";
import "../index.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookIsbn, setSelectedBookIsbn] = useState(null);

  const handleSelect = (isbn13) => {
    setSelectedBookIsbn(prevIsbn => (prevIsbn === isbn13 ? null : isbn13));
  };
  
  const handleAddBook = (newBook) => {
    setBooks(prevBooks => [...prevBooks, newBook]);
  };
  
  const handleDelete = () => {
    if (!selectedBookIsbn) return;
    
    setBooks(prevBooks => prevBooks.filter((book) => book.isbn13 !== selectedBookIsbn));
    setSelectedBookIsbn(null);
  };
  
  const handleUpdate = (updatedBook) => {
    setBooks(prevBooks =>
      prevBooks.map(book => 
        book.isbn13 === updatedBook.isbn13 ? { ...book, ...updatedBook } : book
      )
    );
    setSelectedBookIsbn(null);
  };
  
  const selectedBook = books.find(book => book.isbn13 === selectedBookIsbn);
  
  return (
    <div className="booklist-layout">
      
      <div className="controls-panel">
        
        <NewCard 
            addBook={handleAddBook} 
            updateBook={handleUpdate}
            selectedBook={selectedBook}
        />
        
        <div className="action-buttons">
            <button 
                onClick={() => {}} 
                disabled={!selectedBookIsbn}
                className="update-btn"
            >
                Edit
            </button>

            <button 
                onClick={handleDelete} 
                disabled={!selectedBookIsbn}
                className="delete-btn"
            >
                Delete
            </button>
        </div>
      </div>
      
      <div className="books-grid">
        {books.map((book) => (
          <BookCard
            key={book.isbn13}
            {...book}
            selected={book.isbn13 === selectedBookIsbn}
            onSelect={() => handleSelect(book.isbn13)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;