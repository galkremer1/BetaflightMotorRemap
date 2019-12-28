export const styles = {
    galleryContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 100,
        '@media (max-width:780px)' : {
            top: 140
          }
    },
    photo: {
        maxWidth: '30%',
        maxHeight: 150,
        minWidth: 100,
        flexFlow: 'row nowrap',
        alignItems: 'center',
        margin: 5,
        transition: 'all 1s',
        cursor: 'pointer',
        zIndex: 1,
        objectFit: 'cover',
        '&:hover':{
            transform: 'scale(1.2)',
            zIndex: 2
        }
    },
    noSearchResults: {
        justifyContent: 'center',
    }
  };