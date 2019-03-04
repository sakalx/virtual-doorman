import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function () {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Alarm Time</TableCell>
        <TableCell>Building</TableCell>
        <TableCell>Door station</TableCell>
        <TableCell>Operator</TableCell>
        <TableCell>Attended</TableCell>
        <TableCell>Duration</TableCell>
        <TableCell>Alarm Type</TableCell>
        <TableCell/>
      </TableRow>
    </TableHead>
  )
}