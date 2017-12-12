import React, { Component } from 'react';
import './App.css';

class Home extends Component {
  state = {urls: []}

  componentDidMount() {
    fetch('/api/urls/12345')
      .then(res => res.json())
      .then(urls => this.setState({ urls }));
  }

  render() {
    return (
      <div className="App">
        <h1>URL Shortener</h1>

        {this.state.urls.map(url =>
          <div key={url._id}>
            <p>{url.originalUrl}</p>
            <a href={"http://localhost:3000/" + url.redirectUrl}>{url.redirectUrl}</a>
          </div>
        )}
      </div>
    );
  }
}

export default Home;