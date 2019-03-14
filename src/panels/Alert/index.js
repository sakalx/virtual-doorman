import React from 'react';

import {connect} from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Header from './Header';
import Alert from './Alert';

import {
  Container,
} from './style'

function AlertPanel({notifications}) {

  const sortingAlgorithm = (curr, next) => {
    if (!curr.accepted_time) return -1;
    return curr.resolved_time - next.resolved_time;
  };

  return (
    <Container>
      <Table>
        <Header/>
        <TableBody>
          {Object.values(notifications.data)
            .sort(sortingAlgorithm)
            .map((notification) => (
              <Alert key={String(notification.id)} notification={notification}/>
            ))}
        </TableBody>
      </Table>
    </Container>
  );
}

const mapStateToProps = ({notifications}) => ({
  notifications,
});

export default connect(mapStateToProps, null)(AlertPanel);