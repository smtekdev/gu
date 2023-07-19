import React from 'react';
import about from "./about.png"
import './style.css';

const AboutUsSection = () => {
  return (
    <section className="about-us-section">
      <div className="about-us-column red-column">
        <div className="red-box">
          <img src={about} alt="About Us" />
        </div>
      </div>
      <div className="about-us-column">
        <h2>About Us</h2>
        <div className="divider"></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis quam eget mauris consectetur, in consequat sem auctor. In id dolor velit. Nullam fringilla turpis nibh, nec pellentesque dui ultrices a. Sed nec viverra lacus.</p>
        <button>Learn More</button>
      </div>
    </section>
  );
};

export default AboutUsSection;