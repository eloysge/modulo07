/**
 * dependencias:
 * yarn add redux react-redux
 *
 */
import { createStore } from 'redux';
import rootReducer from './modules/rootReducer';

const store = createStore(rootReducer);

export default store;
