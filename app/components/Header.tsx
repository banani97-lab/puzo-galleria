import { Suspense } from 'react';
import { Await, NavLink, useAsyncValue } from '@remix-run/react';
import {
    type CartViewPayload,
    useAnalytics,
    useOptimisticCart,
} from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Badge } from '@mui/material';

interface HeaderProps {
    header: HeaderQuery;
    cart: Promise<CartApiQueryFragment | null>;
    isLoggedIn: Promise<boolean>;
    publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
    header,
    isLoggedIn,
    cart,
    publicStoreDomain,
}: HeaderProps) {
    const { shop, menu } = header;
    return (
        <>
            <div style={{ height: '30px', fontFamily: 'Bodoni', fontWeight: 300}} className='w-full bg-[#62492C] text-white text-center text-sm py-1'>
                FREE SHIPPING EU
            </div>
            <header className="header">
                <HeaderMenu
                    menu={menu}
                    viewport="desktop"
                    primaryDomainUrl={header.shop.primaryDomain.url}
                    publicStoreDomain={publicStoreDomain}
                />
                <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/5 flex items-center">
                    <NavLink
                        prefetch="intent"
                        to="/"
                        className='flex-grow justify-center text-center'
                        style={activeLinkStyle}
                        end>
                        <strong style={{ fontSize: '2rem'}}>{shop.name.split(" ")[0].toLocaleUpperCase()}</strong>
                    </NavLink>
                </div>
                <HeaderCtas cart={cart} />
            </header>
        </>
    );
}

export function HeaderMenu({
    menu,
    primaryDomainUrl,
    viewport,
    publicStoreDomain,
}: {
    menu: HeaderProps['header']['menu'];
    primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
    viewport: Viewport;
    publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
    const className = `header-menu-${viewport}`;
    const { close } = useAside();

    return (
        <nav className={className} role="navigation">
            {(menu || FALLBACK_HEADER_MENU).items
                .map((item) => {
                if (!item.url) return null;

                // if the url is internal, we strip the domain
                const url =
                    item.url.includes('myshopify.com') ||
                        item.url.includes(publicStoreDomain) ||
                        item.url.includes(primaryDomainUrl)
                        ? new URL(item.url).pathname.replace(/^\/pages/, '')
                        : item.url;
                return (
                    <NavLink
                        className="header-menu-item text-md"
                        end
                        key={item.id}
                        onClick={close}
                        prefetch="intent"
                        style={headerLinkStyle}
                        to={url}
                    >
                        {item.title}
                    </NavLink>
                );
            })}
        </nav>
    );
}

function HeaderCtas({
    cart,
}: Pick<HeaderProps, 'cart'>) {
    return (
        <nav className="header-ctas" role="navigation">
            <HeaderMenuMobileToggle />
            <CartToggle cart={cart} />
        </nav>
    );
}

function HeaderMenuMobileToggle() {
    const { open } = useAside();
    return (
        <button
            className="header-menu-mobile-toggle reset"
            onClick={() => open('mobile')}
        >
            <h3>☰</h3>
        </button>
    );
}

function SearchToggle() {
    const { open } = useAside();
    return (
        <button className="reset" onClick={() => open('search')}>
            Search
        </button>
    );
}

function CartBadge({ count }: { count: number | null }) {
    const { open } = useAside();
    const { publish, shop, cart, prevCart } = useAnalytics();

    return (
        <a
            href="/cart"
            onClick={(e) => {
                e.preventDefault();
                open('cart');
                publish('cart_viewed', {
                    cart,
                    prevCart,
                    shop,
                    url: window.location.href || '',
                } as CartViewPayload);
            }}
            style={{ color: '#62492C' }}
        >
            <Badge
                badgeContent={count ?? 0} // Show count or 0 if null
                color="error" // Red badge color (can be changed)
                overlap="circular"
                sx={{
                    '& .MuiBadge-badge': {
                        fontSize: '0.6rem', // Adjust badge font size
                        minWidth: '20px', // Minimum width of badge
                        height: '20px', // Height of badge
                    }
                }}
            >
                <ShoppingCartIcon style={{ fontSize: '40px' }} /> {/* Make the icon bigger */}
            </Badge>
        </a>
    );
}

function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
    return (
        <Suspense fallback={<CartBadge count={null} />}>
            <Await resolve={cart}>
                <CartBanner />
            </Await>
        </Suspense>
    );
}

function CartBanner() {
    const originalCart = useAsyncValue() as CartApiQueryFragment | null;
    const cart = useOptimisticCart(originalCart);
    return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
    id: 'gid://shopify/Menu/199655587896',
    items: [
        {
            id: 'gid://shopify/MenuItem/461609500728',
            resourceId: null,
            tags: [],
            title: 'Collections',
            type: 'HTTP',
            url: '/collections',
            items: [],
        },
        {
            id: 'gid://shopify/MenuItem/461609533496',
            resourceId: null,
            tags: [],
            title: 'Blog',
            type: 'HTTP',
            url: '/blogs/journal',
            items: [],
        },
        {
            id: 'gid://shopify/MenuItem/461609566264',
            resourceId: null,
            tags: [],
            title: 'Policies',
            type: 'HTTP',
            url: '/policies',
            items: [],
        },
        {
            id: 'gid://shopify/MenuItem/461609599032',
            resourceId: 'gid://shopify/Page/92591030328',
            tags: [],
            title: 'About',
            type: 'PAGE',
            url: '/pages/about',
            items: [],
        },
    ],
};

function activeLinkStyle({
    isActive,
    isPending,
}: {
    isActive: boolean;
    isPending: boolean;
}) {
    return {
        fontWeight: isActive ? 'bold' : undefined,
        fontFamily: "Rollercoaster, sans-serif",
        fontSize: '1.25rem',
        color: isPending ? 'grey' : '#62492C',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
}

function headerLinkStyle({
    isActive,
    isPending,
}: {
    isActive: boolean;
    isPending: boolean;
}) {
    return {
        fontWeight: isActive ? 'bold' : undefined,
        fontFamily: "Bodoni, sans-serif",
        color: isPending ? 'grey' : '#62492C',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
}
