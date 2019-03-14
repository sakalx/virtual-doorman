import React from 'react';

import {connect} from 'react-redux';

import string from 'root/utils/string';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import UserIcon from '@material-ui/icons/Person';

import {
  Item,
} from './style';

function OperatorsList({operators}) {
  return (
    <List>
      {operators.data.map(({ID, LOGIN_NAME, LIVE_AGENT_STATUS}) => {
        const status = string.removeUnderscore(LIVE_AGENT_STATUS);

        return (
          <ListItem key={String(ID)}>
            <ListItemIcon>
              <UserIcon/>
            </ListItemIcon>
            <Item primary={LOGIN_NAME} status={status}/>
            <Item primary={status} status={status}/>
          </ListItem>
        )
      })}
    </List>
  )
}

const mapStateToProps = ({operators}) => ({
  operators,
});

export default connect(mapStateToProps, null)(OperatorsList);