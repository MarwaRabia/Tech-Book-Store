import "./SCSS/contact.scss";
import toast, { Toaster } from "react-hot-toast";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Your message has been sent!", {
      duration: 4000, // 4 seconds
      position: "top-center",
    });
    e.target.reset();
  };

  return (
    <div className="contacts-page">
      <Toaster />
      <div className="contact-page">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" name="subject" placeholder="Subject" />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
        </form>

        <div className="contact-info">
          <p>Email: contact@domain.com</p>
          <p>Phone: +20 123 456 7890</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
