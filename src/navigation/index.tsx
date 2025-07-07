import { Route, Routes } from 'react-router-dom';
import {
  NavigationRoutes,
} from '../../types.ts';
import { MainLayout } from './main-layout.navigation.tsx';
import { UploadPage } from '../pages/upload.page.tsx';
import { VerifyPage } from '../pages/verify.page.tsx';
import { MyDocumentsPage } from '../pages/my-documents.page.tsx';

export const Navigation = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={NavigationRoutes.root} element={<UploadPage />} />
        <Route path={NavigationRoutes.verify} element={<VerifyPage />} />
        <Route path={NavigationRoutes.documents} element={<MyDocumentsPage />} />
      </Route>
    </Routes>
  );
};
