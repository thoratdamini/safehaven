
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../src/reducer/rootreducer'; 

const store = configureStore({
  reducer: rootReducer
});

export default store;