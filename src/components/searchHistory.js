import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../style/style';


class SearchHistory extends Component {

    render() {
        const { classes, searchHistory, handleSearch} = this.props;
        return (
            <div className={classes.searchHistoryContainer}>
                {searchHistory.map((item, i)=>{
                    return <span key={'search-history-item-'+i}><span className={classes.searchHistoryItem} onClick={()=>{handleSearch(item)}}>
                    {item}</span>{i<searchHistory.length-1 ? ',':''}</span>
                })}
                {searchHistory.length === 0 && <div>
                    No Search History
                </div>}
             </div>
        );
    }
}

export default withStyles(styles)(SearchHistory);
