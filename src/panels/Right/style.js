import styled from 'styled-components'

import MaterialTab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

export const Container = styled(Paper)`
  flex: 1 1 35%;
  margin: 0 5px;
  height: 100%;
  overflow-y: auto;
`;

export const Tab = styled(MaterialTab)`
  min-width: unset !important;
`;

// Action tab
export const Row = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 20px 5px 15px 5px;
`;

export const ActionLog = styled('div')`
  margin: 15px 5px;
`;