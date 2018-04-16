import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './UrlListItem.css';


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
                <td className="align-middle">{this.props.urlData.originalUrl}</td>
                <td className="align-middle"><a href={this.props.urlData.redirectUrl}>{this.props.urlData.redirectUrl}</a></td>
                <td className="align-middle">{this.props.urlData.hitCounter}</td>
                <td className="align-middle">
                    <Button color="danger" className="pull-right" onClick={() => this.removeListItem(this.props.urlData._id)}>
                        <FontAwesome name="remove" /> Delete
                    </Button>
                </td>
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