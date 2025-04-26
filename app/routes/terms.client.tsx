import { ClientLoaderFunctionArgs } from "@remix-run/react";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  return {};
}

export function HydrateFallback() {
  return <p>Loading terms and conditions...</p>;
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-6" style={{ fontFamily: 'Bodoni, serif' }}>Terms & Conditions</h1>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Welcome to PUZO</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            These Terms and Conditions govern your use of our website and the purchase of our products. By accessing this website and completing a transaction, you acknowledge and agree to the following terms and conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>General Information</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            PUZO is a registered business located in Copenhagen, Denmark. Our registered address for customer service and returns is:
            <br />
            Ingstrup Alle 28A, 2770 Tårnby, Denmark
            <br />
            For inquiries, please contact us at contact@puzo.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Product and Orders</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            All products available for purchase on PUZO are in-stock. We do not accept pre-orders.
            <br /><br />
            Customers may request a return within 14 days from the date of delivery.
            <br /><br />
            Returned products must be in new condition, unworn/unused, and in their original packaging with all tags attached.
            <br /><br />
            Customers are responsible for covering return shipping costs.
            <br /><br />
            To initiate a return, customers must contact our support team prior to returning any items.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Shipping and Delivery</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            We provide express shipping to all EU countries.
            <br /><br />
            For non-EU shipments, customers are responsible for shipping fees, as well as any customs duties or import taxes incurred upon arrival. PUZO is not liable for any delays resulting from customs procedures.
            <br /><br />
            Once an order has been shipped, PUZO assumes no responsibility for lost, stolen, or damaged packages. Customers are advised to contact the shipping provider directly in the event of any shipping issues.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Intellectual Property</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            All content on this website, including but not limited to designs, logos, images, and text, is the exclusive property of PUZO. Any unauthorised use, reproduction, or distribution of this content is strictly prohibited without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Payments and Pricing</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            PUZO accepts all Shopify-supported payment methods available in Denmark, including major credit cards and PayPal.
            <br /><br />
            All prices listed on our website are inclusive of applicable taxes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Limitation of Liability</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            PUZO shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our website or products.
            <br /><br />
            While we strive to ensure accurate product descriptions, PUZO does not guarantee that product representations on digital screens will be identical to the physical item due to variations in display settings and lighting conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Modifications to Terms</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            PUZO reserves the right to amend these Terms and Conditions at any time. Any modifications will be posted on this page with an updated effective date.
            <br /><br />
            By continuing to use our website and purchasing from PUZO, you agree to abide by these terms.
            <br /><br />
            For any inquiries, please contact us at contact@puzo.com
            <br /><br />
            Thank you for trusting PUZO.
          </p>
        </section>
      </div>
    </div>
  );
} 