import React, { useState, useMemo } from "react";
import BookCard from "./BookCard";
import NewCard from "./NewCard"; 
import BookForm from "./BookForm"; 
import AuthorFilter from "./AuthorFilter";
import "../index.css"; 

// BookList now takes books, loans, and handlers as props from App.jsx
const BookList = ({ books, loans, onAddBook, onUpdateBook, onDeleteBook }) => {
  const [selectedBookIsbn, setSelectedBookIsbn] = useState(null);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false); 
  const [authorFilter, setAuthorFilter] = useState("");

  // Loaned books set for quick lookup
  const loanedIsbns = useMemo(() => new Set(loans.map(loan => loan.isbn13)), [loans]);

  const handleSelect = (isbn13) => {
    setSelectedBookIsbn(prevIsbn => (prevIsbn === isbn13 ? null : isbn13));
  };
  
  // Use onAddBook from props
  const handleAddBook = onAddBook;
  
  const handleDelete = () => {
    if (!selectedBookIsbn) return;
    
    // Use onDeleteBook from props
    onDeleteBook(selectedBookIsbn);
    setSelectedBookIsbn(null);
  };

  const handleUpdate = (updatedBook) => {
    // Use onUpdateBook from props
    onUpdateBook(updatedBook);
    setSelectedBookIsbn(null); // Deselect after update
  };
  
  const selectedBookIsOnLoan = selectedBookIsbn && loanedIsbns.has(selectedBookIsbn);
  
  const handleEditClick = () => {
    if (selectedBookIsbn && !selectedBookIsOnLoan) { // NEW CHECK HERE
      setIsEditingModalOpen(true);
    }
  };
  
  const selectedBook = useMemo(() => {
    return books.find(book => book.isbn13 === selectedBookIsbn);
  }, [books, selectedBookIsbn]);

  const uniqueAuthors = useMemo(() => {
    const authors = books.map(book => book.author).filter(Boolean);
    return [...new Set(authors)].sort();
  }, [books]);

  const handleFilterChange = (e) => {
    setAuthorFilter(e.target.value);
    setSelectedBookIsbn(null); // Deselect when filter changes
  };

  // Filter books based on author
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      if (authorFilter === "") return true;
      return book.author === authorFilter;
    });
  }, [books, authorFilter]);

  return (
    <div className="booklist">
      <div className="filter-and-list">
        <AuthorFilter 
          uniqueAuthors={uniqueAuthors}
          authorFilter={authorFilter}
          onFilterChange={handleFilterChange}
        />
      </div>

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
                  
              {filteredBooks.map((book) => (
                  <BookCard
                      key={book.isbn13}
                      {...book}
                      selected={book.isbn13 === selectedBookIsbn}
                      onSelect={() => handleSelect(book.isbn13)}
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