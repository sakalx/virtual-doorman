import React from 'react';

import {
  ScriptField,
} from './style';


function OperatorScript({disabled}) {
  return (
    <ScriptField
      disabled={disabled}
      label='Operator script'
      multiline
      rows='3'
      variant='outlined'
    />
  )
}

export default OperatorScript;