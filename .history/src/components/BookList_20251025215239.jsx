// import React, { useState } from "react";
// import BookCard from "./BookCard";
// import NewCard from "./NewCard";
// import BookForm from "./BookForm"; 
// import "../index.css"; 

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBookIsbn, setSelectedBookIsbn] = useState(null);
//   const [isEditingModalOpen, setIsEditingModalOpen] = useState(false); 

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
//     setIsEditingModalOpen(false);
//   };
  
//   const selectedBook = books.find(book => book.isbn13 === selectedBookIsbn);
  
//   const handleEditClick = () => {
//     if (selectedBook) {
//       setIsEditingModalOpen(true);
//     }
//   };

//   return (
//     <div className="booklist-layout">
      
//       <div className="controls-panel">
        
//         {/* NewCard is used for triggering the Add Book modal */}
//         <NewCard 
//             addBook={handleAddBook} 
//         />
        
//         <div className="action-buttons">
//             <button 
//                 onClick={handleEditClick} 
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

//       {/* Conditional rendering of the Edit Book Form */}
//       {isEditingModalOpen && selectedBook && (
//         <BookForm
//           onSubmit={handleUpdate}
//           initialData={selectedBook}
//           isEditing={true}
//           closeModal={() => setIsEditingModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default BookList;

import React, { useState } from "react";
import BookCard from "./BookCard";
import NewCard from "./NewCard";
import BookForm from "./BookForm"; 
import "../index.css"; 

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookIsbn, setSelectedBookIsbn] = useState(null);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false); 
  // New state for author filter
  const [authorFilter, setAuthorFilter] = useState("");

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
    setIsEditingModalOpen(false);
  };

  // Handler for the filter input change
  const handleFilterChange = (e) => {
      setAuthorFilter(e.target.value);
      setSelectedBookIsbn(null); // Deselect book when filter changes
  };

  // Filter the books based on the authorFilter state
  const filteredBooks = books.filter(book => 
    book.author.toLowerCase().includes(authorFilter.toLowerCase())
  );
  
  const selectedBook = books.find(book => book.isbn13 === selectedBookIsbn);
  
  const handleEditClick = () => {
    if (selectedBook) {
      setIsEditingModalOpen(true);
    }
  };

  return (
    <div className="booklist-layout">
      
      <div className="controls-panel">
        
        {/* Author Filter Input */}
        <input
            type="text"
            placeholder="Filter by Author"
            value={authorFilter}
            onChange={handleFilterChange}
            style={{ padding: '8px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
        />
        
        {/* NewCard is used for triggering the Add Book modal */}
        <NewCard 
            addBook={handleAddBook} 
        />
        
        <div className="action-buttons">
            <button 
                onClick={handleEditClick} 
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
        {/* Use filteredBooks instead of books */}
        {filteredBooks.map((book) => (
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
          onSubmit={handleUpdate}
          initialData={selectedBook}
          isEditing={true}
          closeModal={() => setIsEditingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BookList;