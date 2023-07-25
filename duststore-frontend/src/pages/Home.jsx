import React from "react";
import "../css/home.css";
import { Button, Form } from "react-bootstrap";
import { ImageSlider } from "../components/ImageSlider";
import { SliderData } from "../components/SliderData";

export function Home() {
  const imagesContext = require.context(
    "../../public/products/shirts",
    false,
    /\.(png|jpe?g|svg)$/
  );
  const imageFilenames = imagesContext.keys();
  const images = imageFilenames.map((filename) => imagesContext(filename));

  return (
    <div className="home-container">
      <div className="home-advertise">
        <div className="dashboard">
          <div>
            <h1>Welcome to Dust Store</h1>
            <p>Greatest Store For Your Elegance</p>

            <div className="my-4 d-flex flex-column flex-md-row align-items-center justify-content-md-start">
              <Button variant="btn btn-outline-light mb-3 mb-md-0 me-md-3">
                Learn More
              </Button>
              <Button variant="btn btn-light" >  Get Started</Button>            </div>
          </div>
        </div>

        <div className="image-home">
            <img src="dust.jpg" alt="Dust" />
        </div>
      </div>

      <div className="featured-products">
        <div className="featured-products-title">
          <h1>Featured Products</h1>
        </div>
        <div className="one-item-product">
          <ImageSlider images={images} />
        </div>
        <div className="two-items-product">
          <ImageSlider images={images} />
        </div>
        <div className="two-items-product">
          <ImageSlider images={images} />
        </div>

        {/* <ImageSlider slides={SliderData} /> */}
        {/* <ImageSlider images={images} /> */}
      </div>
    </div>
  );
}
