import React, { useReducer } from "react";
import PhotoReducer from "./PhotoReducer";
import PhotoContext from "./PhotoContext";
import axios from "axios";

import {
  GET_PHOTOS,
  GET_SEARCHED_TAG,
  IS_LOADING,
  ERROR,
  PHOTO_MODAL,
} from "../types";

const PhotoState = (props) => {
  const initialState = {
    photoList: [],
    photoModal: null,
    tagSearch: null,
    isLoading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(PhotoReducer, initialState);

  const getPhotoModal = (photo) => {
    if (photo) {
      dispatch({
        type: PHOTO_MODAL,
        payload: photo,
      });
    }
  };

  const getTagSearch = async (tag) => {
    dispatch({
      type: GET_SEARCHED_TAG,
      payload: tag,
    });
    if (tag) {
      await getPhotos(tag);
    }
  };
  const getPhotos = async (tag) => {
    const dataURL = {
      method: "flickr.interestingness.getList",
      api_key: "3969fdb365bcb8d708cf0cfc417a96ef",
      sort: "interestingness-desc",
      per_page: 12,
      license: "4",
      extras: "owner_name,date_taken,tags,machine_tags",
      format: "json",
      nojsoncallback: 1,
    };

    if (tag) {
      dataURL.method = "flickr.photos.search";
      dataURL.safe_search = 1;
      dataURL.tags = tag;
      dataURL.sort = "interestingness-desc";
    }
    const parameters = new URLSearchParams(dataURL);

    const url = `https://api.flickr.com/services/rest/?${parameters}`;
    try {
      const res = await axios.get(url);

      const data = res.data.photos.photo;

      const newData = data?.map((photo) => {
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        photo.datetaken = new Date(photo.datetaken).toLocaleDateString(
          "en-us",
          options
        );
        const tagsArray = photo.tags.split(" ");

        if (tag) {
          // Find the index of the value in the array
          const index = tagsArray.indexOf(tag);

          // Remove the value from its current position
          tagsArray.splice(index, 1);

          // Insert the value at the beginning of the array
          tagsArray.unshift(tag);
        }

        photo.tags = tagsArray.slice(0, 3);

        return photo;
      });
      dispatch({
        type: GET_PHOTOS,
        payload: newData,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    } finally {
      dispatch({
        type: IS_LOADING,
        payload: false,
      });
    }
  };

  return (
    <PhotoContext.Provider
      value={{
        photoList: state.photoList,
        photoModal: state.photoModal,
        tagSearch: state.tagSearch,
        error: state.error,
        isLoading: state.isLoading,
        getPhotos,
        getTagSearch,
        getPhotoModal,
      }}
    >
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoState;
