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
            <div>
                <video className='w-full' controls>
                    <source src={data.video?.sources[0].url} type='video/mp4' />
                    {/* <source src={data.video?.sources[1].url} type='application/x-mpegURL' /> */}
                    Your browser doesn't support video
                </video>
            </div>
            <div className="w-full flex flex-col md:flex-row pt-3">
                <div className="w-full md:w-1/2 flex items-center justify-center" style={{ color: 'white' }}>
                    <div className="w-full max-w-[500px] max-h-[500px] mx-auto px-4">
                        <Image
                            src={data.products.nodes[0].images.nodes[8]?.url}
                            aspectRatio="4/5"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
                <div className="w-full md:w-2/5 flex flex-col justify-center items-center text-white relative mx-auto mt-6 md:mt-0">
                    <div className="relative w-full flex justify-center">
                        <Image
                            src={data.products.nodes[0].images.nodes[0]?.url}
                            aspectRatio="4/5"
                            className="max-w-[75%] h-auto object-contain"
                        />

                        <Link to={`/products/${data.products.nodes[0].handle}`} style={{ fontFamily: 'bodoni' }} className="absolute bottom-10 px-6 py-2 font-semibold rounded-md shadow-md bg-[#62492C] !text-white hover:bg-[#503D25] transition">
                            Shop Now
                        </Link>
                    </div>

                    <h2 style={{ fontFamily: "Bodoni" }} className="mt-4 text-xl md:text-2xl font-bold text-center text-black">
                        {data.products.nodes[0].title}
                    </h2>

                    <p style={{ fontFamily: "Bodoni" }} className="mt-2 text-base md:text-lg text-black text-center">
                        {data.products.nodes[0].title}
                    </p>
                </div>
            </div>
            <div className='w-full hidden md:flex pt-4'>
                <div className='w-1/6 p-1 m-1'>
                    <Image src={data.products.nodes[0].images.nodes[4]?.url} aspectRatio="4/5" />
                </div>
                <div className='w-1/6 p-1 m-1'>
                    <Image src={data.products.nodes[0].images.nodes[6]?.url} aspectRatio="4/5" />
                </div>
                <div className='w-1/6 p-1 m-1'>
                    <Image src={data.products.nodes[0].images.nodes[7]?.url} aspectRatio="4/5" />
                </div>
                <div className='w-1/6 p-1 m-1'>
                    <Image src={data.products.nodes[0].images.nodes[5]?.url} aspectRatio="4/5" />
                </div>
                <div className='w-1/6 p-1 m-1'>
                    <Image src={data.products.nodes[0].images.nodes[3]?.url} aspectRatio="4/5" />
                </div>
                <div className='w-1/6 p-1 m-1'>
                    <Image src={data.products.nodes[0].images.nodes[2]?.url} aspectRatio="4/5" />
                </div>
            </div>
            <div className='w-full flex pt-4'>
                <div className="w-full flex flex-col md:flex-row pt-3">
                    <div className="w-full md:w-2/5 flex flex-col justify-center items-center text-white relative mx-auto">
                        <div className="relative w-full flex justify-center">
                            <Image
                                src={data.products.nodes[0].images.nodes[1]?.url}
                                aspectRatio="4/5"
                                className="max-w-[75%] h-auto object-contain"
                            />

                            <Link to={`/products/${data.products.nodes[0].handle}`} style={{ fontFamily: 'bodoni' }} className="absolute bottom-20 px-6 py-2 font-semibold rounded-md shadow-md bg-[#62492C] !text-white hover:bg-[#503D25] transition">
                                Shop Now
                            </Link>
                        </div>

                        <h2 style={{ fontFamily: "Bodoni" }} className="mt-4 text-xl md:text-2xl font-bold text-center text-black">
                            {data.products.nodes[0].title}
                        </h2>

                        <p style={{ fontFamily: "Bodoni" }} className="mt-2 text-base md:text-lg text-black text-center">
                            {data.products.nodes[0].title}
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 flex items-center justify-center mt-6 md:mt-0" style={{ color: 'white' }}>
                        <div className="w-full max-w-[500px] max-h-[500px] mx-auto px-4">
                            <Image
                                src={data.products.nodes[0].images.nodes[9]?.url}
                                aspectRatio="4/5"
                                className="w-full h-auto object-contain"
                            />
                        </div>
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
    handle
    priceRange {
        minVariantPrice {
            amount
            currencyCode
        }
    }
    images(first: 10) {
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
