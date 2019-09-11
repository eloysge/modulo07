import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import LinearIndeterminate from '../../components/LinearIndeterminate';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';
import { ProductList, Loader, LoaderAdd } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, item) => {
      sumAmount[item.id] = item.amount;
      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const response = await api.get('products');
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  useEffect(() => {}, [addLoading]);

  const handleAddProduct = useCallback(
    id => {
      const itemId = products.findIndex(product => product.id === id);
      const itemLoading = [];
      itemLoading[itemId] = true;
      setAddLoading(itemLoading);
      dispatch(CartActions.addToCartRequest(id));
    },
    [dispatch, products]
  );

  return (
    <ProductList>
      {loading ? (
        <Loader>
          <div className="loader">Carregando...</div>
        </Loader>
      ) : (
        products.map((product, index) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            {addLoading[index] ? (
              <LoaderAdd>
                <LinearIndeterminate />
              </LoaderAdd>
            ) : (
              <button
                type="button"
                onClick={() => handleAddProduct(product.id)}
              >
                <div>
                  <MdAddShoppingCart size={16} color="#fff" />
                  {amount[product.id] || 0}
                </div>
                <span>ADICIONAR AO CARRINHO</span>
              </button>
            )}
          </li>
        ))
      )}
    </ProductList>
  );
}
