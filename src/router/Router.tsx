import { createBrowserRouter } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import {
    AboutUsPage,
    ContactUsPage,
    HomePage,
    PageNotFound,
    PricingPage,
    Dashboard,
} from '../pages';

const router = createBrowserRouter([
    { path: '*', element: <PageNotFound /> },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/contact',
                element: <ContactUsPage />,
            },
            {
                path: '/about',
                element: <AboutUsPage />,
            },
            {
                path: '/pricing',
                element: <PricingPage />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
        ],
    },
]);

export default router;
