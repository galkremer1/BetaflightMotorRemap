import React, { Component } from 'react';
import LightboxGallery from './lightBoxGallery';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './galleryStyle';

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isGalleryOpen: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const { loadMore } = this.props;
    const galleryScrollHeight = event.srcElement.body.scrollHeight;
    const pageScrollPosition = window.pageYOffset;
    if (galleryScrollHeight - pageScrollPosition < window.innerHeight + 250) {
      loadMore();
    }

  }

  closeGallery = () => {
    this.setState({
      isGalleryOpen: false,
    })
  }

  openGallery = (photo, index) => {
    this.setState({
      isGalleryOpen: true,
      galleryPhotoIndex: index
    })
  }

  render() {
    const { classes, photos, isLoading, error } = this.props;
    const { isGalleryOpen, galleryPhotoIndex } = this.state;
    const noResults = !isLoading && !error && photos.length === 0;
    return (
      <div className={`${classes.galleryContainer} ${(noResults ? classes.noSearchResults : '')}`}>
        {photos.map((photo, i) => {
          return <img className={classes.photo} key={photo.id} onClick={() => { this.openGallery(photo, i) }}
            alt={photo.title} src={photo.thumbnailUrl} />
        })}
        {noResults && <div>
          No results
        </div>}
        <LightboxGallery images={photos} isGalleryOpen={isGalleryOpen} galleryPhotoIndex={galleryPhotoIndex} closeGallery={this.closeGallery} />
      </div>
    );
  }
}

export default withStyles(styles)(Gallery);
