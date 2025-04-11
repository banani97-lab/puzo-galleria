import { CustomClientOnly } from '~/components/CustomClientOnly';
import ReturnsPage from './returns.client';

export default function ReturnsRoute() {
  return (
    <CustomClientOnly fallback={<div>Loading...</div>}>
      {() => <ReturnsPage />}
    </CustomClientOnly>
  );
} 