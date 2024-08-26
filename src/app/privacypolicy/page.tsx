import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">We collect information you provide directly to us, such as when you create an account, update your profile, or apply for jobs. This may include:</p>
        <ul className="list-disc pl-8 mb-4">
          <li>Name and contact information</li>
          <li>Resume and professional history</li>
          <li>Job preferences and search history</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-8 mb-4">
          <li>Provide and improve our services</li>
          <li>Match you with relevant job opportunities</li>
          <li>Communicate with you about our services</li>
          <li>Analyze usage patterns and trends</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
        <p className="mb-4">We may share your information with:</p>
        <ul className="list-disc pl-8 mb-4">
          <li>Employers when you apply for jobs</li>
          <li>Service providers who assist in our operations</li>
          <li>Legal authorities when required by law</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Your Rights and Choices</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-8 mb-4">
          <li>Access and update your personal information</li>
          <li>Opt-out of marketing communications</li>
          <li>Request deletion of your account</li>
        </ul>
      </section>

      <p className="text-sm text-gray-600">Last updated: July 31, 2024</p>
    </div>
  );
};

export default PrivacyPolicy;