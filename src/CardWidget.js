import React from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import clsx from 'clsx'



const useStyles = makeStyles((theme) => createStyles({
  root: {
      minWidth: 30,
    //   maxWidth: 300,
    //   width: 300
  },
  title: {
    marginBottom: 10,
    align: 'center'
  },
  paddingStyle: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 10,
    // width: 200
  }
}));



export default function CardWidget ({ title, children, ...props }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, classes.paddingStyle, props.classes?.root)}>
      <CardContent className={props.classes?.content}>
        {title && <Typography variant='h6' color='textSecondary' className={classes.title}>
          {title}
        </Typography>}
        {children}
      </CardContent>
    </Card>
  )
};