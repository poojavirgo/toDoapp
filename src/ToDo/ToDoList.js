import React ,{Fragment} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions';

const useStyles = makeStyles({
    container: {
        padding: 16
    }
});


function TodoList({ todoList, setTitle, setItem, setEdit, deleteItem , setCompleteList, completeList}) {
    const classes = useStyles();
    console.log('todoList', todoList);
    console.log('completeList', completeList);

    

    const handleEdit = (item) => {
        setTitle(item.value);
        setEdit();
        setItem(item);
    }

    const handleDelete = (item) => {
        setItem(item);
        deleteItem();
    }

    const handleClick = (item)=>{
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        if(item.isCompleted === false){
            setCompleteList(item, date); 
        }      
    }
    
    const showListItems =(<List>
        {todoList.map((item,index) => {
            return (
                <ListItem key={item.id} button>
                    <ListItemIcon >
                    <Checkbox color="primary"  onClick={() => handleClick(item)}/>
                    </ListItemIcon>
                    <ListItemText primary={item.value} />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        })}
    </List>);

    const showCompleteListItems =(<List>
        <Typography variant="h6" color="primary">Completed Items</Typography> 
        {completeList.map(completedListitem => {
            return (
                <ListItem key={completedListitem.item.id} >
                    <ListItemIcon style={{marginLeft:"10px"}} >
                    <CheckCircleIcon color="primary"/>
                    </ListItemIcon>
                    <ListItemText primary={completedListitem.item.value} />
                    <ListItemSecondaryAction>
                       <span>
                       {completedListitem.date}
                       </span>
                  </ListItemSecondaryAction>
                </ListItem>
            )
        })}
    </List>);

    return (
        <Fragment>
         <Container className={classes.container} maxWidth="md">
           {todoList.length > 0 && showListItems}
         </Container>      
         <Container className={classes.container} maxWidth="md">
           {completeList.length > 0 && showCompleteListItems}
         </Container>
        </Fragment>
    
    )

}
const mapStateToProps = (state) => {
    return {
        todoList: state.items,
        completeList: state.completeList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTitle: (title) => dispatch(actionTypes.setTitle(title)),
        setItem: (item) => dispatch(actionTypes.setItem(item)),
        deleteItem: (item) => dispatch(actionTypes.deleteItem(item)),
        setEdit: () => dispatch(actionTypes.setEdit()),
        setCompleteList: (item, date)=> dispatch(actionTypes.setCompleteList(item, date)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);