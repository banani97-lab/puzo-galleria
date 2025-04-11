import { CustomClientOnly } from '~/components/CustomClientOnly';
import TermsPage from './terms.client';

export default function TermsRoute() {
  return (
    <CustomClientOnly fallback={<div>Loading...</div>}>
      {() => <TermsPage />}
    </CustomClientOnly>
  );
} 