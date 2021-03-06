/**
 * controle de middleware na chamadas "actions"
 * dependencia:
 * yarn add redux-saga
 *
 * integração do saga ao reactotron:
 * yarn add reactotron-redux-saga
 */
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';
import { addToCartSuccess, updateAmountSuccess } from './actions';

function checkStock(productStock, amount) {
  console.tron.log(productStock, amount);
  if (amount > productStock.amount) {
    toast.error('Quant. solicitada maior que estoque atual');
    return false;
  }
  return true;
}

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);
  const currentAmount = productExists ? productExists.amount : 0;
  const amount = currentAmount + 1;

  if (!checkStock(stock.data, amount)) return;

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartSuccess(data));
  }
  history.push('/cart'); // após adicionar, muda rota para carrinho.
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);

  if (!checkStock(stock.data, amount)) return;

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
