import React from 'react';
import {
  fullStackApprenticeship,
  cityByCity,
  findingWork
  } from '../directories';
import { Button, Input, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { API } from 'aws-amplify';
import sanity from "../lib/sanity"

export default class ProcessResourceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directory: props.formInfo.directory,
      schemas: [],
      schema: props.formInfo.schema,
      name: props.formInfo.name,
      description: props.formInfo.description,
      url: props.formInfo.url,
      author: props.formInfo.author,
      rank: props.formInfo.rank
    };
  }

  async componentDidMount() {
    this.updateSchemas();
  }

  updateSchemas() {
    switch (this.state.directory) {
      case 'fsa':
        this.setState({ schemas: fullStackApprenticeship })
        break;
      case 'cityGuide':
        this.setState({ schemas: cityByCity })
        break;
      case 'findingWork':
        this.setState({ schemas: findingWork })
        break;
      default:
        break;
    }
  }

  changeDirectory = async e => {
    await this.setState({
      directory: e.target.value
    })
    await this.updateSchemas();
  }

  handleFormApproval = async event => {
    event.preventDefault();

    const body = {
      resourceId: this.props.formInfo.resourceId,
      timestamp: this.props.formInfo.timestamp,
      directory: this.state.directory,
      schema: this.state.schema,
      name: this.state.name,
      description: this.state.description,
      author: this.state.url,
      url: this.state.url,
      rank: this.state.rank,
      approved: true      
    }

    const mutation = {
        _type: this.state.schema,
        title: this.state.name,
        overview: this.state.description,
        url: this.state.url,
        priority: this.state.rank
    }

    try {
      const response = await API.put('resources', '/resources', {body})
      console.log('approved response', response)
      console.log(JSON.stringify(mutation))
      sanity.create(mutation).then(response => {
        console.log('Document created: ', response)
      })
    } catch(e) {
      console.log("ERROR not approved", e)
    }
  }

  handleFormDenial = async event => {
    event.preventDefault();

    const body = {
      resourceId: this.props.formInfo.resourceId,
      timestamp: this.props.formInfo.timestamp,
      directory: this.state.directory,
      schema: this.state.schema,
      name: this.state.name,
      description: this.state.description,
      // author: this.state.url,
      url: this.state.url,
      rank: this.state.rank,
      approved: false      
    }

    try {
      const response = await API.put('resources', '/resources', {body})
      console.log('denied response', response)
    } catch(e) {
      console.log("ERROR not denied", e)
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
      <MenuItem key={i} value={item.name}>{item.name}</MenuItem>)
    return (
      <form className='newResourceForm'>
        <FormControl className="formElement">
          <InputLabel>Resource Name</InputLabel>
          <Input
              type="text"
              value={this.state.name}
              id="name"
              onChange={this.handleChange}
              required
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
        </FormControl>
        <br />

        <FormControl className='formElement'>
          <InputLabel>Schema Type</InputLabel>
          <Select value={this.state.schema}
                  required 
                  id="schema"
                  onChange={this.changeSchema}
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
              value={this.state.description}
              onChange={this.handleChange}
              required
          />
        </FormControl>
        <br />
        
        <FormControl className="formElement">
          <InputLabel>URL</InputLabel>
          <Input
              type="url"
              id="url"
              value={this.state.url}
              onChange={this.handleChange}
              required
          />
          <a href={this.props.formInfo.url} target='_blank' rel="noopener noreferrer">Visit Url</a>
        </FormControl>
        <br />

        {/* <FormControl className="formElement">
          <InputLabel>Resource Author</InputLabel>
          <Input
              type="text"
              id="author"
              value={this.state.author}
              onChange={this.handleChange}
              required
          />
        </FormControl> */}
        <br />

        <FormControl className="formElement">
          <InputLabel>Rank</InputLabel>
          <Input
              type="number"
              id="rank"
              min="1"
              max="100"
              value={this.state.rank}
              onChange={this.handleChange}
              required
          />
          <p className='small'>
            Give the content a rank between 1 and 100
          </p>
        </FormControl>
        <br />

        {/* Button need to either approve request and add to schemas 
        in proper directory, or delete request */}
        <div onClick={this.props.revert}>
          <Button onClick={this.handleFormApproval}>
            Approve Resource
          </Button>
          <Button onClick={this.handleFormDenial}>
            Deny Resource
          </Button>
        </div>

      </form>
    )
  }}