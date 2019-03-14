import styled from 'styled-components'

import Paper from '@material-ui/core/Paper';

export const Container = styled(Paper)`
  flex: 1 1 15%;
  margin: 0 5px;
`;

export const ControllerContainer = styled(Paper)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding: 8px;
`;

export const PiP = styled(Paper)`
  height: 250px;
  margin-top: 15px;
  width: 100%;
`;