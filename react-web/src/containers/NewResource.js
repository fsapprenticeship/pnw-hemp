import React from 'react';
import NewResourceForm from '../components/NewResourceForm';
import TopNavbar from "../components/TopNavbar"

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'left',
    paddingLeft: 20
  }
}

class NewResource extends React.Component {
  render() {
    return (
      <div className='App-intro' style={styles.form}>
        <h1>New Bulletin Item</h1>
        
        <br />
        <NewResourceForm />
      </div>
    )
  }
}

export default NewResource;