// import React from "react";
// import "../index.css";

// function BookCard({ title, author, image, selected, onSelect }) {
//   const handleCardClick = () => {
//     onSelect();
//   };

//   return (
//     <div 
//       className={`book-card ${selected ? 'selected' : ''}`}
//       onClick={handleCardClick}
//     >
//       <img src={image} alt={title} className="book-image"/>
//       <h3>{title}</h3>
//       <p>{author && `By: ${author}`}</p>
//     </div>
//   );
// }

// export default BookCard;

import React from "react";
import "../index.css";

// Add isLoaned prop
function BookCard({ title, author, image, selected, onSelect, isLoaned }) {
  const handleCardClick = () => {
    onSelect();
  };

  return (
    <div 
      // Add 'loaned' class when on loan
      className={`book-card ${selected ? 'selected' : ''} ${isLoaned ? 'loaned' : ''}`}
      onClick={handleCardClick}
    >
      {/* Indicator for loaned book */}
      {isLoaned && <div className="loan-badge">ON LOAN</div>}
      <img src={image} alt={title} className="book-image"/>
      <h3>{title}</h3>
      <p>{author && `By: ${author}`}</p>
    </div>
  );
}

export default BookCard;