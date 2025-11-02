import React, { useState, useMemo } from "react";
import BookCard from "./BookCard";
import NewCard from "./NewCard"; 
import BookForm from "./BookForm"; 
import "../index.css"; 

// BookList now accepts state and logic via props from App.jsx
const BookList = ({ 
  books, // now filtered books
  loans, 
  onAddBook, 
  onUpdateBook, 
  onDeleteBook,
  selectedBookIsbn, // HOISTED
  onSelect, // HOISTED
  selectedBook // HOISTED
}) => {
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false); 

  // Loaned books set for quick lookup
  const loanedIsbns = useMemo(() => new Set(loans.map(loan => loan.isbn13)), [loans]);
  
  const handleAddBook = onAddBook;
  
  const handleDelete = () => {
    if (!selectedBookIsbn) return;
    onDeleteBook(selectedBookIsbn);
  };

  const handleUpdate = (updatedBook) => {
    onUpdateBook(updatedBook);
  };
  
  const selectedBookIsOnLoan = selectedBookIsbn && loanedIsbns.has(selectedBookIsbn);
  
  const handleEditClick = () => {
    if (selectedBookIsbn && !selectedBookIsOnLoan) {
      setIsEditingModalOpen(true);
    }
  };
  
  return (
    <div className="booklist">
      {/* AuthorFilter and its container removed from here */}
    <div className="booklist-layout">

      <div className="controls-panel">
      
            <NewCard 
                addBook={handleAddBook} 
            />

            <div className="action-buttons">
                <button 
                    onClick={handleEditClick} 
                    // New: Disable Edit if the selected book is on loan
                    disabled={!selectedBookIsbn || selectedBookIsOnLoan}
                    className="update-btn"
                    title={selectedBookIsOnLoan ? "Cannot edit a book that is on loan." : "Edit Book"}
                >
                    Edit
                </button>

                <button 
                    onClick={handleDelete} 
                    // Disable delete if no book is selected OR the selected book is on loan
                    disabled={!selectedBookIsbn || selectedBookIsOnLoan} 
                    className="delete-btn"
                    title={selectedBookIsOnLoan ? "Cannot delete a book that is on loan." : "Delete Book"}
                >
                    Delete
                </button>
            </div>
            
          </div>
          
          <div className="books-grid"> 
                  
              {books.map((book) => ( // Uses the pre-filtered books prop
                  <BookCard
                      key={book.isbn13}
                      {...book}
                      selected={book.isbn13 === selectedBookIsbn}
                      onSelect={() => onSelect(book.isbn13)} // Uses the onSelect prop
                      isLoaned={loanedIsbns.has(book.isbn13)} // Pass loan status
                  />
              ))}
          </div>

          {isEditingModalOpen && selectedBook && (
            <BookForm
              onSubmit={handleUpdate}
              initialData={selectedBook}
              isEditing={true}
              closeModal={() => setIsEditingModalOpen(false)}
            />
          )}
      </div>
    </div>

  );
};

export default BookList;