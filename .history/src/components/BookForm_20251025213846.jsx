// import { useState, useEffect } from "react";
// import "../index.css";

// function BookForm({ onSubmit, initialData, isEditing, closeModal }) {
    
//     const defaultFormState = {
//         title: "", 
//         author: "", 
//         publisher: "", 
//         publication_year: "", 
//         language: "", 
//         pages: "", 
//         image: "", 
//         isbn13: Math.random().toString(36).substring(2, 15)
//     };

//     const [formData, setFormData] = useState(defaultFormState);

//     useEffect(() => {
//         setFormData({ 
//             ...defaultFormState, 
//             isbn13: Math.random().toString(36).substring(2, 15)
//         }); 
//     }, [initialData, isEditing]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevData => ({ ...prevData, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(formData);
//     };
    
//     return(
//         <div className="modal-container" onClick={(e) => {
//             if (e.target.className === 'modal-container') closeModal();
//         }}>
            
//             <div className="modal-form">
//                 <h2>Add Book</h2> 
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-control">
//                         <label>Book Title:</label>
//                         <input name="title" type="text" value={formData.title} onChange={handleChange} placeholder="Book Title..."></input>
//                     </div>
//                     <div className="form-control">
//                         <label>Author:</label>
//                         <input name="author" type="text" value={formData.author} onChange={handleChange} placeholder="Author"></input>
//                     </div>
//                     <div className="form-control">
//                         <label>Publisher:</label>
//                         <input name="publisher" type="text" value={formData.publisher} onChange={handleChange} placeholder="Publisher"></input>
//                     </div>
//                     <div className="form-control">
//                         <label>Publication Year:</label>
//                         <input name="publication_year" type="number" value={formData.publication_year} onChange={handleChange} placeholder=" "></input>
//                     </div>
//                     <div className="form-control">
//                         <label>Language:</label>
//                         <input name="language" type="text" value={formData.language} onChange={handleChange} placeholder="Language"></input>
//                     </div>
//                     <div className="form-control">
//                         <label>Pages:</label>
//                         <input name="pages" type="number" value={formData.pages} onChange={handleChange} placeholder=" "></input>
//                     </div>
//                     <div className="form-control">
//                         <label>Cover URL:</label>
//                         <input name="image" type="text" value={formData.image} onChange={handleChange} placeholder=" "></input>
//                     </div>
                    
//                     <button className="modal-form" type="submit">Save</button>
                    
//                 </form>
//             </div>
//         </div>
//     )
// }
    
// export default BookForm;

import React, { useState } from "react";
import BookCard from "./BookCard";
import NewCard from "./NewCard";
import BookForm from "./BookForm"; 
import "../index.css"; 

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [isEditingModalOpen, setIsEditingModalOpen] = useState(false); 

    const handleSelect = (id) => {
        setSelectedBookId(prevId => (prevId === id ? null : id));
    };
    
    const handleAddBook = (newBook) => {
        const bookWithId = { 
            ...newBook, 
            id: Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
        };
        setBooks(prevBooks => [...prevBooks, bookWithId]);
    };
    
    const handleDelete = () => {
        if (!selectedBookId) return;
        
        setBooks(prevBooks => prevBooks.filter((book) => book.id !== selectedBookId));
        setSelectedBookId(null);
    };
    
    const handleUpdate = (updatedBook) => {
        setBooks(prevBooks =>
        prevBooks.map(book => 
            book.id === updatedBook.id ? { ...book, ...updatedBook } : book
        )
        );
        setSelectedBookId(null);
        setIsEditingModalOpen(false);
    };
    
    const selectedBook = books.find(book => book.id === selectedBookId);
    
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
                onClick={handleEditClick} 
                disabled={!selectedBookId}
                className="update-btn"
            >
                Edit
            </button>

            <button 
                onClick={handleDelete} 
                disabled={!selectedBookId}
                className="delete-btn"
            >
                Delete
            </button>
        </div>
        </div>
        
        <div className="books-grid">
        {books.map((book) => (
            <BookCard
            key={book.id}
            {...book}
            selected={book.id === selectedBookId}
            onSelect={() => handleSelect(book.id)}
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