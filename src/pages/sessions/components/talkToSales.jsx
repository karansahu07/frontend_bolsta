import React, { useState } from 'react';

export default function Talktosaleform() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sucessmsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://bolsta.nyraleadership.com/webcam-api/talk-to-sale-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSuccessMsg('Thank you for Submitting');
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full"
        onClick={() => document.getElementById('talkToSalesModal').classList.remove('hidden')}
      >
        Talk to Representative
      </button>

      {/* Modal */}
      <div
        id="talkToSalesModal"
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-24"
      >
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
          <div className="flex items-center justify-between border-b p-4">
            <h5 className="text-xl font-medium text-black" id="talkToSalesModalLabel">
              Talk to Representative
            </h5>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => document.getElementById('talkToSalesModal').classList.add('hidden')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-black text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="text-black py-2 px-4 rounded-md"
                style={{background: 'linear-gradient(90deg, rgb(58 220 255) 0%, rgba(92, 230, 172, 1) 100%)'}}
              >
                Send
              </button>
              <p className="mt-4 text-green-500 text-center">{sucessmsg}</p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}