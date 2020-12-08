import React, { Component } from 'react'
import withAuthProvider from '../Authentication/AuthProvider'
let name = "Jahnvi"
export class Card extends Component {
    constructor(){
        super()
        this.state={
            name:""
        } 
    }
    
    componentDidUpdate(){
        console.log("updated")
        name = this.state.name  
    }

    handleChange = (e)=>{
        this.setState({
            name:e.target.value
        })
    }
    render() {
        console.log("props",this.props)
        console.log("state",this.state)
        return (
            <div>
                <h1>Name is {this.props.name}</h1>
                <input onChange={this.handleChange}></input>
                <h3>{this.props.getDesignation(this.state.name)}</h3>
            </div>
        )
    }
}

export default withAuthProvider(Card,name)
