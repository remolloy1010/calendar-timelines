import React from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
// import Theme from '../theme/types';
import clsx from 'clsx';
import { deepPurple, blue, green, orange, indigo } from '@material-ui/core/colors';
import CardWidget from './CardWidget';

const useStyles = makeStyles(() => createStyles({
  
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: blue[300],
    color: indigo[900]
  },
  primaryAvatar: {
    backgroundColor: deepPurple[200],
    color: deepPurple[500]
  },
  activeAvatar: {
    backgroundColor: indigo[200],
    color: indigo[900]
  },
  warningAvatar: {
    backgroundColor: orange[200],
    color: orange[500]
  },
  successAvatar: {
    backgroundColor: green[200],
    color: green[500]
  },
  icon: {
    width: 40,
    height: 40
  }
}));



export default function NumberCard ({ Icon, value, value2, value3, title, variant }) {
  const classes = useStyles();
  const avatarColor = classes[`${variant}Avatar`];
  return (
    <CardWidget classes={{ content: classes.content}} >
      <Avatar className={clsx(classes.avatar, avatarColor)}>
        <Icon className={classes.icon}/>
      </Avatar>
      <div className={classes.text}>
        <Typography variant='h6' color='textSecondary'>
          {title}
        </Typography>
        <Typography variant='h5' >
          {value}
        </Typography>
        {value2 && <Typography variant='h5' >
          {value2}
        </Typography>}
        {value3 && <Typography variant='h5' >
          {value3}
        </Typography>}
        
      </div>
    </CardWidget>
  )
};