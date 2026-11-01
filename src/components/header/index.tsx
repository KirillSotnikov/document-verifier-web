import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavigationRoutes } from '../../../types.ts';
import { NetworkSelector } from './NetworkSelector';
import { CheckCircleIcon, CloseIcon, DocumentIcon, MenuIcon, SealIcon, UploadIcon } from '../ui/icons';

const headerLinkList = [
  { title: 'Register', path: NavigationRoutes.root, icon: <UploadIcon className="size-4" /> },
  { title: 'Verify', path: NavigationRoutes.verify, icon: <CheckCircleIcon className="size-4" /> },
  { title: 'My documents', path: NavigationRoutes.documents, icon: <DocumentIcon className="size-4" /> },
];

export const Logo: FC<{ inverted?: boolean }> = ({ inverted }) => (
  <span className="flex items-center gap-2.5">
    <span
      className={`flex size-8 items-center justify-center rounded-md ${
        inverted ? 'bg-white text-ink' : 'bg-ink text-white'
      }`}
    >
      <SealIcon className="size-[18px]" />
    </span>
    <span
      className={`font-display text-lg font-semibold tracking-[-0.01em] ${inverted ? 'text-white' : 'text-ink'}`}
    >
      Document Verifier
    </span>
  </span>
);

export const Header: FC<IProps> = ({ style }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-ink' : 'text-ink-faint hover:text-ink'
    }`;

  return (
    <header className={`sticky top-0 z-50 border-b border-rule bg-sheet/90 backdrop-blur ${style ?? ''}`}>
      <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to={NavigationRoutes.root} aria-label="Document Verifier home" className="shrink-0 rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden h-full items-stretch md:flex">
          {headerLinkList.map((item) => (
            <NavLink key={item.path} to={item.path} end className="group flex items-center">
              {({ isActive }) => (
                <span className={linkClass({ isActive })}>
                  {item.icon}
                  {item.title}
                  <span
                    className={`absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full transition-colors ${
                      isActive ? 'bg-stamp' : 'bg-transparent'
                    }`}
                    aria-hidden="true"
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <NetworkSelector />
          <ConnectButton chainStatus="none" showBalance={false} accountStatus="address" />
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          className="ml-auto rounded-md p-2 text-ink-soft hover:bg-paper hover:text-ink md:hidden"
        >
          {isMobileMenuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="border-t border-rule bg-sheet md:hidden">
          <nav aria-label="Main" className="flex flex-col px-4 py-3">
            {headerLinkList.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-3 text-[15px] font-medium ${
                    isActive ? 'bg-stamp-wash text-stamp' : 'text-ink-soft hover:bg-paper hover:text-ink'
                  }`
                }
              >
                {item.icon}
                {item.title}
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-col gap-3 border-t border-rule-soft px-7 py-4">
            <NetworkSelector fullWidth />
            <ConnectButton chainStatus="none" showBalance={false} accountStatus="address" />
          </div>
        </div>
      )}
    </header>
  );
};

interface IProps {
  style?: string;
}
