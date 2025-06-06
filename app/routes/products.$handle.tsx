import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
  Image,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductForm} from '~/components/ProductForm';
import { useState } from 'react';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: `${data?.product.title ?? ''}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: LoaderFunctionArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();
  console.log(product);
  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {title, description, images} = product;

  return (
    <div className="product flex flex-col md:flex-row gap-8 px-4 md:px-8">
      <div className="w-full md:w-1/2">
        <div className="h-[600px] overflow-y-auto hidden md:block">
          {images.nodes.map((image: any) => (
            <div key={image?.id} className="w-full mb-4">
              <Image 
                src={image?.url} 
                alt={image?.altText} 
                width={image?.width}
                height={image?.height}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
        {/* Mobile single image display */}
        <div className="block md:hidden mt-10">
          {images.nodes[0] && (
            <div className="w-full">
              <Image 
                src={images.nodes[0].url || ''} 
                alt={images.nodes[0].altText || ''} 
                width={800}
                height={800}
                className="w-full h-auto rounded"
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-full md:w-1/2 product-main">
        <h1 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: "Bodoni" }}>{title}</h1>
        <h3 className="text-lg mb-4" style={{ fontFamily: "Bodoni" }}>{description}</h3>
        <ProductPrice
          price={selectedVariant?.price}
          compareAtPrice={selectedVariant?.compareAtPrice}
        />
        <h5 className="mt-2" style={{ fontFamily: "Bodoni" }}>TAX INCLUDED</h5>
        <div className="mt-6">
          <ProductForm
            productOptions={productOptions}
            selectedVariant={selectedVariant}
          />
        </div>
        <div className="mt-8">
          <CartDrawer description={product.description} />
        </div>
      </div>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

type CartDrawerProps = {
  description: string
}

function CartDrawer({ description}: CartDrawerProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
      <div className="max-w-7xl mx-auto py-3">
        {[
          {
            title: 'Description'.toUpperCase(),
            content: (
              <div className="space-y-2">
                {description}
              </div>
            ),
          },
          {
            title: 'Delivery Estimate'.toUpperCase(),
            content: (
              <div className="space-y-2">
                <p>Denmark: 1-2 Business Days</p>
                <p>Rest of Europe: 2-7 Business Days</p>
              </div>
            ),
          },
          {
            title: 'Returns'.toUpperCase(),
            content: (
              <div className="space-y-2">
                <p>Denmark: 1-2 Business Days</p>
                <p>EU: 2-7 Business Days</p>
              </div>
            ),
          },
          {
            title: 'Contact Us'.toUpperCase(),
            content: 'Feel free to contact us at contact@puzo.com',
          },
        ].map(({ title, content }) => (
          <div key={title} className="border-b-2 border-gray-300 last:border-b-0">
            <button
              style={{ fontFamily: "Bodoni" }}
              className="flex justify-between items-center w-full text-left py-3 px-2 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleSection(title)}
            >
              <span className="text-lg">{title}</span>
              <img
                src="/assets/plus.png"
                alt="Toggle"
                className={`w-4 h-4 transition-transform duration-300 ${
                  expandedSection === title ? 'rotate-45' : 'rotate-0'
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSection === title ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-2 pb-3 text-gray-600" style={{ fontFamily: "Bodoni" }}>
                {content}
              </div>
            </div>
          </div>
        ))}
      </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    images(first: 20) {
      nodes {
        id
        url
        altText
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
