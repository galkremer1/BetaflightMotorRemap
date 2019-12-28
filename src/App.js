import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getData, parseImageData } from "./utils/utils";
import { styles } from './style/style';
import SearchInput from './components/searchInput';
import Gallery from './components/gallery/gallery';
import SearchHistory from './components/searchHistory';
import './style/loading.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchInputPlaceHolder: 'Search Flicker...',
      photos: [],
      loading: true,
      error: false,
      currentPage: 1,
      searchTerm: 'animals',
      noMorePhotosToFetch: false,
      searchHistory: [],
      autoSearch: true,
      showSearchHistory: false
    };
    this.photosPerPage = 100;
  }

  componentDidMount() {
    const { searchTerm, currentPage } = this.state;
    localStorage.imageSearchHistory = localStorage.imageSearchHistory || JSON.stringify([]);
    localStorage.autoSearch = localStorage.autoSearch || JSON.stringify(true);
    this.setState({
      searchHistory: JSON.parse(localStorage.imageSearchHistory),
      autoSearch: JSON.parse(localStorage.autoSearch),
    }, this.getData(searchTerm, currentPage))
  }

  toggleLoaderSearchTermPage = (loading, searchTerm, currentPage) => {
    this.setState({
      loading,
      searchTerm,
      currentPage
    });
  }

  getData(searchTerm, currentPage = 1) {
    this.toggleLoaderSearchTermPage(true, searchTerm, currentPage);
    getData(searchTerm, currentPage).then((data) => {
      if (data && data.photos && data.photos.photo) {
        const photosArray = parseImageData(data.photos.photo);
        let noMorePhotosToFetch = false;
        if (photosArray.length < this.photosPerPage) {
          noMorePhotosToFetch = true;
        }
        this.setState({
          photos: (currentPage > 1 ? this.state.photos.concat(photosArray) : photosArray),
          loading: false, error: false, noMorePhotosToFetch
        });
      }
    }).catch((error) => {
      this.setState({ error: true, loading: false });
    })
  }

  clearSearchHistory = () => {
    localStorage.imageSearchHistory = JSON.parse('[]');
    this.setState({
      searchHistory: []
    })
  }

  updateSearchHistory = (searchTerm) => {
    const { searchHistory } = this.state;
    if (!searchHistory.includes(searchTerm.trim())) {
      searchHistory.push(searchTerm);
      localStorage.imageSearchHistory = JSON.stringify(searchHistory);
      this.setState({
        searchHistory
      });
    }
  }

  handleSearch = (searchTerm) => {
    const { showSearchHistory } = this.state;
    if (showSearchHistory) {
      this.toggleSearchHistory();
    }
    if (searchTerm !== '') {
      this.getData(searchTerm);
      this.updateSearchHistory(searchTerm);
    }
  }

  loadMore = () => {
    const { loading, error, currentPage, searchTerm, noMorePhotosToFetch } = this.state;
    if (!loading && !error && !noMorePhotosToFetch) {
      this.getData(searchTerm, currentPage + 1);
    }
  }

  handleAutoSearchToggle = (autoSearch) => {
    this.setState({
      autoSearch
    });
    localStorage.autoSearch = JSON.stringify(autoSearch);
  }

  toggleSearchHistory = () => {
    const { showSearchHistory } = this.state;
    this.setState({
      showSearchHistory: !showSearchHistory
    })
  }

  handleSearchFromHistory = (searchTerm) => {
    this.handleSearch(searchTerm);
    const inputEl = document.getElementById('searchInput');
    inputEl.value = searchTerm;
  }

  render() {
    const { classes, appHeader } = this.props;
    const { searchInputPlaceHolder, photos, loading, error, autoSearch, showSearchHistory, searchHistory, searchTerm} = this.state;
    return (
      <div className={classes.appContainer} >
        <header className={classes.appHeader}>
          {appHeader}
          <SearchInput searchTerm={searchTerm} handleSearch={this.handleSearch} inputPlaceHolder={searchInputPlaceHolder}
            toggleSearchHistory={this.toggleSearchHistory} showSearchHistory={showSearchHistory} clearSearchHistory={this.clearSearchHistory}
            autoSearch={autoSearch} handleAutoSearchToggle={this.handleAutoSearchToggle} />
        </header>
        {!showSearchHistory && <Gallery photos={photos} isLoading={loading} error={error} loadMore={this.loadMore} />}
        {showSearchHistory && <SearchHistory searchHistory={searchHistory} handleSearch={this.handleSearchFromHistory}/>}
        {loading &&
          (<div className="loading">Loading&#8230;</div>)
        }
        {error &&
          (<div className={classes.error}>Error fetching images</div>)
        }
      </div>

    );
  }
}

export default withStyles(styles)(App);
