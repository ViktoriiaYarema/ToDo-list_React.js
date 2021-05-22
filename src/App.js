import React, {useEffect, useState} from 'react';
import './App.css';
import ToDoItem from './ToDoItem/ToDoItem';
import dataApi from './dataApi';

const App = () => {

  useEffect(() => {
    if(dataItems.length === 0){
      localStorage.clear();
    }
  });
  
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
    const upDateToDoItems = [...dataItems];
    upDateToDoItems[index].complete = !upDateToDoItems[index].complete;
    localStorage.setItem('dataItems', JSON.stringify(upDateToDoItems));
    setToDoItems(upDateToDoItems);
  }

  const addItem = () => {   
      let newId = dataItems.length + 1;
      let newArr = [
        ...dataItems, 
        {
          id : newId,
          description : newItem,
          complete : false
        }
      ];
      localStorage.setItem('dataItems', JSON.stringify(newArr));
      setToDoItems(newArr);
      setNewItem('');
  }

  const deleteItem = deletedItem => {   
    const upDateDeletedItems = dataItems.filter(item => item !== deletedItem);
    localStorage.setItem('dataItems', JSON.stringify(upDateDeletedItems));
    setToDoItems(upDateDeletedItems);
  }


  const activeTasks = dataItems.filter(item => item.complete === false);
  const completedTasks = dataItems.filter(item => item.complete === true);
  const toDoList = [...activeTasks, ...completedTasks].map((item, index) => {
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
