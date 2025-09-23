import "./SCSS/footer.scss";
import toast from "react-hot-toast";

function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Thank you for subscribing! 📚", {
      duration: 4000, // 4 seconds
      position: "top-center",
    });
    e.target.reset(); // Clear the form after submit
  };
  return (
    <footer className="footer-newsletter">
      <div className="newsletter-container">
        <h4>Subscribe to our Newsletter</h4>
        <p>Get the latest books and offers directly to your inbox.</p>
        {/* <Toaster/> */}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="footer-social">
        <p>Follow us:</p>
        <a href="#">
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-facebook-logo-icon-svg-download-png-1350125.png?f=webp&w=512"
            alt="Facebook"
          />
        </a>
        <a href="#">
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-twitter-logo-icon-svg-download-png-7651211.png?f=webp&w=512"
            alt="Twitter"
          />
        </a>
        <a href="#">
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-instagram-logo-icon-svg-download-png-721958.png?f=webp&w=512"
            alt="Instagram"
          />
        </a>
      </div>
      <div className="footer-bottom">
        <p>© 2025 TechBooks. All rights reserved. built by Marwa Rabia</p>
      </div>
    </footer>
  );
}

export default Footer;
