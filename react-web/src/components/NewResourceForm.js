import React from 'react';
import {
  fullStackApprenticeship,
  cityByCity,
  findingWork
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
      directory: 'fsa',
      schemas: [],
      author: '',
      name: '',
      url: '',
      schema: 'Get Started',
      description: '',
      rank: '0'
    };
  }

  componentDidMount() {
    this.updateSchemas();
  }

  changeDirectory = async e => {
    await this.setState({
      directory: e.target.value
    })
    
    await this.updateSchemas();
  }

  updateSchemas() {
    switch (this.state.directory) {
      case 'fsa':
        this.setState({ 
          schemas: fullStackApprenticeship,
          schema: 'Get Started'
        })
        break;
      case 'cityGuide':
        this.setState({ 
          schemas: cityByCity,
          schema: 'Seattle'
        })
        break;
      case 'findingWork':
        this.setState({ 
          schemas: findingWork,
          schema: 'Community'
        })
        break;
      default:
        break;
    }
  }

  validateForm = () => {
    return this.state.name.length > 0 && this.state.description.length > 0 && this.state.url.length > 0; 
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const body = {
      resourceId: uuidv4(),
      directory: this.state.directory,
      // author: this.state.author,
      name: this.state.name,
      url: this.state.url,
      schema: this.state.schema,
      timestamp: Date.now(),
      description: this.state.description,
      rank: this.state.rank,
      approved: undefined
    }

    try {
      const response = await API.post('resources', '/resources', {body})
      console.log('fsa-sls Response', response)
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

  changeSchema = e => {
    this.setState({ schema: e.target.value })
  }

  render() {
    let schemas = this.state.schemas.map((item, i) => 
      <MenuItem key={i} value={item.type}>{item.name}</MenuItem>)
    return (
      <form className='newResourceForm'>
        <FormControl className="formElement">
          <InputLabel>Resource Name</InputLabel>
          <Input
              type="text"
              id="name"
              required
              onChange={this.handleChange}
          />
        </FormControl>
        <br />

        <FormControl className="formElement">
          <InputLabel>Directory</InputLabel>
          <Select value={this.state.directory} 
                  onChange={this.changeDirectory} 
                  required 
                  >
            <MenuItem value='fsa'>FSA</MenuItem>
            <MenuItem value='cityGuide'>City Guide</MenuItem>
            <MenuItem value='findingWork'>Finding Work</MenuItem>
          </Select>
          <br />

        </FormControl>
        <br />

        <FormControl className='formElement'>
          <InputLabel>Schema Type</InputLabel>
          <Select value={this.state.schema}
                  required 
                  onChange={this.changeSchema}
                  id="schema"
                  >
            {schemas}
          </Select>
        </FormControl>
        <br />
        
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
          <InputLabel>URL</InputLabel>
          <Input
              type="url"
              id="url"
              required
              onChange={this.handleChange}
          />
        </FormControl>
        <br />

        {/* Maybe this is automatic depending on who submitted resource? */}
        {/* <div className="formElement">
          <InputLabel>Resource Author</InputLabel>
          <Input
              type="text"
              id="author"
              onChange={this.handleChange}
          />
        </div> */}
        <br />

        <FormControl className="formElement">
          <InputLabel>Rank</InputLabel>
          <Input
              type="number"
              id="rank"
              min="1"
              max="100"
              required
              onChange={this.handleChange}
          />
          <p className='small'>
            Give the content a rank between 1 and 100
          </p>
        </FormControl>
        <br />

        {/* <div onClick={() => this.props.routeHome()}> */}
          <Button disabled={!this.validateForm()} onClick={this.handleSubmit}>Request</Button>
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