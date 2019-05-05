import React from 'react';
import Add from '@material-ui/icons/Add';
import { Link } from "react-router-dom";

const styles = {
  button: {
    fontSize: 48,
    position: 'fixed',
    right: 15,
    bottom: 15,
    color: '#3700B3'
  }
}

export default () => {
  return (
    <Link to={`/resource/new`}>
      <Add className='material-icons' style={styles.button} />
    </Link>
  )
}