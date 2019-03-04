import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import {connect} from "react-redux";

import ActionTab from './ActionTab';
import DeviceMonitorTab from './DeviceMonitorTab';
import OperatorsTab from './OperatorsTab';

import {
  Container,
  Tab,
} from './style';


function RightPanel() {
  const [tabIndex, setTabIndex] = React.useState(2);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container square>
      <AppBar position='sticky' color='default'>
        <Tabs
          value={tabIndex}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
        >
          <Tab label='Operators'/>
          <Tab label='Device monitor'/>
          <Tab label='Action'/>
        </Tabs>
      </AppBar>
      {tabIndex === 0 && <OperatorsTab/>}
      {tabIndex === 1 && <DeviceMonitorTab/>}
      {tabIndex === 2 && <ActionTab/>}
    </Container>
  )
}

export default RightPanel;