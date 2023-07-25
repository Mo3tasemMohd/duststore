import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "../css/footer.css";
import React from "react";

export function Footer() {
  return (
    <div className="footer-container">
      <hr />

      <footer className="footer ">
        <div className="container">
          <div className="row ">
            <div className="col-md-6 col-lg-4">
              <h4 className="pb-2">About DustStore</h4>
              <p>
                DustStore Menswear is a brick and mortar clothing store that
                offers a wide range of trendy and affordable clothing items for
                men.
              </p>
            </div>
            <div className="col-md-6 col-lg-4">
              <h4 className="pb-2">Contact Us</h4>
              <ul className="contact-list">
                <li>
                  <i className="fas fa-map-marker-alt"></i> 22 Abd El-Moneim
                  Sanad, Madinet Al Eelam, Al Agouzah, Giza Governorate Giza,
                  Giza Governorate, Egypt 12611
                </li>
                <li>
                  <i className="fas fa-phone"></i>(+20) 0109 606 4808
                </li>
                <li>
                  <i className="fas fa-envelope"></i>info@duststore.com
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-4">
              <h4 className="pb-2">Follow Us</h4>
              <ul className="social-list">
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
          <hr />

          <div className="row pt-2">
            <div className="col-12">
              <p className="text-center">
                &copy; 2023 DustStore. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
