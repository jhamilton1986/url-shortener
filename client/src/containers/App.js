import React, { Component } from 'react';
import UrlList from '../components/UrlList';
import { Jumbotron, Button, Form, Input, InputGroup, InputGroupAddon, FormFeedback } from 'reactstrap';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            url: '',
            isValidURL: true,
            urls: [],
            userID: window.localStorage.userID ? window.localStorage.userID : this.setUserID()
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadUrlList = this.loadUrlList.bind(this);
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
        .then(response => response.json())
        .then(response => {
            if (response.message === "Invalid URL") {
                this.setState({isValidURL: false, url: ''});
            } else {
                this.loadUrlList();
                this.setState({isValidURL: true, url: ''});
            }
        });
    }
    
    render() {
        const inputProps = {
            invalid: !this.state.isValidURL
        };

        return (
            <div className="App container">
                <Jumbotron className="mt-4">
                    <h1>URL Shortener</h1>
                    
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup>
                            <Input { ...inputProps } bsSize="lg" type="text" onChange={this.handleChange} value={this.state.url} />
                            <InputGroupAddon addonType="append">
                                <Button color="primary" type="submit" disabled={!this.state.url}>Shorten It!</Button>
                            </InputGroupAddon>

                            { !this.state.isValidURL && 
                                <FormFeedback>Oh no! That URL wasn't valid!</FormFeedback> 
                            }
                        </InputGroup>                        
                    </Form>
                </Jumbotron>
                
                <UrlList urls={this.state.urls} deleteHandler={this.loadUrlList} />
            </div>
        );
    }
}

export default App;