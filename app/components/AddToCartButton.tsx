import {type FetcherWithComponents} from '@remix-run/react';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              fontFamily: 'Bodoni',
              border: '1px solid black', // Black rectangular border
              padding: '10px 20px', // Adjust padding for better appearance
              backgroundColor: 'transparent', // Keep background neutral
              cursor: 'pointer', // Change cursor on hover
              fontSize: '1rem', // Optional: Adjust font size
              transition: 'all 0.3s ease-in-out', // Smooth hover effect
            }}
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
}
