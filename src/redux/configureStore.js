import {combineReducers,applyMiddleware,createStore} from 'redux';
import { Dishes } from "./dishes";
import { Promotions } from "./promotions";
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import {createForms} from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';

export const ConfigureStore=()=>{
    const store=createStore(
        combineReducers({
            dishes:Dishes,
            promotions:Promotions,
            comments:Comments,
            leaders:Leaders,
            ...createForms({
                feedback:InitialFeedback
            })
        }),
        applyMiddleware(thunk,logger)
    );
    return store;
}