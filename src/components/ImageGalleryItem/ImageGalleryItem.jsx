import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = (props) => {
  const { webformatURL, tags, largeImageURL } = props;
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = e => {
    setOpenModal(!openModal);
  };
    
    return (
      <li className={css.galleryItem}>
        <img
          className={css.galleryItemImage}
          onClick={toggleModal}
          src={webformatURL}
          alt={tags}
        />
        {openModal && (
          <Modal largeImageURL={largeImageURL} closeModal={toggleModal} />
        )}
      </li>
    );
}

