import React from 'react';
import '../stylesheets/Celebrity.css'

function Celebrity(props) {
  return(
    <tr className="Celebrity">
      <td><img src={props.pictureUrl} alt="celebrity"/></td>
      <td>{props.name}</td>
      <td>{props.popularity}</td>
    </tr>
  )
}

export default Celebrity;