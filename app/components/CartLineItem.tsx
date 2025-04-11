import type { CartLineUpdateInput } from '@shopify/hydrogen/storefront-api-types';
import type { CartLayout } from '~/components/CartMain';
import { CartForm, Image, type OptimisticCartLine } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { Link } from '@remix-run/react';
import { ProductPrice } from './ProductPrice';
import { useAside } from './Aside';
import type { CartApiQueryFragment } from 'storefrontapi.generated';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 */
export function CartLineItem({
  layout,
  line,
}: {
  layout: CartLayout;
  line: CartLine;
}) {
  const { id, merchandise } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const { close } = useAside();

  return (
    <li key={id} className="cart-line flex gap-4 p-4 border-b">
      {image && (
        <div className={`${layout === 'aside' ? 'w-48 h-60' : 'w-40 h-52'} flex-shrink-0`}>
          <Image
            alt={title}
            aspectRatio="4/5"
            data={image}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-col justify-between flex-grow">
        <div className="flex justify-between items-start">
          <Link
            style={{ fontFamily: 'Bodoni'}}
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                close();
              }
            }}
            className={`${layout === 'aside' ? 'text-lg' : 'text-base'} font-semibold hover:underline`}
          >
            {product.title}
          </Link>
          <CartLineRemoveButton lineIds={[id]} disabled={!!line.isOptimistic} />
        </div>

        <ProductPrice price={line?.cost?.totalAmount} />

        <ul className={`${layout === 'aside' ? 'text-base' : 'text-sm'} text-gray-600 mt-1`}>
          {selectedOptions.map((option) => (
            <li key={option.name}>
              {option.name}: {option.value}
            </li>
          ))}
          {/* Hardcoded color – consider making this dynamic later */}
          <li>Color: Brown</li>
        </ul>

        <div className="mt-2">
          <CartLineQuantity line={line} layout={layout} />
        </div>
      </div>
    </li>

  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 */
function CartLineQuantity({ line, layout }: { line: CartLine; layout: CartLayout }) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="cart-line-quantity flex items-center">
      <small className={`${layout === 'aside' ? 'text-base' : 'text-sm'} mr-2`}>Quantity: {quantity}</small>
      <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
        <button
          aria-label="Decrease quantity"
          disabled={quantity <= 1 || !!isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
          className={`${layout === 'aside' ? 'px-3 py-1.5' : 'px-2 py-1'} border rounded-l hover:bg-gray-100 disabled:opacity-50`}
        >
          <span>&#8722;</span>
        </button>
      </CartLineUpdateButton>
      <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
        <button
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
          disabled={!!isOptimistic}
          className={`${layout === 'aside' ? 'px-3 py-1.5' : 'px-2 py-1'} border rounded-r hover:bg-gray-100 disabled:opacity-50`}
        >
          <span>&#43;</span>
        </button>
      </CartLineUpdateButton>
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 */
function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds }}
    >
      <button 
        className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50" 
        disabled={disabled} 
        type="submit"
      >
        Remove
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      {children}
    </CartForm>
  );
}
