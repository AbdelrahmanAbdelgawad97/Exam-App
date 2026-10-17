import { StrictMode } from 'react'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ReactDOM from "react-dom/client";
import { routes } from './routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '#components/ui/toast';
import ExamContextProvider from './Context/UseContext.tsx';
import { SkeletonTheme } from 'react-loading-skeleton';

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();


const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <SkeletonTheme baseColor="#E5E7EB" highlightColor="#F3F4F6">
    <ExamContextProvider >
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          <RouterProvider router={router} />
          <Toaster />

        </StrictMode>
      </QueryClientProvider>
    </ExamContextProvider>
  </SkeletonTheme>
    
);
