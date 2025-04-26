import { ClientLoaderFunctionArgs } from "@remix-run/react";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  return {};
}

export function HydrateFallback() {
  return <p>Loading about us page...</p>;
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <p className="text-lg mb-6" style={{ fontFamily: 'Bodoni, serif' }}>
          PUZO is a Copenhagen-based clothing brand focused on craftsmanship, fit, and longevity. We create unisex pieces that feel effortless yet refined, designed to integrate seamlessly into any wardrobe.
        </p>
        <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
          Rooted in a commitment to quality, our approach balances precision with ease, ensuring every garment is thoughtfully constructed and made to last. Timeless in design and versatile in wear, PUZO is built for those who appreciate understated elegance and attention to detail.
        </p>
      </div>
    </div>
  );
} 