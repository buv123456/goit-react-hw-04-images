import { useState } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyled, ModalImgStyled } from './ImageGalleryStyled';
import { Modal } from 'components/Modal/Modal';

export function ImageGallery({ images }) {
  const [image, setImage] = useState(null);
  const toggleModal = image => {
    setImage(image);
  };
  return (
    <div>
      <ImageGalleryStyled>
        {images.map(img => (
          <ImageGalleryItem image={img} key={img.id} onClick={toggleModal} />
        ))}
      </ImageGalleryStyled>

      {!!image && (
        <Modal onClose={toggleModal}>
          <ModalImgStyled src={image.largeImageURL} alt={image.tag} />
        </Modal>
      )}
    </div>
  );
}
