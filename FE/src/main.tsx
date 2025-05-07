import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToasterProvider } from './contexts/ToasterProvider.tsx';
import App from './App.tsx';
import { Catalogue, NotFound, Recipe } from './pages';
import './index.css';
import { PopupProvider } from './contexts/PopupProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PopupProvider>
        <ToasterProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<App />}>
                <Route path="/" element={<Catalogue />} />
                <Route path=":id" element={<Recipe />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/not-found" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToasterProvider>
      </PopupProvider>
    </QueryClientProvider>
  </StrictMode>
);
