"use client";

import React from "react";
import "./imageSlider.css";

const TiChevronLeftOutline = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="currentColor"
    className="bi bi-arrow-left-circle-fill"
    viewBox="0 0 16 16"
  >
    <path
      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
      strokeWidth="3"
    />
  </svg>
);

const TiChevronRightOutline = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="currentColor"
    className="bi bi-arrow-right-circle-fill"
    viewBox="0 0 16 16"
    style={{ fontWeight: "bold", fontSize: "1.5rem" }}
  >
    <path
      d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
      strokeWidth="6"
    />
  </svg>
);

const MAX_VISIBILITY = 2;

const INTERVAL_TIME = 2500;

const Carousel = ({ children }) => {
  const [active, setActive] = React.useState(0);
  const count = React.Children.count(children);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  React.useEffect(() => {
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        setActive((active) => (active + 1) % count);
      }, INTERVAL_TIME);
    }
    return () => clearInterval(interval);
  }, [count, isHovered]);


  return (
    <div className="carousel" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
