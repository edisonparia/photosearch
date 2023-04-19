import React, { useContext, useState } from "react";
import PhotoContext from "../context/Photo/PhotoContext";
import { useNavigate } from "react-router-dom";

import PhotoModal from "./PhotoModal";

const Photo = ({ photo }) => {
  const { getTagSearch, getPhotoModal, photoModal } = useContext(PhotoContext);

  //modal

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = async (photoData) => {
    await getPhotoModal(photoData);
    if (photoModal) {
      setShow(true);
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (tag) => {
    getTagSearch(tag);
    navigate(`/photosearch/tag/${tag}`);
  };
  // console.log(photo);
  return (
    <div className="container">
      <img
        src={`https://live.staticflickr.com/${photo?.server}/${photo?.id}_${photo?.secret}.jpg`}
        alt={photo.title}
        onClick={() => handleShow(photo)}
      />
      <div className="content">
        <div className="text-content">
          <p>
            by <strong>{photo?.ownername}</strong>
          </p>
          <p>Taken on {photo?.datetaken}</p>
        </div>

        <div className="button-content">
          {photo?.tags.map((tag) => {
            if (!tag) return null;
            else
              return (
                <button
                  className="tag-button"
                  key={tag}
                  onClick={() => handleSubmit(tag)}
                >
                  {tag}
                </button>
              );
          })}
        </div>
      </div>
      <PhotoModal show={show} handleClose={handleClose} />
    </div>
  );
};

export default Photo;
