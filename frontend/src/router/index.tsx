import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import MainLayout from '@/layout/MainLayout';
import CustomersList from '@/pages/InfoCustomers/CustomersList';
import AddCustomers from '@/pages/InfoCustomers/AddCustomers';
import Home from '@/pages/Home';
import EditCustomers from '@/pages/InfoCustomers/EditCustomers';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout role={1} />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
    ],
  },

  {
    path: ROUTES.INFOCUSTOMERS,
    element: <MainLayout role={2} />,
    children: [
      {
        index: true, 
        element: <CustomersList />,
      },
      {
        path: ROUTES.ADDCUSTOMERS,
        element: <AddCustomers/>,
      },
      {
        path: ROUTES.EDITCUSTOMERS,
        element: <EditCustomers />,
      },
    ],
  },
]);
