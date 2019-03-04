import styled, {css} from 'styled-components'

import Paper from '@material-ui/core/Paper';
import PlayArrow from '@material-ui/icons/PlayArrow';
import StopSharp from '@material-ui/icons/StopSharp';

const _size = css`
  height: 38px !important;
  width: 38px !important;
`;

export const Container = styled(Paper)`
  padding: 0 15px;
`;

export const PlayIcon = styled(PlayArrow)`
  ${_size}
`;

export const StopIcon = styled(StopSharp)`
  ${_size}
`;
