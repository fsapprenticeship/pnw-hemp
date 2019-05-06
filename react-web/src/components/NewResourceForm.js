import React from 'react';
import {
  fullStackApprenticeship,
  cityByCity,
  // findingWork
  } from '../directories';
import { API } from 'aws-amplify';
import { Button, Input, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import uuidv4 from "uuid";

class NewResourceForm extends React.Component {
  constructor() {
    super();

    this.state = {
      directory: 'hemp',
      schemas: fullStackApprenticeship,
      author: '',
      name: '',
      contact: '',
      schema: '',
      description: '',
    };
  }

  // componentDidMount() {
  //   this.updateSchemas();
  // }

  // changeDirectory = async e => {
  //   await this.setState({
  //     directory: e.target.value
  //   })
    
  //   await this.updateSchemas();
  // }

  // updateSchemas() {
  //   switch (this.state.directory) {
  //     case 'hemp':
  //       this.setState({ 
  //         schemas: fullStackApprenticeship,
  //         schema: 'Get Started'
  //       })
  //       break;
  //     case 'cityGuide':
  //       this.setState({ 
  //         schemas: cityByCity,
  //         schema: 'Seattle'
  //       })
  //       break;
  //     // case 'findingWork':
  //     //   this.setState({ 
  //     //     schemas: findingWork,
  //     //     schema: 'Community'
  //     //   })
  //     //   break;
  //     default:
  //       break;
  //   }
  // }

  validateForm = () => {
    return this.state.name.length > 0 && this.state.description.length > 0 && this.state.contact.length > 0; 
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const body = {
      bulletinId: uuidv4(),
      directory: this.state.directory,
      // author: this.state.author,
      city: 'Kirkland',
      state: 'Washington',
      name: this.state.name,
      contact: this.state.contact,
      // schema: this.state.schema,
      timestamp: Date.now(),
      description: this.state.description,
      // rank: this.state.rank,
      // approved: undefined
    }

    try {
      const response = await API.post('bulletin', '/items', {body})
      console.log('hemp-sls Response', response)
      this.props.routeHome()
    } catch(e) {
      console.log('ERROR', e)
    }
    
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  // changeSchema = e => {
  //   this.setState({ schema: e.target.value })
  // }

  render() {
    let schemas = this.state.schemas.map((item, i) => 
      <MenuItem key={i} value={item.type}>{item.name}</MenuItem>)
    return (
      <form className='newResourceForm'>
        <FormControl className="formElement">
          <InputLabel>Bulletin Name</InputLabel>
          <Input
              type="text"
              id="name"
              required
              onChange={this.handleChange}
          />
        </FormControl>
        <br />
{/* 
        <FormControl className="formElement">
          <InputLabel>Directory</InputLabel>
          <Select value={this.state.directory} 
                  onChange={this.changeDirectory} 
                  required 
                  >
            <MenuItem value='hemp'>Hemp</MenuItem>
            <MenuItem value='cityGuide'>City Guide</MenuItem>
            <MenuItem value='findingWork'>Finding Work</MenuItem>
          </Select>
          <br />

        </FormControl>
        <br /> */}

        {/* <FormControl className='formElement'>
          <InputLabel>Schema Type</InputLabel>
          <Select value={this.state.schema}
                  required 
                  onChange={this.changeSchema}
                  id="schema"
                  >
            {schemas}
          </Select>
        </FormControl>
        <br /> */}
        
        <FormControl className="formElement">
          <InputLabel>Description</InputLabel>
          <Input
              type="text"
              id="description"
              required
              onChange={this.handleChange}
          />
        </FormControl>
        <br />
        
        <FormControl className="formElement">
          <InputLabel>Contact Information</InputLabel>
          <Input
              type="contact"
              id="contact"
              required
              onChange={this.handleChange}
          />
        </FormControl>
        <br />

        {/* Needs to be populated through props */}
        {/* <div className="formElement">
          <InputLabel>Resource Author</InputLabel>
          <Input
              type="text"
              id="author"
              onChange={this.handleChange}
          />
        </div>
        <br /> */}



        {/* <div onClick={() => this.props.routeHome()}> */}
          <Button 
          // disabled={!this.validateForm()} 
          onClick={this.handleSubmit}>Request</Button>
       {/* </div> */}

      </form>
    )
  }}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      routeHome: () => push("/"),
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(NewResourceForm)