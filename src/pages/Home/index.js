import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import LinearIndeterminate from '../../components/LinearIndeterminate';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';
import { ProductList, Loader, LoaderAdd } from './styles';

class Home extends Component {
  state = {
    products: [],
    loading: false,
    addLoading: {},
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await api.get('products');
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data, loading: false });
  }

  handleAddProduct = id => {
    const { addLoading } = this.state;
    addLoading[id] = true;
    this.setState({ addLoading });

    const { addToCartRequest } = this.props;
    addToCartRequest(id);
  };

  render() {
    const { products, loading, addLoading } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {loading ? (
          <Loader>
            <div className="loader">Carregando...</div>
          </Loader>
        ) : (
          products.map(product => (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
              {addLoading[product.id] ? (
                <LoaderAdd>
                  <LinearIndeterminate />
                </LoaderAdd>
              ) : (
                <button
                  type="button"
                  onClick={() => this.handleAddProduct(product.id)}
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
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, item) => {
    amount[item.id] = item.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
