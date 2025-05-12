import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { contactusAction } from "../../redux/actions/contactusAction";
import { toast } from "react-toastify";

const Contact = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    setIsSubmitting(true);
    dispatch(contactusAction(formData))
      .unwrap()
      .then((data) => {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Message failed to send!");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
     // Reset form
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600">Contact Us</h1>
        <p className="mt-4 text-gray-600 text-lg text-center">
          Have questions or need assistance? Get in touch with us!
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Your Name"
              required
              autoComplete="name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Your Email"
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full p-2 rounded transition ${
              (!isFormValid || isSubmitting)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
