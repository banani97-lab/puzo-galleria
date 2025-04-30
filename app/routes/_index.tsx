import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money, Video } from '@shopify/hydrogen';
import type {
    FeaturedCollectionFragment,
    RecommendedProductsQuery,
} from 'storefrontapi.generated';

export const meta: MetaFunction = () => {
    return [{ title: 'PUZO GALLERIA' }];
};

export async function loader(args: LoaderFunctionArgs) {
    // Start fetching non-critical data without blocking time to first byte
    const deferredData = loadDeferredData(args);

    // Await the critical data required to render initial state of the page
    const criticalData = await loadCriticalData(args);

    return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context }: LoaderFunctionArgs) {
    const [{ collections }, { products }, { node: video }] = await Promise.all([
        context.storefront.query(FEATURED_COLLECTION_QUERY),
        context.storefront.query(RECOMMENDED_PRODUCTS_QUERY),
        context.storefront.query(VIDEO_MEDIA_QUERY)
        // Add other queries here, so that they are loaded in parallel
    ]);


    return {
        featuredCollection: collections.nodes[0],
        products,
        video
    };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
    const recommendedProducts = context.storefront
        .query(RECOMMENDED_PRODUCTS_QUERY)
        .catch((error) => {
            // Log query errors, but don't throw them so the page can still render
            console.error(error);
            return null;
        });

    return {
        recommendedProducts,
    };
}

export default function Homepage() {
    const data = useLoaderData<typeof loader>();
    return (
        <div className="home">
            <div className="w-full">
                <video className='w-full' controls>
                    <source src={data.video?.sources[0].url} type='video/mp4' />
                    {/* <source src={data.video?.sources[1].url} type='application/x-mpegURL' /> */}
                    Your browser doesn't support video
                </video>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 flex items-center">
                    <div className="w-full">
                        <Image
                            src={data.products.nodes[0].images.nodes[13]?.url}
                            aspectRatio="3/4"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-white relative">
                    <div className="relative w-full max-w-[500px]">
                        <Image
                            src={data.products.nodes[0].images.nodes[0]?.url}
                            aspectRatio="4/5"
                            className="w-full h-auto object-contain"
                        />
                        <Link 
                            to={`/products/${data.products.nodes[0].handle}`} 
                            style={{ fontFamily: 'bodoni', color: 'white' }} 
                            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-2 font-semibold rounded-md shadow-md bg-[#62492C] text-white hover:bg-[#503D25] transition"
                        >
                            Shop Now
                        </Link>
                    </div>
                    <h2 style={{ fontFamily: "Bodoni" }} className="mt-4 text-xl md:text-2xl font-bold text-center text-black">
                        {data.products.nodes[0].title}
                    </h2>
                    <p style={{ fontFamily: "Bodoni" }} className="mt-2 text-base md:text-lg text-black text-center">
                        {data.products.nodes[0].description}
                    </p>
                </div>
            </div>
            <div className='w-full hidden md:grid grid-cols-6 gap-4 mt-8 mb-8'>
                {[14, 10, 13, 15, 11, 12].map((index) => (
                    <div key={index} className='w-full'>
                        <Image 
                            src={data.products.nodes[0].images.nodes[index]?.url} 
                            aspectRatio="4/5" 
                            className="w-full h-auto object-cover"
                        />
                    </div>
                ))}
            </div>
            <div className='w-full flex flex-col md:flex-row gap-8'>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-white relative order-2 md:order-1">
                    <div className="relative w-full max-w-[500px]">
                        <Image
                            src={data.products.nodes[0].images.nodes[1]?.url}
                            aspectRatio="4/5"
                            className="w-full h-auto object-contain"
                        />
                        <Link 
                            to={`/products/${data.products.nodes[0].handle}`} 
                            style={{ fontFamily: 'bodoni', color: 'white' }} 
                            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-2 font-semibold rounded-md shadow-md bg-[#62492C] text-white hover:bg-[#503D25] transition"
                        >
                            Shop Now
                        </Link>
                    </div>
                    <h2 style={{ fontFamily: "Bodoni" }} className="mt-4 text-xl md:text-2xl font-bold text-center text-black">
                        {data.products.nodes[0].title}
                    </h2>
                    <p style={{ fontFamily: "Bodoni" }} className="mt-2 text-base md:text-lg text-black text-center">
                        {data.products.nodes[0].description}
                    </p>
                </div>
                <div className="w-full md:w-1/2 flex items-center order-1 md:order-2 pr-0">
                    <div className="w-full">
                        <Image
                            src={data.products.nodes[0].images.nodes[9]?.url}
                            aspectRatio="4/5"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeaturedCollection({
    collection,
}: {
    collection: FeaturedCollectionFragment;
}) {
    if (!collection) return null;
    const image = collection?.image;
    return (
        <Link
            className="featured-collection"
            to={`/collections/${collection.handle}`}
        >
            {image && (
                <div className="featured-collection-image">
                    <Image data={image} sizes="100vw" />
                </div>
            )}
            <h1>{collection.title}</h1>
        </Link>
    );
}

function RecommendedProducts({
    products,
}: {
    products: Promise<RecommendedProductsQuery | null>;
}) {
    return (
        <div className="recommended-products">
            <h2>Recommended Products</h2>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={products}>
                    {(response) => (
                        <div className="recommended-products-grid">
                            {response
                                ? response.products.nodes.map((product) => (
                                    <Link
                                        key={product.id}
                                        className="recommended-product"
                                        to={`/products/${product.handle}`}
                                    >
                                        <Image
                                            data={product.images.nodes[0]}
                                            aspectRatio="4/5"
                                            sizes="(min-width: 45em) 20vw, 50vw"
                                        />
                                        <h4>{product.title}</h4>
                                        <small>
                                            <Money data={product.priceRange.minVariantPrice} />
                                        </small>
                                    </Link>
                                ))
                                : null}
                        </div>
                    )}
                </Await>
            </Suspense>
            <br />
        </div>
    );
}

const FEATURED_COLLECTION_QUERY = `#graphql
fragment FeaturedCollection on Collection {
    id
    title
    description
    image {
        id
        url
        altText
        width
        height
    }
    handle
}
query FeaturedCollection($country: CountryCode, $language: LanguageCode)
@inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
        nodes {
            ...FeaturedCollection
        }
    }
}
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
fragment RecommendedProduct on Product {
    id
    title
    description
    handle
    priceRange {
        minVariantPrice {
            amount
            currencyCode
        }
    }
    images(first: 20) {
        nodes {
            id
            url
            altText
            width
            height
        }
    }
}
query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
@inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
        nodes {
            ...RecommendedProduct
        }
    }
}
` as const;

const VIDEO_MEDIA_QUERY = `#graphql
query ProductVideo {
  node(id:"gid://shopify/Video/64729619333465") {
    ... on Video {
      alt
      id
      sources {
        width
        height
        mimeType
        format
        url
        __typename
      }
      presentation {
        id
      }
      previewImage {
        altText
        height
        width
        id
        url
      }
    }
  }
}
` as const;
