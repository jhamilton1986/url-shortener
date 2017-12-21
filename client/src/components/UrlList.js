import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UrlListItem from './UrlListItem';

class UrlList extends Component {
  render() {
    return (
      <div className="row">
        {this.props.urls.map(url =>
            <UrlListItem key={url._id} urlData={url} onDelete={() => {this.props.deleteHandler()}} />
        )}
      </div>
    );
  }
}

UrlList.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      originalUrl: PropTypes.string.isRequired,
      redirectUrl: PropTypes.string.isRequired,
      hitCounter: PropTypes.number.isRequired,
    })).isRequired,
  deleteHandler: PropTypes.func.isRequired
};
  
export default UrlList;