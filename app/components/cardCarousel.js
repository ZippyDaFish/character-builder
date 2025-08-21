'use client';

import { useState } from 'react';
import styles from "../styles/cardCarousel.css";

const cards = [
  {
    title: "Update 1.2 Released",
    content: "We've added new features and fixed several bugs to improve performance.",
  },
  {
    title: "Upcoming Event",
    content: "Join us next week for a live Q&A session with the development team.",
  },
  {
    title: "Welcome to Our App",
    content: "This is a brief introduction for guest users. Sign up to unlock the full experience.",
  },
];

export default function CardCarousel() {
  const [index, setIndex] = useState(0);

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="carousel-container">
      <div className="content-container">
        <h2>{cards[index].title}</h2>
        <p>{cards[index].content}</p>
      </div>
      <div className="buttons-container">
        <button onClick={prevCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
      </div>
    </div>
  );
}
