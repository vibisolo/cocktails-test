import { configureStore } from '@reduxjs/toolkit';
import { cocktailsApi } from './features/cocktails/cocktailsApi';

export const store = configureStore({
  reducer: {
    [cocktailsApi.reducerPath]: cocktailsApi.reducer,
  },
  middleware: (gDM) => gDM().concat(cocktailsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;