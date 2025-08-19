import Layout from './components/Layout';
import CocktailPage from './pages/CocktailPage';
import NotFound from './pages/NotFound';
import { COCKTAIL_CODES } from './features/cocktails/cocktailsApi';
import { Navigate } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      // редирект на первый коктейль
      { index: true, element: <Navigate to={`/${COCKTAIL_CODES[0]}`} replace /> },

      // динамический маршрут по коду коктейля
      { path: ':code', element: <CocktailPage /> },

      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
