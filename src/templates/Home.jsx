import React from 'react'
// import {signOut} from '../reducks/users/operations'
import {TextIn} from '../component/product/TextIn'
import {makeStyles} from '@material-ui/core/styles'
import MessageList from '../component/product/MessageList'

const useStyles = makeStyles({
    rot: {
        display: 'grid',
        height: '86vh',
        gridTemplateRows: '1fr auto',
        maxWidth: 1024,
        margin: '0 auto'
    }
})


const Home = () => {
    const classes = useStyles()
    // const dispatch = useDispatch()
    // const selector = useSelector(state => state)
    // const uid = getUserId(selector)
    // const username = getUserName(selector)
    return (
        <div className={classes.rot}>
            <MessageList/>
            <TextIn />
        </div>
    )
}

export default Home;
