import React,{useCallback, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selectors';
import {push} from 'connected-react-router';
import {HeaderMenus,ClosableDrawer} from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuBar: {
      backgroundColor: "#1b54b5",
      color: "#fff"
  },
  toolBar: {
      margin: '0 auto',
      maxWidth: 1024,
      width: '100%'
  },
  iconButtons: {
      margin: '0 0 0 auto'
  },
}));

const Header = () => {
    const classes = useStyles();
    const selector = useSelector((state) => state);
    const dispatch = useDispatch();
    const isSignedIn = getIsSignedIn(selector)

    const [open, setOpen] = useState(false)
    const handleDrawerToggle = useCallback((event) => {
        if (event.type === 'keydown' && (event.key === 'tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(!open)
    },[setOpen, open])

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolBar}>
                    <p onClick={() => dispatch(push('/'))}>
                        ２回目だじょ
                    </p>
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                            <HeaderMenus handleDrawerToggle={handleDrawerToggle}/>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <ClosableDrawer open={open} onClose={handleDrawerToggle} />
        </div>
    )
    
}

export default Header;