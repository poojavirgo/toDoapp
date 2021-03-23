
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    items: [],
    completeList:[],
    title: "",
    item: "",
    edit: false,
    isCompleted: false,
    error: ""
}
const items = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_ITEM:
            const newitem = {
                id: Date.now(),
                value: state.title,
                isCompleted: state.isCompleted,
            }
            return {
                ...state,
                items: state.items.concat(newitem),
                title: "",
                error: ""
            }

        case actionTypes.EDIT_ITEM:
            var newList = [...state.items];
            var index = newList.indexOf(state.item);
            if (index !== -1) {
                newList[index].value = state.title;
                return {
                    ...state,
                    title: "",
                    edit: false,
                    items: newList,
                    error: ""
                }
            } else {
                return {
                    ...state
                }
            }
        case actionTypes.DELETE_ITEM:
            newList = [...state.items];
            index = newList.indexOf(state.item);
            if (index !== -1) {
                newList.splice(index, 1);
                return {
                    ...state,
                    items: newList
                }
            } else {
                return {
                    ...state
                }
            }
        case actionTypes.SET_TITLE:
            return {
                ...state,
                title: action.title
            }
        case actionTypes.SET_ITEM:
            return {
                ...state,
                item: action.item,
                error: ""
            }
            case actionTypes.SET_COMPLETELIST:
                const updatedItem = {
                    date: action.date,
                    item : action.item,   
                    isCompleted: !action.item.isCompleted,               
                }
                return {
                    ...state,
                    completeList: state.completeList.concat(updatedItem),
                }
        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.SET_EDIT:
            return {
                ...state,
                edit: true,
                error: ""
            }



        default:
            return state;
    }
}

export default items;