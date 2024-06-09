import React from 'react';

function Footer() {
  return (
    <footer className=" text-light p-4" style={{backgroundColor:"#13174b"}}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>About Us</h4>
            <p>Welcome to Blogify, where words come to life!At Blogify, we believe in the power of storytelling.</p>
          </div>
          <div className="col-md-4">
            <h4>Quick Links</h4>
            <ul className="list-unstyled" style={{color:"white"}}>
              <li><a href="/">Home</a></li>
              <li><a href="/">Articles</a></li>
              <li><a href="/">Categories</a></li>
              {/* Add more links as needed */}
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <p>Email: contact@example.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
        <div className="footer-bottom">
        <p>&copy; 2024 Blogify. All rights reserved.</p>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
