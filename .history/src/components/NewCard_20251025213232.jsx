// import { useState } from "react";
// import "../index.css";
// import BookForm from "./BookForm.jsx"

// function NewCard({ addBook, updateBook, selectedBook }) { 
    
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     function openModal() {
//         setIsModalOpen(true);
//     }
    
//     function closeModal() {
//         setIsModalOpen(false);
//     }

//     const handleFormSubmit = (data) => {
//         addBook(data);
//         closeModal();
//     }

//     return(
//         <>
//             <div className="new-card" onClick={openModal}>
//                 <span>New</span>
//             </div>
            
//             {isModalOpen && (
//                 <BookForm 
//                     onSubmit={handleFormSubmit}
//                     initialData={null}
//                     isEditing={false}
//                     closeModal={closeModal}
//                 />
//             )}
//         </>
//     )
// }

// export default NewCard;

import { useState } from "react";
import "../index.css"; // Adjusted import path for CSS
import BookForm from "./BookForm.jsx"

// Only needs addBook prop
function NewCard({ addBook }) { 
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }
    
    function closeModal() {
        setIsModalOpen(false);
    }

    const handleFormSubmit = (data) => {
        addBook(data);
        // closeModal is now handled inside BookForm on successful submit
    }

    return(
        <>
            <div className="new-card" onClick={openModal}>
                <span>New</span>
            </div>
            
            {isModalOpen && (
                <BookForm 
                    onSubmit={handleFormSubmit}
                    initialData={null} // Explicitly null for adding a new book
                    isEditing={false} // Explicitly false for adding a new book
                    closeModal={closeModal} // Pass function to close modal
                />
            )}
        </>
    )
}

export default NewCard;