import {combineReducers, configureStore} from '@reduxjs/toolkit';
import filmReducer from './toolkitSlice';

const rootReducer = combineReducers({
        filmList: filmReducer
    }
);

const store = configureStore({
        reducer: rootReducer
    }
);

export default store;