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
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-6" style={{ fontFamily: 'Bodoni, serif' }}>Privacy Policy</h1>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>1. Information We Collect</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            We collect information that you provide directly to us, including your name, email address, postal address, phone number, 
            and payment information when you make a purchase or create an account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>2. How We Use Your Information</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            We use the information we collect to process your orders, communicate with you about your orders, send you marketing communications, 
            and improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>3. Information Sharing</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            We do not sell or rent your personal information to third parties. We may share your information with service providers who assist 
            us in operating our website, conducting our business, or servicing you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>4. Your Rights</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            You have the right to access, correct, or delete your personal information. You may also opt out of receiving marketing communications 
            from us at any time.
          </p>
        </section>
      </div>
    </div>
  );
} 