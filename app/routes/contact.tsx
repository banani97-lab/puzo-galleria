// app/routes/contact.tsx
import { CustomClientOnly } from '~/components/CustomClientOnly';
import ContactPage from './contact.client';

export default function ContactRoute() {
  return (
    <CustomClientOnly fallback={<div>Loading...</div>}>
      {() => <ContactPage />}
    </CustomClientOnly>
  );
}