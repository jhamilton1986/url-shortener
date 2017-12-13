import React, { Component } from 'react';
import UrlListItem from './UrlListItem';

class UrlList extends Component {
  
  render() {
    return (
      <div className="UrlList">
        {this.props.urls.map(url =>
            <UrlListItem key={url._id} urlId={url._id} originalUrl={url.originalUrl} redirectUrl={url.redirectUrl} onDelete={() => {this.props.deleteHandler()}} />
        )}
      </div>
    );
  }
}
  
export default UrlList;