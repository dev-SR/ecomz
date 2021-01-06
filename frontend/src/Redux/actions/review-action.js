import axios from 'axios';
export const GET_RATING = 'GET_RATING';

export const getRatingAction = id => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   };
   const { data } = await axios.get(`/api/v1/reviews/rating/${id}`, config);
   dispatch({
      type: GET_RATING,
      payload: data
   });
};
