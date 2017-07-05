import React from 'react'
import Paper from 'material-ui/Paper';

const muiStyles = {
  paper: {
    maxWidth: '772px',
    width: '100%',
    margin: '15px auto'
  },
  img: {
    width: '100%'
  }
}

const PaperImg = props => (
  <Paper style={ muiStyles.paper } zDepth={2}>
    <img style={ muiStyles.img } src={ props.src } alt="" />
  </Paper>
)

export default PaperImg