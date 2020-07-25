import {createStore, combineReducers, applyMiddleware} from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { leaders } from './leaders';
import AsyncStorage from '@react-native-community/async-storage';
import {favorites} from './favorites';
export const ConfigureStore = () => {
    const config={
        key:'root',
        debug:true,
        storage: AsyncStorage

    }
    const store = createStore(
        persistCombineReducers(config,{
            dishes,
            comments,
            promotions,
            leaders,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );
    const persistor= persistStore(store);

    return {persistor,store};
}