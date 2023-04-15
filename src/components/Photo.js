import React, { useContext } from "react";
import PhotoContext from "../context/Photo/PhotoContext";
import { useNavigate } from "react-router-dom";

const Photo = (props) => {
  const { getTagSearch } = useContext(PhotoContext);
  const navigate = useNavigate();
  const handleSubmit = (tag) => {
    getTagSearch(tag);
    navigate(`/tag/${tag}`);
  };
  const { photo } = props;
  return (
    <div className="container">
      <img
        src={`https://live.staticflickr.com/${photo?.server}/${photo?.id}_${photo?.secret}.jpg`}
        alt={photo.title}
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
            if(tag)
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
    </div>
  );
};

export default Photo;
