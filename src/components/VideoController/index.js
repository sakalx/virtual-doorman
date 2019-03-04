import React, {useState} from 'react';

import {connect} from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Tooltip from '@material-ui/core/Tooltip';

import {
  Container,
  PlayIcon,
  StopIcon,
} from './style';


function VideoController({doorStation}) {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handleStop = () => {
    setPlaying(false);
  };

  const isDisabled = !doorStation.selected;

  const toolTipTitle = isDisabled ? 'Select door station' : 'Display video';

  return (
    <Container>
      <IconButton aria-label='Previous' disabled={isDisabled}>
        <SkipPreviousIcon/>
      </IconButton>

      <Tooltip title={toolTipTitle}>
        <span>
          {playing
            ? <IconButton
              aria-label='Play/pause'
              color='secondary'
              onClick={handleStop}
            >
              <StopIcon/>
            </IconButton>
            : <IconButton
              aria-label='Play/pause'
              color='primary'
              disabled={isDisabled}
              onClick={handlePlay}
            >
              <PlayIcon/>
            </IconButton>
          }
        </span>
      </Tooltip>

      <IconButton aria-label='Next' disabled={isDisabled}>
        <SkipNextIcon/>
      </IconButton>

    </Container>
  )
}


const mapStateToProps = ({doorStation}) => ({
  doorStation,
});

export default connect(mapStateToProps, null)(VideoController);