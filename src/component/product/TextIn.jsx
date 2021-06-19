import React,{useRef,useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Avatar, Grid } from '@material-ui/core';
import MessageField from './MessageField';
import MessageSubmitButton from './MessageSubmitButton';
import {gravatarPath} from './gravatar';
import {getEmail} from "../../reducks/users/selectors";
import {useSelector} from 'react-redux';



const useStyles = makeStyles({
    Form: {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: "26px",
        gridRow: 2
    },
})

export const TextIn = ({name}) => {
    const inputEl = useRef(null)
    const [text, setText] = useState('');
    const classes = useStyles();
    const selector = useSelector(state => state);
    const email = getEmail(selector)
    const avatarPath = gravatarPath({email})

    return (
        <>
            <form className={classes.Form}>
            <Grid container>
                <Grid item xs={1}>
                    <Avatar src={avatarPath}/>
                </Grid>
                <Grid item xs={10}>
                    <MessageField inputEl={inputEl} name={name} setText={setText} text={text} />

                </Grid>
                <Grid item xs={1}>
                    <Button variant="containd" color="primary">
                        <MessageSubmitButton inputEl={inputEl} name={name} setText={setText} text={text}/>
                    </Button>
                </Grid>
            </Grid>        
            </form>
        </>
    )
}
