import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UrlListItem extends Component {  
    removeListItem(id) {
        fetch("/api/" + id,
        {
            method: "DELETE"
        })
        .then(() => {
          this.props.onDelete();
        });
    }
    
    render() {
        return (
            <div className="URLListItem col-12" key={this.props.urlData._id}>
                <p>{this.props.urlData.originalUrl}</p>
                <a href={this.props.urlData.redirectUrl}>{this.props.urlData.redirectUrl}</a>
                <p>Hit Counter: {this.props.urlData.hitCounter}</p>
                <button onClick={() => this.removeListItem(this.props.urlData._id)}><i className="fa fa-remove"></i> Delete</button>
            </div>
        );
    }
}

UrlListItem.propTypes = {
    urlData: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        originalUrl: PropTypes.string.isRequired,
        redirectUrl: PropTypes.string.isRequired,
        hitCounter: PropTypes.number.isRequired,
      }).isRequired
};

export default UrlListItem;