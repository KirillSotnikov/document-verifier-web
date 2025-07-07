import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Outlet } from 'react-router-dom';
import { Container } from '../components/containers';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col mx-auto">
      <Header />
      <main className="flex-1">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};
