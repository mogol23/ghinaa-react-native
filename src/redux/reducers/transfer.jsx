import { reduxAction } from '../../constans';

const {
  TRANSFER_FETCH_START,
  TRANSFER_FETCH_END,
  TRANSFER_SET_STATE,
  TRANSFER_RESET_STATE,
} = reduxAction;

const initialState = {
  fetching: false,
  histories: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TRANSFER_FETCH_START:
      return {
        ...state,
        fetching: true,
      };
    case TRANSFER_FETCH_END:
      return {
        ...state,
        fetching: false,
      };
    case TRANSFER_SET_STATE:
      return {
        ...state,
        ...action.data,
      };
    case TRANSFER_RESET_STATE:
      return initialState;
    default:
      return state;
  }
}
