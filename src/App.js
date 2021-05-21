import React, {useState} from 'react';
import './App.css';
import ToDoItem from './ToDoItem/ToDoItem';
import dataApi from './dataApi';

const App = () => {
  let myData = [];

  if(localStorage.length < 1) {
    myData = dataApi; 
  }  
  else {
    myData = JSON.parse(localStorage.getItem('dataItems'));
  }

  const [dataItems, setToDoItems] = useState(myData);
  const [newItem, setNewItem] = useState('');
  
  const handleChange = id => {
    const index = dataItems.map(item => item.id).indexOf(id);  
    const upDateToDoItems = [];
    dataItems.map(item => {
      return upDateToDoItems.push(item)
    });    
        if(upDateToDoItems[index].complete === false){
          upDateToDoItems[index].complete = true;
        } else {
          upDateToDoItems[index].complete = false;
        }
    setToDoItems(upDateToDoItems);
  }

  const addItem = () => {   
      let newId = dataItems.length + 1;
      setToDoItems([
        ...dataItems, 
        {
          id : newId,
          description : newItem,
          complete : false
        }
      ]);
      setNewItem('');
  }

  const deleteItem = deletedItem => {   
    const upDateDeletedItems = dataItems.filter(item => item !== deletedItem);
    setToDoItems(upDateDeletedItems);
  }

  const activeTasks = dataItems.filter(item => item.complete === false);
  const completedTasks = dataItems.filter(item => item.complete === true);
  const toDoList = [...activeTasks, ...completedTasks].map((item, index) => {
    localStorage.setItem('dataItems', JSON.stringify(dataItems));
    return(
      <ToDoItem 
        key = {index}
        descr = {item.description}
        complete = {item.complete}
        handleChange = {() => handleChange(item.id)}
        deleteItem = {() => deleteItem(item)}
      />
    );
  });
  
  return (
    <div className="app">
      <div className="container">        
        <div className="title">Список дел</div>
        <div className = "new-task">
          <input type ="text" 
                placeholder ="Введите новою задачу"
                value = {newItem} 
                onChange = {newValue => setNewItem(newValue.target.value)}
                />
          <button className = "btn-add" onClick = {addItem}>Добавь новою задачу</button>
        </div>
        {toDoList}
      </div>
    </div>
  );
}

export default App;
