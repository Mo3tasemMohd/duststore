"use client";


import React from "react";
import "./imageSlider.css";

const TiChevronLeftOutline = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 16 16"
  >
    <circle cx="8" cy="8" r="8" fill="white" />
    <path
      d="M11.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
      stroke="black"
      strokeWidth="1"
    />
  </svg>
);

const TiChevronRightOutline = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8" fill="white" />
  <path d="M4.5 8.5a.5.5 0 0 0 0 1H10.793l-1.646 1.646a.5.5 0 0 0 .708.708l2.646-2.646a.5.5 0 0 0 0-.708l-2.646-2.646a.5.5 0 0 0-.708.708L10.793 7.5H4.1z" stroke="black" strokeWidth="1" />
</svg>
);

const MAX_VISIBILITY = 2;

const Carousel = ({ children }) => {
  const [active, setActive] = React.useState(0);
  const count = React.Children.count(children);

  return (
    <div className="carousel">
      {active > 0 && (
        <button
          className="nav left left-chevron-button"
          onClick={() => setActive((i) => i - 1)}
        >
          <TiChevronLeftOutline />
        </button>
      )}
      {React.Children.map(children, (child, i) => (
        <div
          className="card-container"
          style={{
            // @ts-expect-error
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            pointerEvents: active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button
          className="nav right right-chevron-button"
          onClick={() => setActive((i) => i + 1)}
        >
          <TiChevronRightOutline />
        </button>
      )}
    </div>
  );
};

const Card = ({ image }) => (
  <div className="card-container">
    <img src={image} alt="Slide" className="card" />
  </div>
);

export function ImageSlider({ images }) {
  return (
    <Carousel>
      {images && images.map((image, i) => <Card image={image} key={i}></Card>)}
    </Carousel>
  );
}
