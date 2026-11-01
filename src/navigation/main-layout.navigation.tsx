import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Outlet } from 'react-router-dom';
import { Container } from '../components/containers';

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};
