"use client";

import "./home.css";
import React from "react";
import { Button } from "react-bootstrap";
import { ImageSlider } from "@/components/ImageSlider";

const shirtImagesContext = require.context(
  "/public/products/shirts",
  false,
  /\.(png|jpe?g|svg)$/
);
const shirtImageFilenames = shirtImagesContext.keys();
const shirtImages = shirtImageFilenames.map(
  (shirtImageFilenames) => shirtImagesContext(shirtImageFilenames)?.default?.src
);

console.log({ shirtImagesContext, shirtImageFilenames, shirtImages });

const tShirtImagesContext = require.context(
  "/public/products/t-shirts",
  false,
  /\.(png|jpe?g|svg)$/
);
const tShirtImageFilenames = tShirtImagesContext.keys();
const tShirtImages = tShirtImageFilenames.map(
  (tShirtImageFilenames) =>
    tShirtImagesContext(tShirtImageFilenames)?.default?.src
);

const troussersImagesContext = require.context(
  "/public/products/troussers",
  false,
  /\.(png|jpe?g|svg)$/
);
const troussersImageFilenames = troussersImagesContext.keys();
const troussersImages = troussersImageFilenames.map(
  (troussersImageFilenames) =>
    troussersImagesContext(troussersImageFilenames)?.default?.src
);

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="dashboard">
          <h1 className="title">Welcome to Dust Store</h1>
          <p className="stitle">Greatest Place For Your Elegance</p>

          <div className="my-4 d-flex flex-column  ">
            <a href="#NEVER-UNDERDRESSED">
              <Button variant="btn btn-outline-light mb-3 mb-md-0 me-md-3">
                Learn More
              </Button>
            </a>
          </div>
        </div>

        <div className="image-home">
          <img src="/logo.jpeg" alt="Dust" />
        </div>
      </div>

      <div className="featured-products">
        <div className="featured-products-title">
          <h1 className="featured">Featured Products</h1>
        </div>
        <div className="one-item-product">
          <ImageSlider images={shirtImages} />
        </div>
        <div className="two-items-product">
          <ImageSlider images={tShirtImages} />
        </div>
        <div className="two-items-product">
          <ImageSlider images={troussersImages} />
        </div>
      </div>
    </div>
  );
}
