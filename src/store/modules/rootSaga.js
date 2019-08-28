import { all } from 'redux-saga/effects';
import addCart from './cart/sagas';

export default function* rootSaga() {
  return yield all([addCart]);
}
