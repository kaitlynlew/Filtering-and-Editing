// import React, { useState, useMemo } from "react";
// import BookCard from "./BookCard";
// import NewCard from "./NewCard";
// import BookForm from "./BookForm"; 
// import AuthorFilter from "./AuthorFilter";
// import "../index.css"; 

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBookIsbn, setSelectedBookIsbn] = useState(null);
//   const [isEditingModalOpen, setIsEditingModalOpen] = useState(false); 
//   const [authorFilter, setAuthorFilter] = useState("");

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
//     return [...authorSet].sort((a, b) => a.localeCompare(b));
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
//     <div className="booklist-layout">

//       <div className="controls-panel">
//       <div>
//         <AuthorFilter 
//             uniqueAuthors={uniqueAuthors}
//             authorFilter={authorFilter}
//             onFilterChange={handleFilterChange}
//         />
//       </div>

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
//         {filteredBooks.map((book) => (
//           <BookCard
//             key={book.isbn13}
//             {...book}
//             selected={book.isbn13 === selectedBookIsbn}
//             onSelect={() => handleSelect(book.isbn13)}
//           />
//         ))}
//       </div>

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

// fileName: BookList.jsx
import React, { useState, useMemo, useEffect } from "react";
import BookCard from "./BookCard";
import NewCard from "./NewCard"; 
import BookForm from "./BookForm"; 
import AuthorFilter from "./AuthorFilter";
import "../index.css"; 

// Key for localStorage
const LOCAL_STORAGE_KEY = 'book-catalog-data';

const BookList = () => {
  const [books, setBooks] = useState(() => {
    try {
      const storedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedBooks ? JSON.parse(storedBooks) : [];
    } catch (error) {
      console.error("Failed to load books from localStorage:", error);
      return [];
    }
  });
  
  const [selectedBookIsbn, setSelectedBookIsbn] = useState(null);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false); 
  const [authorFilter, setAuthorFilter] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
    } catch (error) {
      console.error("Failed to save books to localStorage:", error);
    }
  }, [books]);

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

  const handleFilterChange = (e) => {
      setAuthorFilter(e.target.value);
      setSelectedBookIsbn(null);
  };
  
  // 📚 UPDATED LOGIC: Filter out any empty author strings
  const uniqueAuthors = useMemo(() => {
    // 1. Map all author names
    const allAuthors = books.map(book => book.author);
    // 2. Use a Set to get unique names
    const authorSet = new Set(allAuthors);
    // 3. Convert Set to Array, filter out empty/null/undefined authors, and sort
    return [...authorSet]
      .filter(author => author && author.trim() !== "")
      .sort((a, b) => a.localeCompare(b));
  }, [books]);

  const filteredBooks = books.filter(book => {
      if (authorFilter === "") {
          return true;
      }
      return book.author === authorFilter;
  });
  
  const selectedBook = books.find(book => book.isbn13 === selectedBookIsbn);
  
  const handleEditClick = () => {
    if (selectedBook) {
      setIsEditingModalOpen(true);
    }
  };

  return (
    <div className="booklist-layout">

      <div>

      </div>
      
        <AuthorFilter 
            uniqueAuthors={uniqueAuthors}
            authorFilter={authorFilter}
            onFilterChange={handleFilterChange}
        />
      <div className="controls-panel">
    
=        <NewCard 
            addBook={handleAddBook} 
        />

=        <div className="action-buttons">
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
              
          {filteredBooks.map((book) => (
              <BookCard
                  key={book.isbn13}
                  {...book}
                  selected={book.isbn13 === selectedBookIsbn}
                  onSelect={() => handleSelect(book.isbn13)}
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
  );
};

export default BookList;