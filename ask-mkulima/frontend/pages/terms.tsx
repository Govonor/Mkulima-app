// frontend/pages/terms.tsx
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Terms of Service</h1>

      <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
        <p>
          Welcome to Ask Mkulima! By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>

        <h2 style={{ marginTop: '30px', color: '#333' }}>1. Acceptance of Terms</h2>
        <p>
          By using Ask Mkulima, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our platform.
        </p>

        <h2 style={{ marginTop: '30px', color: '#333' }}>2. Use of the Platform</h2>
        <p>
          Ask Mkulima provides a platform for connecting farmers and businesses. You agree to use the platform only for lawful purposes and in accordance with these terms.
        </p>

        <h2 style={{ marginTop: '30px', color: '#333' }}>3. User Accounts</h2>
        <p>
          To access certain features of the platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </p>

        <h2 style={{ marginTop: '30px', color: '#333' }}>4. Product Listings and Transactions</h2>
        <p>
          Farmers are responsible for the accuracy and legality of their product listings. Businesses are responsible for ensuring that their orders comply with applicable laws and regulations. Ask Mkulima is not responsible for any disputes between farmers and businesses.
        </p>

        <h2 style={{ marginTop: '30px', color: '#333' }}>5. Payment and Fees</h2>
        <p>
          Payment terms and fees will be specified on the platform. You agree to pay all fees and charges associated with your use of the platform.
        </p>

        <h2 style={{ marginTop: '30px', color: '#333' }}>6. Intellectual Property</h2>
        <p>
          All content and materials on the platform, including but not limited to text, graphics, logos, and software, are the property of Ask Mkulima or its licensors and are protected by intellectual property laws.
        </p>

        <h2 style={{ marginTop: '30px', color: '#333' }}>7. Limitation of Liability</h2>
        <p>
          Ask Mkulima shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the platform.
        </p>

        <h2 style={{ marginTop: '30px', color: '#333' }}>8. Changes to Terms</h2>
        <p>
          Ask Mkulima reserves the right to modify these Terms of Service at any time. We will notify you of any changes by posting the new terms on the platform. Your continued use of the platform after any changes constitutes your acceptance of the new terms.
        </p>

        <h2 style={{ marginTop: '30px', color: '#333' }}>9. Governing Law</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of Kenya.
        </p>

        <h2 style={{ marginTop: '30px', color: '#333' }}>10. Contact Us</h2>
        <p>
          If you have any questions or concerns about these Terms of Service, please <a href="/contact" style={{ color: '#007bff', textDecoration: 'none' }}>contact us</a>.
        </p>
      </div>
    </div>
  );
};

export default Terms;