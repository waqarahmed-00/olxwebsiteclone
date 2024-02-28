import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer)

const store = configureStore({
  reducer: persistedReducer
})

const persistor = persistStore(store)

export {
  store , persistor

}
