// import React, { useState } from "react";
// import BookCard from "./BookCard";
// import NewCard from "./NewCard";
// import "../index.css";

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBookIsbn, setSelectedBookIsbn] = useState(null);

//   const handleSelect = (isbn13) => {
//     setSelectedBookIsbn(prevIsbn => (prevIsbn === isbn13 ? null : isbn13));
//   };
  
//   const handleAddBook = (newBook) => {
//     setBooks(prevBooks => [...prevBooks, newBook]);
//   };
  
//   const handleDelete = () => {
//     if (!selectedBookIsbn) return;
    
//     setBooks(prevBooks => prevBooks.filter((book) => book.isbn13 !== selectedBookIsbn));
//     setSelectedBookIsbn(null);
//   };
  
//   const handleUpdate = (updatedBook) => {
//     setBooks(prevBooks =>
//       prevBooks.map(book => 
//         book.isbn13 === updatedBook.isbn13 ? { ...book, ...updatedBook } : book
//       )
//     );
//     setSelectedBookIsbn(null);
//   };
  
//   const selectedBook = books.find(book => book.isbn13 === selectedBookIsbn);
  
//   return (
//     <div className="booklist-layout">
      
//       <div className="controls-panel">
        
//         <NewCard 
//             addBook={handleAddBook} 
//             updateBook={handleUpdate}
//             selectedBook={selectedBook}
//         />
        
//         <div className="action-buttons">
//             <button 
//                 onClick={() => {}} 
//                 disabled={!selectedBookIsbn}
//                 className="update-btn"
//             >
//                 Edit
//             </button>

//             <button 
//                 onClick={handleDelete} 
//                 disabled={!selectedBookIsbn}
//                 className="delete-btn"
//             >
//                 Delete
//             </button>
//         </div>
//       </div>
      
//       <div className="books-grid">
//         {books.map((book) => (
//           <BookCard
//             key={book.isbn13}
//             {...book}
//             selected={book.isbn13 === selectedBookIsbn}
//             onSelect={() => handleSelect(book.isbn13)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BookList;

import React, { useState } from "react";
import BookCard from "./BookCard";
import NewCard from "./NewCard";
import BookForm from "./BookForm"; 
import "../index.css"; // Adjusted import path for CSS

const BookList = () => {
  const initialBooks = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publisher: "Scribner",
      publication_year: 1925,
      language: "English",
      pages: 180,
      image: "https://placehold.co/170x280/90a254/ffffff?text=The+Great+Gatsby",
      isbn13: "978-0743273565"
    }
  ];

  const [books, setBooks] = useState(initialBooks);
  const [selectedBookIsbn, setSelectedBookIsbn] = useState(null);
  // State to control the visibility of the editing modal
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false); 

  const handleSelect = (isbn13) => {
    // Deselects if already selected, otherwise selects the new book
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
  
  // Function to handle saving changes from the Edit form
  const handleUpdate = (updatedBook) => {
    setBooks(prevBooks =>
      prevBooks.map(book => 
        // Find the book by its unique isbn13 and replace it with the updated data
        book.isbn13 === updatedBook.isbn13 ? { ...book, ...updatedBook } : book
      )
    );
    setSelectedBookIsbn(null); // Deselect the book after updating
    setIsEditingModalOpen(false); // Close modal after update
  };
  
  const selectedBook = books.find(book => book.isbn13 === selectedBookIsbn);
  
  // Function to open the edit modal when the Edit button is clicked
  const handleEditClick = () => {
    if (selectedBook) {
      setIsEditingModalOpen(true);
    }
  };

  return (
    <div className="booklist-layout">
      
      <div className="controls-panel">
        
        {/* NewCard is used for triggering the Add Book modal */}
        <NewCard 
            addBook={handleAddBook} 
        />
        
        <div className="action-buttons">
            <button 
                // Updated onClick handler to open the edit modal
                onClick={handleEditClick} 
                disabled={!selectedBookIsbn} // Disabled if no book is selected
                className="update-btn"
            >
                Edit
            </button>

            <button 
                onClick={handleDelete} 
                disabled={!selectedBookIsbn} // Disabled if no book is selected
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

      {/* Conditional rendering of the Edit Book Form */}
      {isEditingModalOpen && selectedBook && (
        <BookForm
          onSubmit={handleUpdate} // Submits to the update handler
          initialData={selectedBook} // Passes the selected book's current data
          isEditing={true} // Tells the form it's in edit mode
          closeModal={() => setIsEditingModalOpen(false)} // Function to close the modal
        />
      )}
    </div>
  );
};

export default BookList;