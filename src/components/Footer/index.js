import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <nav className="footer-nav">
    <div className="flex-1">
      <div>
        <FaGoogle className="footer-icon" />
        <FaTwitter className="footer-icon" />
        <FaInstagram className="footer-icon" />
        <FaYoutube className="footer-icon" />
      </div>
      <p className="contact-us">Contact Us</p>
    </div>
  </nav>
)

export default Footer
