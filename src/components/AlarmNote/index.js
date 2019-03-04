import React from 'react';

import {
  NoteField,
} from './style';


function AlarmNote() {
  return (
    <NoteField
      label='Alarm notes'
      multiline
      rows='4'
      variant='outlined'
    />
  )
}

export default AlarmNote;