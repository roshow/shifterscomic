import React from 'react'
import Paper from 'material-ui/Paper';


const PaperNav = props => (
  <Paper zDepth={2} style={{margin:"10px auto", padding: "10px 0", maxWidth: "772px", display: "flex", justifyContent: "center" }}>
    { props.children }
  </Paper>
)

export default PaperNav