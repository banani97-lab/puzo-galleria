import { CustomClientOnly } from '~/components/CustomClientOnly';
import FAQPage from './faq.client';

export default function FAQRoute() {
  return (
    <CustomClientOnly fallback={<div>Loading...</div>}>
      {() => <FAQPage />}
    </CustomClientOnly>
  );
} 