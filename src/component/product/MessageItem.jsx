import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getEmail } from '../../reducks/users/selectors';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import {gravatarPath} from './gravatar';

const useStyles = makeStyles({
    inline: {
        display: 'inline'
    }
})

const MessageItem = ({isLastItem, text, name}) => {
    const ref = useRef(null)
    const classes = useStyles()
    const selector = useSelector(state => state);
    const email = getEmail(selector)
    const avatarPath = gravatarPath({email})


    useEffect(() => {
        if (isLastItem) {
            ref.current.scrollIntoView({behavior: 'smooth'})
        }
    },[isLastItem])

    return (
        <ListItem divider={true} ref={ref}>
        <ListItemAvatar>
          <Avatar src={avatarPath} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {text}
              </Typography>
          }
        />
      </ListItem>
        

    )
}

export default MessageItem;