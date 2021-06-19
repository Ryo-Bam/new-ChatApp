import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    "button": {
        backgroundColor: "#1b54b5",
        color: "#000",
        fontsize: 16,
        height: 48,
        marginBottom: 16,
        width: 256
    }
})

const PrimaryButton = (props) => {
    const classes = useStyles();
    return (
        <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
          {props.label}
        </Button>
    )
}

export default PrimaryButton