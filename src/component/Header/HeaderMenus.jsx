import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    Icon:{
        color: '#fff'
    }
})
const HeaderMenus = (props) => {
    const classes = useStyles();
    return (
        <>
            <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
                <MenuIcon className={classes.Icon}/>
            </IconButton>
        </>
    )

}

export default HeaderMenus