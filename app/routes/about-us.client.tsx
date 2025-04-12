import { ClientLoaderFunctionArgs } from "@remix-run/react";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  return {};
}

export function HydrateFallback() {
  return <p>Loading about us page...</p>;
}

export default function AboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className=" mb-12">
        <h1 className="text-4xl mb-6 font-bold" style={{ fontFamily: 'Bodoni, serif' }}>About PUZO</h1>
        <p className="text-lg max-w-3xl mx-auto" style={{ fontFamily: 'Bodoni, serif' }}>
          PUZO is a luxury brand that redefines elegance through timeless design and exceptional craftsmanship.
        </p>
      </div>

      <div className="space-y-8 max-w-3xl mx-auto">
        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Our Story</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            Founded with a vision to create pieces that transcend trends, PUZO has become synonymous with sophistication and quality. 
            Each piece in our collection is meticulously crafted to embody the perfect balance of tradition and innovation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Our Craftsmanship</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            We take pride in our attention to detail and commitment to excellence. Every PUZO piece is crafted by skilled artisans 
            using the finest materials, ensuring that each creation is a testament to our dedication to quality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>Our Values</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            At PUZO, we believe in creating products that not only look beautiful but also stand the test of time. 
            Our commitment to sustainability and ethical practices is at the heart of everything we do.
          </p>
        </section>
      </div>
    </div>
  );
} 