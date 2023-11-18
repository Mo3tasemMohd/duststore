"use client";

import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import "./footer.css";

export function Footer() {
  return (
    <div className="footer-container">
      <hr />

      <footer className="footer ">
        <div className="container">
          <div className="row ">
            <div className="col-md-6 col-lg-4 footer-section">
              <h4 className="pb-4 fs-4">ABOUT US</h4>
              <p className="slogan">
                Dust is a Menswear store where we provide our customers with the latest fashion trends. We believe that fashion should be inclusive and accessible to all. <br></br>Our rule is Never Underdressed, Never Goes Out Of Style.
              </p>
            </div>
{/*             <div className="col-md-6 col-lg-4 footer-section" >
              <h4 className="pb-4 fs-4">CONTACT US </h4>
              <ul className="contact-list">
                <li>
                  <i className="fas fa-map-marker-alt"></i> 22 Abd El-Moneim Sanad, Madinet Al Eelam, <br></br> Al Agouzah, Giza Governorate.
                </li>
                <li>
                  <i className="fas fa-phone"></i>010 9 606 4 808
                </li>
                <li>
                  <i className="fas fa-envelope"></i>info@duststore.com
                </li>
              </ul>
            </div> */}
            <div className="col-md-6 col-lg-4 footer-section">
              <h4 className="pb-4 fs-4">CONTACT US</h4>
              <ul className="social-list ">
                <li>
                  <a
                    href="https://www.facebook.com/DUSTmenswear/"
                    target="_blank"
                  >
                    
                    <FaFacebook />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/dust.menswear/"
                    target="_blank"
                  >
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="mt-2"/>

          <div className="row pt-2">
            <div className="col-12">
              <p className="text-center copyright">
                &copy; ALL COPYRIGHTS RESERVED FOR DUST TEAM 
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
