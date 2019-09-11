/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
  MdRemoveShoppingCart,
} from 'react-icons/md';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';
import { Container, ProductTable, Total, ButtonLink } from './styles';

export default function Cart() {
  const totalgeral = useSelector(state =>
    formatPrice(
      state.cart.reduce((total, product) => {
        return total + product.price * product.amount;
      }, 0)
    )
  );
  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );
  const dispatch = useDispatch();
  const emptyCart = cart.length === 0;

  function addSubProduct(id, amount) {
    dispatch(CartActions.updateAmountRequest(id, amount));
  }

  return (
    <Container>
      {emptyCart ? (
        <MdRemoveShoppingCart className="emptyimg" size={50} />
      ) : (
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr>
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        addSubProduct(product.id, product.amount - 1)
                      }
                    >
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>
                    <input type="number" readOnly value={product.amount} />
                    <button
                      type="button"
                      onClick={() =>
                        addSubProduct(product.id, product.amount + 1)
                      }
                    >
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.subtotal}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(CartActions.removeFromCart(product.id))
                    }
                  >
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      )}

      <footer>
        {emptyCart ? (
          <ButtonLink to="/">
            <button to="/" type="button">
              Voltar as compras
            </button>
          </ButtonLink>
        ) : (
          <button type="button">Finalizar compras</button>
        )}

        <Total>
          <span>TOTAL</span>
          <strong>{totalgeral}</strong>
        </Total>
      </footer>
    </Container>
  );
}
