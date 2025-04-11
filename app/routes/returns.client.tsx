import { ClientLoaderFunctionArgs } from "@remix-run/react";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  return {};
}

export function HydrateFallback() {
  return <p>Loading returns policy...</p>;
}

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-6" style={{ fontFamily: 'Bodoni, serif' }}>Returns Policy</h1>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>1. Return Period</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            You have 14 days from the date of delivery to return your items for a full refund. Items must be in their original condition, 
            unworn, and with all tags attached.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>2. How to Return</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            To initiate a return, please contact our customer service team at support@puzo.com. We will provide you with a return shipping label 
            and instructions for sending your items back to us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>3. Refund Process</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            Once we receive your returned items, we will inspect them and process your refund within 5-7 business days. The refund will be issued 
            to your original payment method.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>4. Exchanges</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            We currently do not offer direct exchanges. If you would like a different size or color, please return your original purchase and 
            place a new order for the desired item.
          </p>
        </section>
      </div>
    </div>
  );
} 