import React, { useState } from "react";

export default function Talktosaleform() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sucessmsg, Setsucessmsg] = useState("");

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
        Setsucessmsg("Thank you for Submitting");
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
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
        data-bs-toggle="modal"
        data-bs-target="#talkToSalesModal"
      >
        Talk to Representative
      </button>
      <div
        className="modal fade"
        id="talkToSalesModal"
        tabIndex="-1"
        aria-labelledby="talkToSalesModalLabel"
        aria-hidden="true"
        style={{ top: "15%" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-black"
                id="talkToSalesModalLabel"
              >
                Talk to Representative
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-black font-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black font-semibold">Message</label>
                  <textarea
                    name="message"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-400 to-green-400 text-black py-2 px-4 rounded-md hover:from-teal-500 hover:to-green-500 transition"
                >
                  Send
                </button>
                <p className="mt-4 text-green-500 text-center">{sucessmsg}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
