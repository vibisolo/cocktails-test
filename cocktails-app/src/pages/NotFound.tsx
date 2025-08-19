import { Link } from 'react-router-dom';
import { COCKTAIL_CODES } from '../features/cocktails/cocktailsApi';

export default function NotFound() {
  return (
    <div className="notFound">
      <h2>404 — страница не найдена</h2>
      <p>
        перейти на <Link to={`/${COCKTAIL_CODES[0]}`}>{COCKTAIL_CODES[0]}</Link>.
      </p>
    </div>
  );
}
