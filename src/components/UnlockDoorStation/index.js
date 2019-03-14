import React, {useRef} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectDoorStation} from 'root/redux-core/actions/doorStation';

import useLabelWidth from 'root/hooks/useLabelWidth';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';

import {
  Container,
  UnlockBtn,
} from './style';

const listOfDoorStation = ['Door A', 'Door B'];

function UnlockDoorStation({building, doorStation, selectDoorStation}) {
  const inputLabelRef = useRef(null);
  const labelWidth = useLabelWidth(inputLabelRef);

  const handleChange = ({target}) => {
    selectDoorStation(target.value);
  };

  const handleUnlock = () => {

  };

  return (
    <Container>
      <UnlockBtn
        color='primary'
        disabled={!doorStation.selected}
        onClick={handleUnlock}
        variant='contained'
      >
        Unlock
      </UnlockBtn>

      <FormControl variant='outlined' fullWidth>
        <InputLabel ref={inputLabelRef} htmlFor='door-station-native-select'>
          Door station
        </InputLabel>

        <Select
          disabled={!building.selected.ID}
          native
          value={doorStation.selected}
          onChange={handleChange}
          input={
            <OutlinedInput
              labelWidth={labelWidth}
              id='door-station-native-select'
            />
          }
        >
          <option value=''/>
          {listOfDoorStation.map((name, index) =>
            <option key={String(index)} value={name}>{name}</option>
          )}
        </Select>
      </FormControl>

    </Container>
  )
}

const mapStateToProps = ({building, doorStation}) => ({
  building,
  doorStation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  selectDoorStation
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UnlockDoorStation);