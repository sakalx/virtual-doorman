import React, {useRef} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectBuilding} from 'root/redux-module/actions/building';

import useLabelWidth from 'root/hooks/useLabelWidth';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


function SelectBuilding({building, selectBuilding}) {
  const inputLabelRef = useRef(null);
  const labelWidth = useLabelWidth(inputLabelRef);

  const handleChange = ({target}) => {
    const id = target.value;
    selectBuilding(id)
  };

  return (
    <FormControl variant='outlined' style={{width: '100%'}}>
      <InputLabel ref={inputLabelRef} htmlFor='building-native-select'>
        Building
      </InputLabel>
      <Select
        native
        value={building.selected.ID}
        onChange={handleChange}
        input={
          <OutlinedInput
            labelWidth={labelWidth}
            id='building-native-select'
          />
        }
      >
        <option value=''/>
        {building.data.map(({ID, NAME}) =>
          <option key={String(ID)} value={ID}>{NAME}</option>
        )}
      </Select>
    </FormControl>
  )
}

const mapStateToProps = ({building}) => ({
  building,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  selectBuilding,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SelectBuilding);