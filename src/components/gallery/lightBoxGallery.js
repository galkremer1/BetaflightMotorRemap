import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export default class LightboxGallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photoIndex: null
    };
  }

  closeGallery = () => {
    const { closeGallery } = this.props;
    this.setState({
      photoIndex: null
    });
    closeGallery();
  }

  render() {
    const { images, isGalleryOpen, galleryPhotoIndex } = this.props;
    let { photoIndex } = this.state;
    photoIndex = photoIndex || galleryPhotoIndex;
    if (!isGalleryOpen) {
      return null;
    };
    return (
      <Lightbox
        imageTitle={images[photoIndex].title}
        mainSrc={images[photoIndex].fullImageUrl}
        nextSrc={images[(photoIndex + 1) % images.length].fullImageUrl}
        prevSrc={images[(photoIndex + images.length - 1) % images.length].fullImageUrl}
        onCloseRequest={this.closeGallery}
        onMovePrevRequest={() =>
          this.setState({
            photoIndex: (photoIndex + images.length - 1) % images.length
          })
        }
        onMoveNextRequest={() =>
          this.setState({
            photoIndex: (photoIndex + 1) % images.length
          })
        }
      />
    );
  }
}