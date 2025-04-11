import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="bg-white py-12 font-['Bodoni']">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Logo Section */}
                <div className="flex flex-col items-center">
                  <img 
                    src="/assets/logo.png" 
                    alt="PUZO Logo" 
                    className="w-32 h-32 mb-4"
                  />
                  <h2 className="text-[#62492C] text-2xl font-bold text-center">PUZO</h2>
                </div>

                {/* BRAND Section */}
                <div>
                  <h3 className="text-[#62492C] font-bold mb-4">BRAND</h3>
                  <div className="flex flex-col space-y-2">
                    <a href="/about-us" className="text-[#62492C] hover:opacity-80">About us</a>
                    <a href="mailto:support@puzo.com" className="text-[#62492C] hover:opacity-80">support@puzo.com</a>
                  </div>
                </div>

                {/* BORING STUFF Section */}
                <div>
                  <h3 className="text-[#62492C] font-bold mb-4">BORING STUFF</h3>
                  <div className="flex flex-col space-y-2">
                    <a href="/terms" className="text-[#62492C] hover:opacity-80">Terms & Conditions</a>
                    <a href="/privacy" className="text-[#62492C] hover:opacity-80">Privacy Policy</a>
                  </div>
                </div>

                {/* SUPPORT Section */}
                <div>
                  <h3 className="text-[#62492C] font-bold mb-4">SUPPORT</h3>
                  <div className="flex flex-col space-y-2">
                    <a href="/returns" className="text-[#62492C] hover:opacity-80">Returns</a>
                    <a href="/faq" className="text-[#62492C] hover:opacity-80">FAQ</a>
                    <a href="/contact" className="text-[#62492C] hover:opacity-80">Contact</a>
                  </div>
                </div>

                {/* JOIN Section */}
                <div>
                  <h3 className="text-[#62492C] font-bold mb-4">JOIN</h3>
                  <p className="text-[#62492C] mb-4">SIGN UP TO OUR EMAIL LIST</p>
                  <form className="flex">
                    <input
                      type="email"
                      placeholder="Email"
                      className="flex-1 border border-[#62492C] px-3 py-2 mr-2"
                    />
                    <button
                      type="submit"
                      className="bg-[#62492C] text-white px-6 py-2 hover:opacity-90"
                    >
                      JOIN
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
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
    color: isPending ? 'grey' : 'white',
  };
}
