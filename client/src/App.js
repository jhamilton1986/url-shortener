import React, { Component } from 'react';
import UrlList from './components/UrlList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      urls: [],
      userID: 12345
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadUrlList = this.loadUrlList.bind(this);
  }

  loadUrlList() {
    fetch('/api/urls/12345')
    .then(res => res.json())
    .then(urls => this.setState({ urls }));
  }
  
  componentDidMount() {
    this.loadUrlList();
  }
  
  handleChange(event) {
    this.setState({url: event.target.value})
  }

  handleSubmit(event) {
    fetch("/api/create/",
    {
        method: "POST",
        headers: this.state
    })
    .then(() => {
      this.loadUrlList();
      this.setState({url: ''});
    });

    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
      <h1>URL Shortener</h1>

      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} value={this.state.url} />
        <button type="submit">Submit!</button>
      </form>
      <UrlList urls={this.state.urls} deleteHandler={this.loadUrlList} />
      </div>
    );
  }
}
  
export default App;