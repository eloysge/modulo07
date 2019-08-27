/**
 * IMMER (manipulacao de states: current -> draft -> next)
 * yarn add immer
 *
 */
import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD':
      return produce(state, draft => {
        const index = draft.findIndex(item => item.id === action.product.id);
        if (index >= 0) {
          draft[index].amount += 1;
        } else {
          draft.push({
            ...action.product,
            amount: 1,
          });
        }
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const index = draft.findIndex(item => item.id === action.id);
        if (index >= 0) {
          draft.splice(index, 1);
        }
      });
    default:
      return state;
  }
}
