import React from 'react';

import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import HangUpButton from 'root/components/HangUpButton';
import SelectBuilding from 'root/components/SelectBuilding';
import UnlockDoorStation from 'root/components/UnlockDoorStation';
import VideoController from 'root/components/VideoController';
import OperatorScript from 'root/components/OperatorScript';

import {
  Container,
  ControllerContainer,
  PiP,
} from './style';

function LeftPanel({building}) {
  return (
    <Container>
      <SelectBuilding/>

      <PiP/>

      <OperatorScript disabled={!building.selected.ID}/>

      <div>
        <Typography color='textSecondary' variant='subtitle2'>
          Package room direction
        </Typography>
        <Paper style={{width: '100%', height: '100px'}}/>
      </div>

      <UnlockDoorStation/>

      <ControllerContainer>
        <VideoController/>
        <HangUpButton size='large' style={{margin: '0 25px'}}/>
      </ControllerContainer>

    </Container>
  )
}

const mapStateToProps = ({building}) => ({
  building,
});

export default connect(mapStateToProps, null)(LeftPanel);