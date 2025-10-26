import React from "react";
import "../index.css";

function BookCard({ title, author, image, selected, onSelect }) {
  const handleCardClick = () => {
    onSelect();
  };

  return (
    <div 
      className={`book-card ${selected ? 'selected' : ''}`}
      onClick={handleCardClick}
    >
      <img src={image} alt={title} className="book-image"/>
      <h3>{title}</h3>
      <p>{author && `By: ${author}`}</p>
    </div>
  );
}

export default BookCard;