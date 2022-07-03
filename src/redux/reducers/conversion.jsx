import {reduxAction} from '../../constans';

const {
  CONVERSION_FETCH_START,
  CONVERSION_FETCH_END,
  CONVERSION_SET_STATE,
  CONVERSION_RESET_STATE,
} = reduxAction;

const initialState = {
  fetching: false,
  search_results: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONVERSION_FETCH_START:
      return {
        ...state,
        fetching: true,
      };
    case CONVERSION_FETCH_END:
      return {
        ...state,
        fetching: false,
      };
    case CONVERSION_SET_STATE:
      return {
        ...state,
        ...action.data,
      };
    case CONVERSION_RESET_STATE:
      return initialState;
    default:
      return state;
  }
}
