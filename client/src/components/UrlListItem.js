import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class UrlListItem extends Component {  
    removeListItem(id) {
        fetch("/api/" + id, {
            method: "DELETE"
        })
        .then(() => {
          this.props.onDelete();
        });
    }
    
    render() {
        return (
            <tr className="URLListItem" key={this.props.urlData._id}>
                <td>{this.props.urlData.originalUrl}</td>
                <td><a href={this.props.urlData.redirectUrl}>{this.props.urlData.redirectUrl}</a></td>
                <td>{this.props.urlData.hitCounter}</td>
                <td><Button color="danger" className="pull-right" onClick={() => this.removeListItem(this.props.urlData._id)}><i className="fa fa-remove"></i> Delete</Button></td>
            </tr>
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