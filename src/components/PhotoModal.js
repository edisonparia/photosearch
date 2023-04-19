import React, { useContext } from "react";
import PhotoContext from "../context/Photo/PhotoContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const PhotoModal = (props) => {
  const { photoList, photoModal, getPhotoModal } = useContext(PhotoContext);

  //   const photoShowModal = photoList?.filter((photo) => photo.id === photoid)[0];

  const { show, handleClose } = props;

  const handleNext = () => {
    const index = photoList.findIndex((object) => {
      return object.id === photoModal.id;
    });
    if (index + 1 === photoList.length) {
      getPhotoModal(photoList[0]);
    } else {
      getPhotoModal(photoList[index + 1]);
    }
  };
  const handlePrev = () => {
    const index = photoList.findIndex((object) => {
      return object.id === photoModal.id;
    });
    if (index === 0) {
      getPhotoModal(photoList[photoList.length - 1]);
    } else {
      getPhotoModal(photoList[index - 1]);
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{photoModal?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={`https://live.staticflickr.com/${photoModal?.server}/${photoModal?.id}_${photoModal?.secret}.jpg`}
          alt={photoModal?.title}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handlePrev}>
          Prev
        </Button>
        <Button variant="primary" onClick={handleNext}>
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PhotoModal;
