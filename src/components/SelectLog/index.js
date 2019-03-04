import React, {useState, useRef} from 'react';

import useLabelWidth from 'root/hooks/useLabelWidth';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';

import {
  Form,
} from './style';


const selectList = ['Call log', 'another log', 'etc'];

function SelectLog() {
  const inputLabelRef = useRef(null);
  const [value, setValue] = useState('');
  const labelWidth = useLabelWidth(inputLabelRef);

  const handleChange = ({target}) => {
    setValue(target.value)
  };

  return (
    <Form variant='outlined'>
      <InputLabel ref={inputLabelRef} htmlFor='log-native-select'>
        Log
      </InputLabel>
      <Select
        native
        value={value}
        onChange={handleChange}
        input={
          <OutlinedInput
            labelWidth={labelWidth}
            id='log-native-select'
          />
        }
      >
        <option value=''/>
        {selectList.map((name, index) =>
          <option key={String(index)} value={name}>{name}</option>
        )}
      </Select>
    </Form>
  )
}

export default SelectLog;