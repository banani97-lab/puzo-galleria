import { CustomClientOnly } from '~/components/CustomClientOnly';
import AboutUsPage from './about-us.client';

export default function AboutUsRoute() {
  return (
    <CustomClientOnly fallback={<div>Loading...</div>}>
      {() => <AboutUsPage />}
    </CustomClientOnly>
  );
} 