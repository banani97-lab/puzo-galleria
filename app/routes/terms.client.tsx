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
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>1. General Terms</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>2. Use License</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            Permission is granted to temporarily download one copy of the materials (information or software) on PUZO's website for personal, 
            non-commercial transitory viewing only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>3. Disclaimer</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            The materials on PUZO's website are provided on an 'as is' basis. PUZO makes no warranties, expressed or implied, 
            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions 
            of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bodoni, serif' }}>4. Limitations</h2>
          <p className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>
            In no event shall PUZO or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
            or due to business interruption) arising out of the use or inability to use the materials on PUZO's website.
          </p>
        </section>
      </div>
    </div>
  );
} 