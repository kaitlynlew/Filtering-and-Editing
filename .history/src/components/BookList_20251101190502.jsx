// import React, { useState, useMemo, useEffect } from "react";
// import BookCard from "./BookCard";
// import NewCard from "./NewCard"; 
// import BookForm from "./BookForm"; 
// import AuthorFilter from "./AuthorFilter";
// import "../index.css"; 

// const LOCAL_STORAGE_KEY = 'book-catalog-data';

// const BookList = () => {
//   const [books, setBooks] = useState(() => {
//     try {
//       const storedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
//       return storedBooks ? JSON.parse(storedBooks) : [];
//     } catch (error) {
//       console.error("Failed to load books from localStorage:", error);
//       return [];
//     }
//   });
  
//   const [selectedBookIsbn, setSelectedBookIsbn] = useState(null);
//   const [isEditingModalOpen, setIsEditingModalOpen] = useState(false); 
//   const [authorFilter, setAuthorFilter] = useState("");

//   useEffect(() => {
//     try {
//       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
//     } catch (error) {
//       console.error("Failed to save books to localStorage:", error);
//     }
//   }, [books]);

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

//   const handleFilterChange = (e) => {
//       setAuthorFilter(e.target.value);
//       setSelectedBookIsbn(null);
//   };
  
//   const uniqueAuthors = useMemo(() => {
//     const allAuthors = books.map(book => book.author);
//     const authorSet = new Set(allAuthors);
//     return [...authorSet]
//       .filter(author => author && author.trim() !== "")
//       .sort((a, b) => a.localeCompare(b));
//   }, [books]);

//   const filteredBooks = books.filter(book => {
//       if (authorFilter === "") {
//           return true;
//       }
//       return book.author === authorFilter;
//   });
  
//   const selectedBook = books.find(book => book.isbn13 === selectedBookIsbn);
  
//   const handleEditClick = () => {
//     if (selectedBook) {
//       setIsEditingModalOpen(true);
//     }
//   };


//   return (
    
//     <div className="filter-panel">

//       <div className="filter">  
//         <AuthorFilter 
//             uniqueAuthors={uniqueAuthors}
//             authorFilter={authorFilter}
//             onFilterChange={handleFilterChange}
//         />
//       </div>

//     <div className="booklist-layout">

//       <div className="controls-panel">
      
//             <NewCard 
//                 addBook={handleAddBook} 
//             />

//             <div className="action-buttons">
//                 <button 
//                     onClick={handleEditClick} 
//                     disabled={!selectedBookIsbn}
//                     className="update-btn"
//                 >
//                     Edit
//                 </button>

//                 <button 
//                     onClick={handleDelete} 
//                     disabled={!selectedBookIsbn}
//                     className="delete-btn"
//                 >
//                     Delete
//                 </button>
//             </div>
            
//           </div>
          
//           <div className="books-grid"> 
                  
//               {filteredBooks.map((book) => (
//                   <BookCard
//                       key={book.isbn13}
//                       {...book}
//                       selected={book.isbn13 === selectedBookIsbn}
//                       onSelect={() => handleSelect(book.isbn13)}
//                   />
//               ))}
//           </div>

//           {isEditingModalOpen && selectedBook && (
//             <BookForm
//               onSubmit={handleUpdate}
//               initialData={selectedBook}
//               isEditing={true}
//               closeModal={() => setIsEditingModalOpen(false)}
//             />
//           )}
//       </div>
//     </div>

//   );
// };

// export default BookList;

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
  
  const handleEditClick = () => {
    if (selectedBookIsbn) {
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

  const selectedBookIsOnLoan = selectedBookIsbn && loanedIsbns.has(selectedBookIsbn);


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
                    disabled={!selectedBookIsbn}
                    className="update-btn"
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