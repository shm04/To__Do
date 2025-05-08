import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { PersistGate } from 'redux-persist/integration/react'
import taskReducer from '../features/taskSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  tasks: taskReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)
