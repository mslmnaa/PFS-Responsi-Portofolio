import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

function ContactSection({ isDarkMode }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Function to handle scroll and navigation to contact section
  useEffect(() => {
    const handleScrollToContact = () => {
      // Check if there's a hash in the URL
      const hash = window.location.hash;
      if (hash === "#contact") {
        // Scroll to the contact section with smooth behavior
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        
        // Trigger visibility animation
        setIsVisible(true);
        
        // Optional: Add a slight delay to ensure full visibility
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
      }
    };

    // Check on initial load
    handleScrollToContact();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleScrollToContact);

    // Cleanup event listener
    return () => {
      window.removeEventListener('hashchange', handleScrollToContact);
    };
  }, []);

  // Scroll animation effect with intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1 // Trigger when 10% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ show: false, type: "", message: "" });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required!");
      showAlert("danger", "Name is required!");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required!");
      showAlert("danger", "Email is required!");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Message is required!");
      showAlert("danger", "Message is required!");
      return;
    }

    setFormData({ name: "", email: "", message: "" });
    toast.success("Your message has been sent!");
    showAlert("success", "Your message has been sent successfully!");
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className={`min-h-screen py-20 mt-0 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} 
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
      transition-all duration-700 ease-out`}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto ">
        <h2 className={`text-3xl font-bold text-center mb-4 
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
          transition-all duration-700 delay-200 ease-out`}
        >
          Get in Touch
        </h2>
        <p className={`text-center text-lg mb-8 
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
          transition-all duration-700 delay-300 ease-out`}
        >
          Feel free to drop a message.
        </p>

        {alert.show && (
          <div className={`max-w-2xl mx-auto mb-4 p-4 rounded-lg ${
            alert.type === "success" 
              ? "bg-green-100 border border-green-400 text-green-700" 
              : "bg-red-100 border border-red-400 text-red-700"
          }`} role="alert">
            <div className="flex">
              <div className="py-1">
                <svg className={`fill-current h-6 w-6 ${
                  alert.type === "success" ? "text-green-500" : "text-red-500"
                } mr-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  {alert.type === "success" ? (
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"/>
                  ) : (
                    <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
                  )}
                </svg>
              </div>
              <div>
                <p className="font-bold">{alert.type === "success" ? "Success!" : "Error!"}</p>
                <p className="text-sm">{alert.message}</p>
              </div>
            </div>
          </div>
        )}

        <div
          className={`max-w-2xl mx-auto p-6 rounded-lg shadow-md ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
          } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-700 delay-500 ease-out`}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600 text-white focus:ring-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500"
                }`}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600 text-white focus:ring-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500"
                }`}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600 text-white focus:ring-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500"
                }`}
              ></textarea>
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg hover:bg-blue-600 transition-all ${
                isDarkMode ? "bg-blue-500 text-white" : "bg-blue-500 text-white"
              }`}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;