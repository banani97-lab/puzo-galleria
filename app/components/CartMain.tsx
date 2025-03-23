import { useOptimisticCart } from '@shopify/hydrogen';
import { Link } from '@remix-run/react';
import type { CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { CartLineItem } from '~/components/CartLineItem';
import { CartSummary } from './CartSummary';
import { useState } from 'react';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({ layout, cart: originalCart }: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity && cart?.totalQuantity > 0;

  return (
    <div className="cart-main flex flex-col h-full">
      <div className="cart-content flex-grow overflow-y-auto">
        <CartEmpty hidden={linesCount} layout={layout} />
        <div className="cart-details">
          <div aria-labelledby="cart-lines">
            <ul>
              {(cart?.lines?.nodes ?? []).map((line) => (
                <CartLineItem key={line.id} line={line} layout={layout} />
              ))}
            </ul>
          </div>
          {cartHasItems && <CartSummary cart={cart} layout={layout} />}
        </div>
      </div>
  
      {/* Drawer always at the bottom */}
      <CartDrawer />
    </div>
  );
  
}

function CartEmpty({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const { close } = useAside();
  return (
    <div hidden={hidden} className="flex flex-col items-center text-center">
      <br />

      {/* Centered Image */}
      <div className="flex justify-center w-full">
        <img
          src="public/assets/EmptyState.png"
          style={{
            maxWidth: '50%',
            height: 'auto',
          }}
          alt="Empty Cart"
        />
      </div>
      {/* Empty Cart Message */}
      <p style={{ fontFamily: 'Bodoni', textAlign: 'center', padding: "1rem" }}>
        You have no items in your basket
      </p>
      <br />
    </div>
  );
}

function CartDrawer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="cart-drawer p-3 mt-6 border-t fixed bottom-0 border-gray-300">
      {[
        {
          title: 'Delivery Estimate',
          content: (
            <>
              Denmark: 1-2 Business Days
              <br />
              Rest of Europe: 2-7 Business Days
            </>
          ),
        },
        {
          title: 'Returns',
          content: (
            <>
              Denmark: 1-2 Business Days
              <br />
              EU: 2-7 Business Days
            </>
          ),
        },
        {
          title: 'Contact Us',
          content: 'Feel free to contact us at contact@puzo.com',
        },
      ].map(({ title, content }) => (
        <div key={title} className="mb-4 border-b border-gray-300 pb-2">
          <button
          style={{ fontFamily: "Bodoni"}}
            className="flex justify-between items-center w-full text-left p-2 font-semibold"
            onClick={() => toggleSection(title)}
          >
            {title}
            <img
              src="public/assets/plus.png"
              alt="Toggle"
              className={`w-5 h-5 transition-transform duration-300 ${expandedSection === title ? 'rotate-45' : 'rotate-0'
                }`}
            />
          </button>
          <div className={`overflow-hidden transition-max-h duration-300 ${expandedSection === title ? 'max-h-40' : 'max-h-0'}`}>
            <p style={{ fontFamily: "Bodoni"}} className="p-3 text-gray-700">{content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
