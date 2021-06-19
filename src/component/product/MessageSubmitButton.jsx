import React from 'react';
import {IconButton} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useSelector } from 'react-redux';
import { getUserName } from '../../reducks/users/selectors';
import {pushMessage} from '../../firebase/index'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    send: {
        color: "#1b54b5"
    }
})

const MessageSubmitButton = ({inputEl, setText, text}) => {
    const classes = useStyles();
    const selector = useSelector(state => state);
    const username = getUserName(selector)
    return (
        <IconButton disabled={text === ''} onClick={() => {
            pushMessage({name:{username}, text})
            setText('')
            inputEl.current.focus();
        }}
        >
            <SendIcon className={classes.send}/>
        </IconButton>
    )
}

export default MessageSubmitButton