import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
        <p className="mb-4">Cookies are small text files that are placed on your device when you visit our website.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
        <p className="mb-4">We use cookies to:</p>
        <ul className="list-disc pl-8 mb-4">
          <li>Remember your preferences and settings</li>
          <li>Understand how you use our website</li>
          <li>Improve your user experience</li>
          <li>Provide personalized content and ads</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
        <ul className="list-disc pl-8 mb-4">
          <li>Essential cookies: Necessary for the website to function properly</li>
          <li>Performance cookies: Help us understand how visitors interact with our website</li>
          <li>Functionality cookies: Allow the website to remember choices you make</li>
          <li>Targeting cookies: Used to deliver ads more relevant to you and your interests</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
        <p className="mb-4">You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>
      </section>

      <p className="text-sm text-gray-600">Last updated: July 31, 2024</p>
    </div>
  );
};

export default CookiePolicy;