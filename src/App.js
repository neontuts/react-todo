import React from 'react';
// import logo from './img/logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    const data = localStorage.getItem("React-Todo");
    this.state = {
      newItem: "",
      list: (data !== null) ? JSON.parse(data) : []
    }
  }

  // Adds new Todo to the list.
  addItem(todoValue){
    if(todoValue !== ""){
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false
      };
      const newList = [...this.state.list];
      newList.push(newItem);

      // Set Todo List to localStorage
      localStorage.setItem("React-Todo", JSON.stringify(newList));

      this.setState({
        list: newList,
        newItem: ""
      });
    }
  }

  // Delete the Todo from the list.
  deleteItem(id){
    const currentList = [...this.state.list];
    const updatedList = currentList.filter(item => item.id !== id);

    // Set Todo List to localStorage
    localStorage.setItem("React-Todo", JSON.stringify(updatedList));

    this.setState({ list: updatedList });
  }

  // When the user filled the input field, The newItem in the state gets updated.
  updateInput(input){
    this.setState({ newItem: input });
  }

  // When Enter key pressed, Display the new todo.
  submitOnEnter(event){
    if (event.key === "Enter") {
      this.addItem(event.target.value);
    }
  }

  // Completed Todos
  completeTodo(isdone, id){
    const currentList = [...this.state.list];
    const changeIsDone = currentList.map(item => {
      if (item.id === id) {
        item.isDone = isdone ? false : true;
        return item;
      }
      return item;
    });

    // Set Todo List to localStorage
    localStorage.setItem("React-Todo", JSON.stringify(changeIsDone));

    this.setState({ list: changeIsDone });
  }

  // Clear All the Todos
  clearAll() {
    if (this.state.list.length !== 0) {
      this.setState({ list: [] });
      localStorage.clear();
    }
  }

  // Shows Today's Date.
  showDate(){
    const today = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return today.toLocaleDateString("en-US", options);
  }

  render(){
    return (
      <div className="container">
        <div className="header">
          <div className="clear">
            <i
             className="fa fa-refresh"
             onClick={ () => this.clearAll() }
            ></i>
          </div>
          <div id="date">{ this.showDate() }</div>
        </div>
        <div className="content">
          <ul id="list">
            {this.state.list.map(item => {
              return (
                <li className="item" key={ item.id }>
                  <i
                   className={ `fa ${item.isDone ? 'fa-check-circle' : 'fa-circle-thin'} co` }
                   id={ item.id }
                   onClick={ () => this.completeTodo(item.isDone, item.id) }
                  ></i>
                  <p className={ `text ${item.isDone ? 'lineThrough' : ''}` }>{ item.value }</p>
                  <i
                   className="fa fa-trash de"
                   id={ item.id }
                   onClick={ () => this.deleteItem(item.id) }
                  ></i>
                </li>
              );
            })}

          </ul>
        </div>
        <div className="add-to-do">
          <i className="fa fa-plus-circle" id="plusBtn"></i>
          <input
           type="text"
           id="input"
           placeholder="Add a Todo..."
           value={ this.state.newItem }
           onChange={ e => this.updateInput(e.target.value) }
           onKeyPress={ e => this.submitOnEnter(e) }
          />
        </div>
      </div>
    );
  }
}

export default App;