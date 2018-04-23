import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function ToDos (props) {
  return (
    <div>
        <h3>Still Need To Do</h3>
        <ul>
          {props.list.map((todo) => (
            <li onClick={() => props.onFinishedToDo(todo.task)} key={todo.task}>
              <span>{todo.task}</span>
            </li>
          ))}
        </ul>
    </div>
  )
}

function FinishedToDos (props) {
  return (
    <div>
      <h3>Finished To Dos</h3>
        <ul className="right">
          {props.list.map((todo) => (
            <li onClick={() => props.onDeleteToDo(todo.task)} key={todo.task}>
              <span>{todo.task}</span>
            </li>
          ))}
         </ul>
     </div>
  )
}

class List extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      todos: [
        {
          task: 'Brush teeth',
          pending: true
        },
        {
          task: 'Wake up',
          pending: true
        },
      ],
      input: '',
    }
    this.handleFinishedToDo = this.handleFinishedToDo.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.handleAddToDo = this.handleAddToDo.bind(this)
    this.handleDeleteToDo = this.handleDeleteToDo.bind(this)
  }

  handleAddToDo() {
    this.setState((currentState) => {
      return {
        todos:currentState.todos.concat([{
          task: this.state.input,
          pending: true
        }]),
        input: ''
      }
    })
  }

  handleFinishedToDo(task) {
    this.setState((currentState) => {
      const todo = currentState.todos.find((todo) => todo.task === task)
      return {
        todos: currentState.todos.filter((todo) => todo.task !== task)
         .concat([{
           task,
           pending: !todo.pending
         }])
      }
    })
  }

  handleDeleteToDo(task) {
    this.setState((currentState) => {
      return {
        todos: currentState.todos.filter((todo) => todo.task !== task)

      }
    })
  }

  updateInput(e) {
    const value = e.target.value;
    this.setState({
      input: value
    })
  }

  render() {
    return (
      <div>
         <h1>Nifty To-Do List</h1>
      <h2>List Your To-Dos</h2>
        <input
          type='text'
          placeholder='What do you have to do?'
          value={this.state.input}
          onChange={this.updateInput}
        />
        <button onClick={this.handleAddToDo}>
          Add
        </button>

        <div className="row">
      <div className="col-sm-6">
        <ToDos
          list={this.state.todos.filter((todo) => todo.pending === true)}
           onFinishedToDo={this.handleFinishedToDo}
         />
          </div>
          <div className="col-sm-6">
        <FinishedToDos
          list={this.state.todos.filter((todo) => todo.pending === false)}
          onDeleteToDo={this.handleDeleteToDo}
         />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<List />, document.getElementById('app'))
