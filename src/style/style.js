export const styles = {
  appContainer: {
    textAlign: 'center'
  },
  appHeader: {
    backgroundColor: '#282c34',
    minHeight: 45,
    fontDize: 'calc(10px + 2vmin)',
    color: 'white',
    position: 'fixed',
    width: '100%',
    zIndex: 3
  },
  searchContainerPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    flexBasis: '30%',
  },
  menuPaper: {
    padding: '2px 4px',
    display: 'flex',
    flexBasis: '10%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    order: 1
  },
  iconButton: {
    padding: 10,
    order: 1
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  searchContainer: {
    display: 'flex',
    padding: 10,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width:780px)': {
      flexDirection: 'column'
    }
  },
  searchHistoryContainer: {
    position: 'relative',
    top: 100
  },
  searchHistoryItem: {
    cursor: 'pointer',
    '&:hover':{
      backgroundColor: 'lightgray'
  }
  },
  error: {
    position: 'relative',
    top: 125,
    color: 'red',
    fontSize: 40
  }
};