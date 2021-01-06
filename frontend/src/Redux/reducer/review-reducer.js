import { GET_RATING } from '../actions/review-action';

export const ratingReducer = (state = {}, action) => {
   switch (action.type) {
      case GET_RATING:
         return { loading: false, ...action.payload };
      default:
         return state;
   }
};
