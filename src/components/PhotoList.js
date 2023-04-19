import React, { useEffect, useContext } from "react";
import PhotoContext from "../context/Photo/PhotoContext";
import Photo from "./Photo";
const PhotoList = () => {
  const { error, isLoading, photoList, getPhotos } = useContext(PhotoContext);

  useEffect(() => {
    getPhotos();
  }, []);

  if (isLoading) return <h4>Loading...</h4>;
  if (error) return <h4>{error}</h4>;
  return (
    <div>
      {photoList?.map((photo) => {
        return <Photo key={photo.id} photo={photo} />;
      })}
    </div>
  );
};

export default PhotoList;
