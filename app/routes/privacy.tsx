import { CustomClientOnly } from '~/components/CustomClientOnly';
import PrivacyPage from './privacy.client';

export default function PrivacyRoute() {
  return (
    <CustomClientOnly fallback={<div>Loading...</div>}>
      {() => <PrivacyPage />}
    </CustomClientOnly>
  );
} 