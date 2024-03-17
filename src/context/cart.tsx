import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { getProducts } from 'src/supabase';

// constants
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const TOGGLE_CART_DRAWER = 'TOGGLE_CART_DRAWER';
const UPDATE_QTY = 'UPDATE_QTY';
const CLEAR_CART = 'CLEAR_CART';

// types
type Product = NonNullable<Awaited<ReturnType<typeof getProducts>>>[number] & {
  qty: number | null;
};

type AddToCartAction = {
  type: typeof ADD_PRODUCT;
  payload: Omit<Product, 'qty'> & { qty?: number };
};
type RemoveFromCartAction = {
  type: typeof REMOVE_FROM_CART;
  payload: Product['id'];
};
type ToggleDrawerAction = {
  type: typeof TOGGLE_CART_DRAWER;
};

type ClearCartAction = {
  type: typeof CLEAR_CART;
};

type UpdateQtyAction = {
  type: typeof UPDATE_QTY;
  payload: {
    productID: Product['id'];
    qty: Product['qty'];
  };
};
type Action =
  | AddToCartAction
  | RemoveFromCartAction
  | ToggleDrawerAction
  | UpdateQtyAction
  | ClearCartAction;

type Dispatch = (action: Action) => void;
type State = {
  products: Record<string, Product>;
  drawerOpened: boolean;
};

const CartContext = createContext<{ state: State; dispatch: Dispatch }>({
  dispatch: () => undefined,
  state: {
    products: {},
    drawerOpened: false,
  },
});

function cartReducer(state: State, action: Action) {
  switch (action.type) {
    case ADD_PRODUCT: {
      const product = state.products[action.payload.id];

      if (product !== undefined) {
        return {
          ...state,
          products: {
            ...state.products,
            [product.id]: {
              ...product,
              qty:
                product.qty === null
                  ? ''
                  : product.qty + (action.payload.qty ?? 1),
            },
          },
        };
      }

      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.id]: {
            ...action.payload,
            qty: action.payload.qty ?? 1,
          },
        },
      };
    }

    case REMOVE_FROM_CART: {
      const { [action.payload]: value, ...rest } = state.products;

      return {
        ...state,
        products: rest,
      };
    }
    case UPDATE_QTY: {
      const { [action.payload.productID]: value, ...rest } = state.products;
      return {
        ...state,
        products: {
          ...rest,
          [action.payload.productID]: {
            ...state.products[action.payload.productID],
            qty: action.payload.qty,
          },
        },
      };
    }

    case TOGGLE_CART_DRAWER:
      return {
        ...state,
        drawerOpened: !state.drawerOpened,
      };
    case CLEAR_CART:
      return {
        ...state,
        products: {},
      };
    default:
      return state;
  }
}
export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: {},
    drawerOpened: false,
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCartContext() {
  return useContext(CartContext);
}
