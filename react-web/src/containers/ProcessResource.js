import React from 'react';
import ProcessResourceForm from '../components/ProcessResourceForm';
import { Card, CardContent, CardActions, Button, Typography, Grid } from '@material-ui/core/';
import { Select, MenuItem } from '@material-ui/core/';
import { API } from 'aws-amplify';

const styles = {
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  button: {
    display: 'flex',
    justifyContent: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
  },
  review: {
    display: 'flex',
    flexDirection: 'column'
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

class ProcessResource extends React.Component {
  constructor() {
    super();
    this.state = {
      links: [],
      processing: false,
      processingForm: null,
      searchingFor: 'fsa'
    }

  }

  async componentDidMount() {
    const response = await API.get('resources', `/resources/${this.state.searchingFor}`)
    let notReviewed = response.filter(resource => resource.approved === undefined)
    this.setState({ links: notReviewed })
  }

  handleProcessResource (item, index) {
    this.setState({ 
      processing: true,
      processingForm: item
    });
  }

  changeDirectorySearch = async event => {
    await this.setState({
      searchingFor: event.target.value
    })
   const response = await API.get('resources', `/resources/${this.state.searchingFor}`);
   let notReviewed = response.filter(resource => resource.approved === undefined)

   this.setState({ links: notReviewed })
  }
  
  revert = () => {
    this.setState({ processing: false })
  }

  render() {
    let toProcess = this.state.links.map((item, index) => {
      return (
        <Grid key={index} item xs={6} sm={6} md={4} lg={3} xl={2}>
          <Card style={{ margin: 15}}>
            <CardContent>
                <Typography style={styles.title}>
                { item.name}
                </Typography>                
            </CardContent>
            <CardContent>
              <Typography>
                {item.description}
              </Typography>
            </CardContent>
            <CardActions style={styles.button}>
              <Button onClick={() => this.handleProcessResource(item, index)}>
                View/Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      
      )
    })
    return !this.state.processing ?
      <div className='App-intro' style={styles.review}>
        <h1 style={{ textAlign: 'center' }}>Resource Approval</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <h4>Select Which Resource Directory to take a look at: </h4>
          <Select  value={this.state.searchingFor}
                   onChange={this.changeDirectorySearch} 
                   style={{ marginLeft: 15 }}
                   autoWidth
                   >
            <MenuItem value='fsa'>FSA</MenuItem>
            <MenuItem value='cityGuide'>City Guide</MenuItem>
            <MenuItem value='findingWork'>Finding Work</MenuItem>
          </Select>
        </div>
        <div style={styles.list}>
          {toProcess}
        </div>
      </div>
    : 
      <div className='App-intro' style={styles.form}>
        <h1>Processing Resource</h1>
        <p>
          Check over the resource for spelling / punctuation <br />
          errors and give it your approval or the boot
        </p>
        <ProcessResourceForm formInfo={this.state.processingForm} revert={this.revert}/>
      </div>     
  }
}

export default ProcessResource;