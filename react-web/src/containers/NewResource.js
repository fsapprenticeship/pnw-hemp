import React from 'react';
import NewResourceForm from '../components/NewResourceForm';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
  }
}

class NewResource extends React.Component {
  render() {
    return (
      <div className='App-intro' style={styles.form}>
        <h1>New Resource</h1>
        <p>
          If you would like to add a new resource fill out the <br />
          following form and an admin will choose to approve/deny it.
        </p>
        <br />
        <NewResourceForm />
      </div>
    )
  }
}

export default NewResource;