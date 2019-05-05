import React from "react";

export default class Footer extends React.Component {
    render() {
        const footerStyle = {
            textAlign: 'left',
            bottom: 0,
            left: 0,
            right: 0,
            paddingLeft: 20
          }
      return (
        <div style={footerStyle}>
            <h2><a href="https://fsa.community" target="_blank" rel="noopener noreferrer">Built by the Full-Stack Apprenticeship</a></h2>
            {/* <h3>Full-Stack Apprenticeship 2019</h3> */}
        </div>
      );
    }
  }