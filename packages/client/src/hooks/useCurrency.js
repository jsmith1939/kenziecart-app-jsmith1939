import React, { useReducer, useContext, createContext, useEffect, useMemo } from 'react'

// first initialize the state so the display side bar will appear for the exchange currency
const initialState = {
  currency: 'USD',
  multiplier: 1,
  symbol: '$'
}

const currencyContext = createContext(initialState)

// initialize the reducer action Set_Currency
const setCurrency = 'Set_Currency'
// create a currency reducer function: and set state - action as a parameter
function currencyReducer (state, action) {
  switch (action.type) {
    case 'SET_CURRENCY': {
      return {
        ...state, 
        currency: action.payload.currency,
        multiplier: action.payload.multiplier,
        symbol: action.payload.symbol
      }
    }
    default:
      throw new Error(`Invalid action: ${action.type}`)
    }
    
  }
  
  // create an export variable that provide the necessary context and handles the currency exchange process
  export const CurrencyProvider = (props) => {
    const [state, dispatch] = useReducer(currencyReducer, initialState)
    const setCurrency = (currency) => {
      dispatch({
        type: 'SET_CURRENCY',
        payload: currency
      })
    }
    const getPrice = (amount) => {
      return `${state.symbol}${amount * state.multiplier}`
    }
    const value = useMemo(() => ({
      ...state,
      setCurrency,
      getPrice
    }),
    [state]
    )
    
    return <currencyContext.Provider value={value} {...props} />
  }
  
  // create an export variable for the currency context. Then use the createContext object to pass data into the data tree.
  export const useCurrency = () => {
    const context = useContext(currencyContext);
    return context;
  };
  
  useCurrency.displayName = 'useCurrency';
  export const CurrencyContext = ({ children }) => {
    return <CurrencyProvider>{children}</CurrencyProvider>;
  };
  
  export default useCurrency