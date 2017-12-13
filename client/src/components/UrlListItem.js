import React, { Component } from 'react';

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
            <div className="UrlListItem" key={this.props.urlId}>
            <p>{this.props.originalUrl}</p>
            <a href={this.props.redirectUrl}>{this.props.redirectUrl}</a>
            <button onClick={() => this.removeListItem(this.props.urlId)}>Delete</button>
            </div>
        );
    }
}

export default UrlListItem;