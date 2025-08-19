import { NavLink, Outlet } from 'react-router-dom';
import { COCKTAIL_CODES } from '../features/cocktails/cocktailsApi';

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <nav>
          {COCKTAIL_CODES.map((code) => (
            <NavLink
              key={code}
              to={`/${code}`}
              className={({ isActive }) => `menuItem${isActive ? ' active' : ''}`}
            >
              {code[0].toUpperCase() + code.slice(1)}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
