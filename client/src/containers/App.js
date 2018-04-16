import React, { Component } from 'react';
import UrlList from '../components/UrlList';
import { Jumbotron, Button, Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            url: '',
            urls: [],
            userID: window.localStorage.userID ? window.localStorage.userID : this.setUserID()
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadUrlList = this.loadUrlList.bind(this);
        this.setUserID = this.setUserID.bind(this);
    }

    componentDidMount() {
        this.loadUrlList();
    }
    
    setUserID() {
        const userID = Math.round(Math.random() * Date.now());
        window.localStorage.userID = userID;
        return userID;
    }
    
    loadUrlList() {
        fetch('/api/urls/' + this.state.userID)
        .then(res => res.json())
        .then(urls => this.setState({ urls }));
    }
    
    handleChange(event) {
        this.setState({url: event.target.value})
    }
    
    handleSubmit(event) {
        event.preventDefault();        
        if (this.state.url.length === 0) return null;

        fetch("/api/create/", {
            method: "POST",
            headers: this.state
        })
        .then(() => {
            this.loadUrlList();
            this.setState({url: ''});
        });
        
    }
    
    render() {
        return (
            <div className="App container">
                <Jumbotron className="mt-4">
                    <h1>URL Shortener</h1>
                    
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup>
                            <Input bsSize="lg" type="text" onChange={this.handleChange} value={this.state.url} />
                            <InputGroupAddon addonType="append">
                                <Button color="primary" type="submit" disabled={!this.state.url}>Shorten It!</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Form>
                </Jumbotron>
                
                <UrlList urls={this.state.urls} deleteHandler={this.loadUrlList} />
            </div>
        );
    }
}

export default App;