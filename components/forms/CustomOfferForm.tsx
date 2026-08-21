'use client';

import React, { useState } from 'react';

const PACKAGES = [
  { id: 'tier_1', name: 'Starter Package', description: 'Basic access to the core product.', price: '' },
  { id: 'tier_2', name: 'Pro Package', description: 'Core product + Q&A support.', price: '' },
  { id: 'tier_3', name: 'Done-For-You', description: 'We set everything up for you.', price: '' },
  { id: 'tier_4', name: 'VIP Consulting', description: 'Full setup + 1-on-1 strategy sessions.', price: '' },
];

export default function CustomOfferForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    selectedPackage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with your actual GoHighLevel Webhook URL
      const GHL_WEBHOOK_URL = 'YOUR_GHL_WEBHOOK_URL_HERE'; 
      
      /*
      // Uncomment this when you add your webhook URL
      await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      */

      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      // Optional: Redirect to a thank you page
      // window.location.href = '/thank-you';
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 text-center bg-green-50 rounded-xl border border-green-200">
        <h3 className="text-2xl font-bold text-green-700 mb-2">Thank you!</h3>
        <p className="text-green-600">Your request has been received. Please check your WhatsApp for the free resource and pricing details!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Select Your Custom Plan</h2>
      
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            type="text" 
            name="name"
            required 
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            name="email"
            required 
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
          <input 
            type="tel" 
            name="whatsapp"
            required 
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="+1234567890"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Your Package</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {PACKAGES.map((pkg) => (
          <label 
            key={pkg.id} 
            className="relative flex flex-col p-4 border rounded-xl cursor-pointer transition-all"
          >
            <input 
              type="radio" 
              name="selectedPackage" 
              value={pkg.id}
              required
              checked={formData.selectedPackage === pkg.id}
              onChange={handleChange}
              className="sr-only"
            />
            <span className="font-bold text-gray-900">{pkg.name}</span>
            <span className="text-sm text-gray-500 mt-1 mb-2">{pkg.description}</span>
            <span className="font-semibold text-blue-600 mt-auto">{pkg.price}</span>
          </label>
        ))}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-70"
      >
        {isSubmitting ? 'Submitting...' : 'Get Instant Access'}
      </button>
    </form>
  );
}