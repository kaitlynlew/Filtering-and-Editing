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

import { useState, useEffect } from "react";
import "../index.css"; // Adjusted import path for CSS

function BookForm({ onSubmit, initialData, isEditing, closeModal }) {
    
    // Define the structure of a book, initialData will override these defaults
    const defaultFormState = {
        title: "", 
        author: "", 
        publisher: "", 
        publication_year: "", 
        language: "", 
        pages: "", 
        image: "", 
        // For new books, a placeholder ISBN is fine, but it will be overwritten in useEffect for new entries
        isbn13: "" 
    };

    const [formData, setFormData] = useState(defaultFormState);

    // This useEffect handles initializing the form data when the modal opens.
    useEffect(() => {
        if (initialData) {
            // Load existing data for editing
            setFormData(initialData);
        } else {
            // Reset to default state for adding a new book, ensuring a new unique ISBN13
            setFormData({ 
                ...defaultFormState, 
                isbn13: Math.random().toString(36).substring(2, 15) // Generate a new ID for new books
            }); 
        }
    }, [initialData, isEditing]); // Dependency on initialData and isEditing
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check for required fields before submitting
        if (!formData.title || !formData.author || !formData.isbn13) {
            console.error("Title, Author, and ISBN (ID) are required.");
            // In a real app, you'd show a user-friendly error message
            return;
        }
        onSubmit(formData);
        closeModal(); // Close the modal upon successful submission
    };
    
    const modalTitle = isEditing ? "Edit Book Details" : "Add New Book";

    return(
        <div className="modal-container" onClick={(e) => {
            // Close the modal if the backdrop is clicked
            if (e.target.className === 'modal-container') closeModal();
        }}>
            
            <div className="modal-form">
                <h2>{modalTitle}</h2> 
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label>Book Title:</label>
                        <input name="title" type="text" value={formData.title || ''} onChange={handleChange} placeholder="Book Title..." required></input>
                    </div>
                    <div className="form-control">
                        <label>Author:</label>
                        <input name="author" type="text" value={formData.author || ''} onChange={handleChange} placeholder="Author" required></input>
                    </div>
                    <div className="form-control">
                        <label>Publisher:</label>
                        <input name="publisher" type="text" value={formData.publisher || ''} onChange={handleChange} placeholder="Publisher"></input>
                    </div>
                    <div className="form-control">
                        <label>Publication Year:</label>
                        <input name="publication_year" type="number" value={formData.publication_year || ''} onChange={handleChange} placeholder=" "></input>
                    </div>
                    <div className="form-control">
                        <label>Language:</label>
                        <input name="language" type="text" value={formData.language || ''} onChange={handleChange} placeholder="Language"></input>
                    </div>
                    <div className="form-control">
                        <label>Pages:</label>
                        <input name="pages" type="number" value={formData.pages || ''} onChange={handleChange} placeholder=" "></input>
                    </div>
                    <div className="form-control">
                        <label>Cover URL:</label>
                        <input name="image" type="text" value={formData.image || ''} onChange={handleChange} placeholder=" "></input>
                    </div>
                    
                    <button className="modal-form" type="submit">
                        {isEditing ? "Update Details" : "Save Book"}
                    </button>
                    
                </form>
            </div>
        </div>
    )
}
    
export default BookForm;