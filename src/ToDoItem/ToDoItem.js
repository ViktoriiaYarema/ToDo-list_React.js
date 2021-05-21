import React, {useState} from 'react';
import './ToDoItem.scss';

const ToDoItem = props => {
    const chekeItem = ['cheked-block'];

    return (
        <div className= {props.complete === true ? chekeItem : ['item']}>           
            <label className="checkbox">
                <input type="checkbox" className = "checkbox__item" 
                        onChange = {props.handleChange}
                        checked = {props.complete}/>
                <span className="checkmark"></span>
            </label> 
            <div>{props.descr}</div>
            <button className="btn-delete" onClick = {props.deleteItem}>X</button>           
        </div>
    )
}

export default ToDoItem;