import React, { Component } from "react";

export default class Header extends Component {
  render() {

    const introStyle = {
      backgroundColor: '#f7df1e',
      height: '150px',
      padding: '10px',
      color: 'black',
      paddingTop: '60px',
      paddingBottom: '10px',
      textAlign: 'center'
      
  };

    return(
      <header className="App-header" style={introStyle}>
        <h1 className="App-title">{this.props.name}</h1>
      </header>
    )
  }
}
