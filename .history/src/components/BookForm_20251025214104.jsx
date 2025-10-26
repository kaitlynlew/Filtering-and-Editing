import { useState, useEffect } from "react";
import "../index.css";

function BookForm({ onSubmit, initialData, isEditing, closeModal }) {
    
    const defaultFormState = {
        title: "", 
        author: "", 
        publisher: "", 
        publication_year: "", 
        language: "", 
        pages: "", 
        image: "", 
        isbn13: "" 
    };

    const [formData, setFormData] = useState(defaultFormState);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ 
                ...defaultFormState, 
                isbn13: Math.random().toString(36).substring(2, 15)
            }); 
        }
    }, [initialData, isEditing]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.author || !formData.isbn13) {

        }
        onSubmit(formData);
        closeModal();
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