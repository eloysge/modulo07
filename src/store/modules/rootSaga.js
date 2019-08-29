import { all } from 'redux-saga/effects';
import sagaCart from './cart/sagas';

export default function* rootSaga() {
  return yield all([sagaCart]);
}
