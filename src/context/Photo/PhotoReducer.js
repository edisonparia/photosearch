import {
  GET_PHOTOS,
  GET_SEARCHED_TAG,
  IS_LOADING,
  ERROR,
  PHOTO_MODAL,
} from "../types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_PHOTOS:
      return { ...state, photoList: payload };
    case PHOTO_MODAL:
      return { ...state, photoModal: payload };
    case GET_SEARCHED_TAG:
      return { ...state, tagSearch: payload };
    case IS_LOADING:
      return { ...state, isLoading: payload };
    case ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
};
