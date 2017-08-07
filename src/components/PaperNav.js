import React from 'react'
import Paper from 'material-ui/Paper';

const muiStyles = {
  paper: {
    margin:"5px auto",
    padding: "5px 0",
    maxWidth: "772px",
    display: "flex",
    justifyContent: "center"
  }
}

const PaperNav = props => (
  <Paper zDepth={2} style={ muiStyles.paper } className={ props.className }>
    { props.children }
  </Paper>
)

export default PaperNav