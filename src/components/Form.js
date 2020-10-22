import React, { Component } from 'react'
import axios from 'axios'
import { Button,Card,Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css'

class Form extends Component {constructor(props) {
    super(props)

    this.state = {
        username:"",
        info:[],
        isLoading:null,
    };
}
    handleSubmit= (e)=>{
        e.preventDefault();
        this.setState({isLoading:0})
        axios.get(`https://api.github.com/users/${this.state.username}`)
    .then(res =>{
    const info = res.data
    this.setState({
        info:info,
        isLoading:1
    })
})

}

handleInput = (e)=>{
    this.setState({username:e.target.value})

}

    render() {
        return (
            <div>
                <h1 className="header">Github Profiles</h1>
                <form className="form" onSubmit={this.handleSubmit} >
                    <input className="input" placeholder="Search..."
                     type="text" name="username" onChange={this.handleInput} />
                    <Button size="sm" onClick={this.handleSubmit} variant="success">
                        Success
                    </Button>
                </form>
               { this.state.isLoading ===1
                     ? 
                        <Card className="card" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={this.state.info.avatar_url} />
                    <Card.Body>
                     <Card.Title>Individual Data</Card.Title>
                        <Card.Text>
                            <p>Name: {this.state.info.name} </p>
                            <p>Location: {this.state.info.location}</p>
                            <p>public_repos: {this.state.info.public_repos}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                 :this.state.isLoading===0
                 ?
                 <Spinner animation="grow" />
                 :null
                }
        </div>
        )
    }
}

export default Form
