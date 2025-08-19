import { useParams } from 'react-router-dom';
import {
  COCKTAIL_CODES,
  CocktailCode,
  useSearchByCodeQuery,
} from '../features/cocktails/cocktailsApi';
import { extractIngredients } from '../features/cocktails/utils';
import { FetchBaseQueryError, skipToken } from '@reduxjs/toolkit/query';

export default function CocktailPage() {
  const { code = COCKTAIL_CODES[0] } = useParams();

  const valid = (COCKTAIL_CODES as readonly string[]).includes(code)
    ? (code as CocktailCode)
    : undefined;
  const { data = [], isLoading, isError, error } = useSearchByCodeQuery(valid ?? skipToken);
  if (!valid) return <div className="error">неверный код</div>;

  if (isLoading) return <div className="state">загрузка</div>;
  if (isError) {
    const err = error as FetchBaseQueryError;
    return <div className="error">ошшибка -- {String(err.status ?? '')}</div>;
  }
  return (
    <div className="cocktailList">
      {data.length === 0 && <div>нет данных</div>}
      {data.map((d) => {
        const ingredients = extractIngredients(d);
        return (
          <article key={d.idDrink} className="card">
            <header className="cardHeader">
              <h2 className="title">{d.strDrink}</h2>
              {d.strDrinkThumb && (
                <img className="thumb" src={d.strDrinkThumb} alt={d.strDrink} loading="lazy" />
              )}
            </header>

            <div className="meta">
              {d.strCategory && (
                <div>
                  <strong>Категория:</strong> {d.strCategory}
                </div>
              )}
              {d.strAlcoholic && (
                <div>
                  <strong>Тип:</strong> {d.strAlcoholic}
                </div>
              )}
              {d.strGlass && (
                <div>
                  <strong>Бокал:</strong> {d.strGlass}
                </div>
              )}
            </div>

            {d.strInstructions && (
              <section className="instructions">
                <h3>Инструкция</h3>
                <p>{d.strInstructions}</p>
              </section>
            )}

            {ingredients.length > 0 && (
              <section className="ingredients">
                <h3>Состав</h3>
                <ul>
                  {ingredients.map((x, i) => (
                    <li key={i}>
                      <span className="measure">{x.measure ?? ''}</span>
                      <span className="ingredient">{x.ingredient}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        );
      })}
    </div>
  );
}
