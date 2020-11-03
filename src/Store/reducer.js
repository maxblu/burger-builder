import * as actionType from './actions';

const initState = {
  ingredients: null,
  price: 4,
  building: false,
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.5,
};

const reducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case actionType.SET_ING:
      return {
        ...state,
        ingredients: action.ingredients,
        building: false,
      };
    case actionType.ADD_ING: {
      const oldCount = state.ingredients[action.key];
      const updateCounted = oldCount + 1;
      const updatedCounterIngredients = {
        ...state.ingredients,
      };

      updatedCounterIngredients[action.key] = updateCounted;
      const oldPrice = state.price;
      const priceAddition = INGREDIENTS_PRICES[action.key];
      const newPrice = priceAddition + oldPrice;

      return {
        ...state,
        price: newPrice,
        ingredients: updatedCounterIngredients,
        building: true,
      };
    }

    case actionType.SUB_ING: {
      const oldCount = state.ingredients[action.key];

      if (!oldCount) {
        return state;
      }

      const updateCounted = oldCount - 1;
      const updatedCounterIngredients = {
        ...state.ingredients,
      };

      updatedCounterIngredients[action.key] = updateCounted;
      const oldPrice = state.price;
      const priceAddition = INGREDIENTS_PRICES[action.key];
      const newPrice = oldPrice - priceAddition;

      return {
        ...state,
        price: newPrice,
        ingredients: updatedCounterIngredients,
        building: true,
      };
    }

    case actionType.AUTH_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionType.AUTH_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionType.AUTH_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.authData.idToken,
        userId: action.authData.localId,
        error: null,
      };
    }
    case actionType.AUTH_LOGOUT: {
      return {
        ...state,
        token: null,
        userId: null,
      };
    }

    default:
      return state;
  }
};

export default reducer;
