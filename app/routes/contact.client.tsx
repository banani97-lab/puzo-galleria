// app/routes/contact.client.tsx
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

// 1. Define a client-side loader (runs only in the browser)
export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  // (Optional) Fetch any data your contact page needs on the client.
  // For example, you could call a client-side API or read from localStorage.
  return {}; // Return data to be used by the component (if any)
}

// 2. (Optional) Provide an SSR fallback UI while the clientLoader runs
export function HydrateFallback() {
  return <p>Loading contact form...</p>;  // This will render during SSR
}

// 3. The route component (client-only)
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThankYou(true);
    // Redirect to home page after 3 seconds
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      {showThankYou ? (
        <div className="text-center py-12" style={{ fontFamily: 'Bodoni, serif' }}>
          <h2 className="text-3xl mb-6">Thank you for getting in touch with us!</h2>
          <p className="text-lg">We'll redirect you to the home page shortly...</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Contact Us</h1>
            <p className="text-sm max-w-2xl mx-auto" style={{ fontFamily: 'Bodoni, serif' }}>
              For any questions or inquiries related to your order or our products, please contact support@puzo.com. For anything
              related to wholesale, press, collaborations, etc. please contact angelo@lacdemure.com We will get back to you as soon
              as possible.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm" style={{ fontFamily: 'Bodoni, serif' }}>Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-sm"
                  style={{ fontFamily: 'Bodoni, serif' }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm" style={{ fontFamily: 'Bodoni, serif' }}>Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-sm"
                  style={{ fontFamily: 'Bodoni, serif' }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm" style={{ fontFamily: 'Bodoni, serif' }}>Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-sm"
                style={{ fontFamily: 'Bodoni, serif' }}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="comment" className="block text-sm" style={{ fontFamily: 'Bodoni, serif' }}>Message</label>
              <textarea
                id="comment"
                name="comment"
                placeholder="Enter your message"
                value={formData.comment}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 h-32 rounded-sm"
                style={{ fontFamily: 'Bodoni, serif' }}
              />
            </div>
            
            <div className="text-center pt-4">
              <button
                type="submit"
                className="px-12 py-3 text-white text-lg tracking-wide"
                style={{
                  backgroundColor: '#62492C',
                  fontFamily: 'Bodoni, serif',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4a3721'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#62492C'}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
