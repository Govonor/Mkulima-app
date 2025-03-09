import React from 'react';

const About: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>About Ask Mkulima</h1>

      <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
        <p>
          Ask Mkulima is a platform dedicated to connecting small-scale farmers in Kenya with small businesses, creating a more efficient and equitable agricultural supply chain.
        </p>

        <p>
          Our mission is to empower farmers by providing them with direct access to markets and fair pricing, while also ensuring that businesses can source fresh, high-quality produce reliably.
        </p>

        <p>
          We believe in leveraging technology to bridge the gap between farmers and businesses, fostering economic growth, enhancing food security, and promoting sustainable agriculture.
        </p>

        <h2 style={{ marginTop: '30px', color: '#333' }}>Our Vision</h2>
        <p>
          To be the leading digital platform that transforms the agricultural landscape in Kenya, creating a thriving ecosystem for farmers and businesses alike.
        </p>

        <h2 style={{ marginTop: '30px', color: '#333' }}>Our Values</h2>
        <ul>
          <li><strong>Empowerment:</strong> We believe in empowering farmers and businesses to achieve their full potential.</li>
          <li><strong>Transparency:</strong> We are committed to fostering a transparent and trustworthy marketplace.</li>
          <li><strong>Efficiency:</strong> We strive to create an efficient and streamlined supply chain.</li>
          <li><strong>Sustainability:</strong> We promote sustainable agricultural practices that benefit both people and the planet.</li>
          <li><strong>Community:</strong> We believe in building a strong and supportive community of farmers and businesses.</li>
        </ul>

        <h2 style={{ marginTop: '30px', color: '#333' }}>Contact Us</h2>
        <p>
          If you have any questions or feedback, please feel free to <a href="/contact" style={{ color: '#007bff', textDecoration: 'none' }}>contact us</a>.
        </p>
      </div>
    </div>
  );
};

export default About;