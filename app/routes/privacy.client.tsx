import { ClientLoaderFunctionArgs } from "@remix-run/react";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  return {};
}

export function HydrateFallback() {
  return <p>Loading privacy policy...</p>;
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-12">
        <h1 className="text-4xl mb-6" style={{ fontFamily: 'Bodoni, serif' }}>Privacy Policy</h1>
        <ul>
          <li className="text-lg mb-8" style={{ fontFamily: 'Bodoni, serif' }}>
            PUZO is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and make purchases. By using our website, you consent to the practices described in this policy.
          </li>
        </ul>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            <li>We may collect and process the following types of personal data:</li>
            <li>Personal Identifiable Information (PII): Name, email address, phone number, shipping/billing address.</li>
            <li>Payment Information: Processed securely by third-party payment providers (we do not store your payment details).</li>
            <li>Order & Transaction Data: Purchase history, shipping details, and customer support inquiries.</li>
            <li>Technical Data: IP address, browser type, device information, and cookies to improve website performance.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            <li>We use your information for the following purposes:</li>
            <li>To process and fulfill orders, including payments and shipping.</li>
            <li>To provide customer support and respond to inquiries.</li>
            <li>To improve our website and enhance user experience.</li>
            <li>To send transactional emails, such as order confirmations and shipping updates.</li>
            <li>To comply with legal and regulatory requirements.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Data Sharing and Third Parties</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            <li>We do not sell or rent personal data. However, we may share your data with:</li>
            <li>Payment processors (e.g., Shopify Payments, PayPal) for secure transactions.</li>
            <li>Shipping providers to fulfill and deliver your orders.</li>
            <li>Legal authorities when required by law.</li>
            <li>Analytics and marketing platforms (e.g., Google Analytics, Meta Ads) to improve our services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Cookies and Tracking Technologies</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            <li>We use cookies to enhance website functionality and analyze site traffic. You can manage cookie preferences in your browser settings.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Data Security</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            <li>We implement security measures to protect your personal data from unauthorised access, loss, or disclosure. However, no system is 100% secure, and we cannot guarantee absolute security.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Your Rights</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            <li>Depending on your location, you may have rights to:</li>
            <li>Access your data and request a copy of the information we hold about you.</li>
            <li>Request corrections to inaccurate or incomplete data.</li>
            <li>Request deletion of your personal data, subject to legal obligations.</li>
            <li>Withdraw consent for marketing communications at any time.</li>
          </ul>
          <p className="text-lg mt-4" style={{ fontFamily: 'Bodoni, serif' }}>
            To exercise your rights, please contact us at <a href="mailto:contact@puzo.dk" className="underline">contact@puzo.dk</a>.
          </p>
        </section>

        <section>
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>International Data Transfers</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            <li>As we operate within the EU, your data is processed in compliance with the General Data Protection Regulation (GDPR). If you are outside the EU, your data may be transferred and processed in accordance with applicable laws.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Changes to This Policy</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            <li>We reserve the right to update this Privacy Policy at any time. Changes will be posted with an updated effective date. For any privacy-related questions, please contact us at <a href="mailto:contact@puzo.dk" className="underline">contact@puzo.dk</a>.</li>
          </ul>
        </section>

        <section className="mt-12">
          <ul>
            <li className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>Thank you for trusting PUZO</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 