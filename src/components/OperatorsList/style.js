import styled, {css} from 'styled-components'

import ListItemText from '@material-ui/core/ListItemText';

const getColorStatus = status => {
  switch (status) {
    case 'Offline':
      return '#cc554c';
    case 'Online':
      return '#48cc92';
  }
};

export const Item = styled(ListItemText)`
  flex: 1 !important;
  
  && span {
    ${({status}) => status && css`
      color: ${getColorStatus(status)}
    `}
  }
`;