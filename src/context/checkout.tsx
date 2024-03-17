import { PropsWithChildren, createContext, useContext, useState } from 'react';

type State = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  country: string;
  state: string;
};

const CheckoutContext = createContext<{
  state: State;
  setState: React.Dispatch<State>;
  onChange(
    name: keyof State
  ): (event: React.ChangeEvent<HTMLInputElement>) => void;
}>({
  state: {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
    country: '',
    state: '',
  },
  setState: () => undefined,
  onChange: () => () => undefined,
});

export const CheckoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<State>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
    country: '',
    state: '',
  });

  function onChange(name: keyof State) {
    return function inner(event: React.ChangeEvent<HTMLInputElement>) {
      return setState((prev) => {
        return {
          ...prev,
          [name]: event.target.value,
        };
      });
    };
  }

  return (
    <CheckoutContext.Provider value={{ state, setState, onChange }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export function useCheckoutContext() {
  return useContext(CheckoutContext);
}
