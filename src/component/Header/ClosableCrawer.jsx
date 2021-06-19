import React,{useCallback,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {TextInput} from '../UIkit/index'; 
import { useDispatch } from 'react-redux';
import {signOut} from '../../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]:{
            flexShrink: 0,
            width: 256
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: 256
    },
    searchField: {
        alignItems: 'center',
        display: 'flex',
        marginLeft: 32
    }
}))


const ClosableDrawer = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const {container} = props;

    const [keyword, setKeyWord] = useState("");

    const inputKeyWord = useCallback((event) => {
        setKeyWord(event.target.value)
    },[setKeyWord])



    return (
        <nav className={classes.drawer}>
            <Drawer 
                container={container}
                variant="temporary"
                anchor="right"
                open={props.open}
                onClose={(e) => props.onClose(e)}
                classes={{paper: classes.drawer}}
                ModalProps={{keepMounted: true}}
            >
                <div className={classes.searchField}>
                    <TextInput 
                        fullWidth={false} label={"キーワードを入力"} multiline={false}
                        onChange={inputKeyWord} required={false} rows={1} value={keyword} type={"text"}
                    />
                </div>
                <Divider />
                <List>
                    <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Logout"} />
                    </ListItem>
                </List>
            </Drawer>      
        </nav>
    )
}

export default ClosableDrawer;