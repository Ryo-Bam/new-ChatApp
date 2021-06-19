import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import {pushMessage} from '../../firebase/index';
import { useSelector } from 'react-redux';
import { getUserName } from '../../reducks/users/selectors';

const useStyles = makeStyles({
    Text: {
        width: "100%"
    },
})

const MessageField = ({ inputEl,setText, text}) => {
    const [isComposed, setIsComposed] = useState(false) 
    const classes = useStyles();
    const selector = useSelector(state => state);
    const username = getUserName(selector)

    return (                   
        <TextField
        className={classes.Text}
        autoFocus
        inputRef={inputEl}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (isComposed) return;
  
          const text = e.target.value;
          if (text === '') 
          return;
          
          if (e.key === 'Enter') {
            pushMessage({ name:{username}, text });
            setText('');
            e.preventDefault();
          }
        }}
        onCompositionStart={() => setIsComposed(true)}
        onCompositionEnd={() => setIsComposed(false)}
        value={text}
        />
    )
}
export default MessageField;