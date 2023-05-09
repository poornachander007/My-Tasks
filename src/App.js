import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const TagButton = props => {
  const {obj, onClickActiveTag} = props
  const {displayText, optionId} = obj
  const onClickTag = () => {
    onClickActiveTag(optionId)
  }

  return (
    <li className="li_tagButton_container">
      <button onClick={onClickTag} type="button">
        {displayText}
      </button>
    </li>
  )
}

const TaskItem = props => {
  const {obj} = props
  const {taskInput, displayText} = obj
  return (
    <li className="li_task_container">
      <p className="task_taskInput_para">{taskInput}</p>
      <p className="tagName_para">{displayText}</p>
    </li>
  )
}

// Replace your code here
class App extends Component {
  state = {
    activeTagId: false,
    optionId: tagsList[0].optionId,
    tagName: tagsList[0].displayText,
    taskInput: '',
    tasksList: [],
  }

  onChangeTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTagInput = event => {
    this.setState({optionId: event.target.value})
  }

  onClickActiveTag = optionId => {
    this.setState({activeTagId: optionId})
  }

  onAddTask = event => {
    event.preventDefault()
    const {taskInput, optionId} = this.state
    const itemObj = tagsList.find(item => item.optionId === optionId)
    const {displayText} = itemObj
    const obj = {taskInput, optionId, displayText}
    this.setState(preState => ({
      tasksList: [...preState.tasksList, obj],
      taskInput: '',
      optionId: tagsList[0].optionId,
    }))
  }

  render() {
    const {taskInput, tasksList, activeTagId, tagName, optionId} = this.state
    let finalList
    if (activeTagId !== false) {
      finalList = tasksList.filter(item => item.optionId === activeTagId)
    } else {
      finalList = tasksList
    }
    return (
      <div className="page_container">
        <div className="left_container">
          <h1 className="left_heading">Create a task!</h1>
          <form onSubmit={this.onAddTask} className="form">
            <div className="input_container">
              <label htmlFor="Task" className="label">
                Task
              </label>
              <input
                type="text"
                placeholder="Enter the task here"
                className="input"
                onChange={this.onChangeTaskInput}
                value={taskInput}
                id="Task"
              />
            </div>
            <div className="input_container">
              <label htmlFor="Tag" className="label">
                Tags
              </label>
              <select
                value={optionId}
                onChange={this.onChangeTagInput}
                className="input"
                id="Tag"
              >
                {tagsList.map(item => (
                  <option key={item.optionId} value={item.optionId}>
                    {item.displayText}
                  </option>
                ))}
              </select>
            </div>
            <div className="button_container">
              <button type="submit">Add Task</button>
            </div>
          </form>
        </div>
        <div className="right_container">
          <h1 className="right_headings">Tags</h1>
          <ul className="tags_buttons_container">
            {tagsList.map(item => (
              <TagButton
                onClickActiveTag={this.onClickActiveTag}
                obj={item}
                key={uuidv4()}
              />
            ))}
          </ul>
          <h1 className="right_headings">Tasks</h1>
          <div className="tasks_container">
            {finalList.length === 0 ? (
              <div className="empty_tasks_container">
                <p className="empty_tasks_description">No Tasks Added Yet</p>
              </div>
            ) : (
              <ul className="ul_tasks_container">
                {finalList.map(item => (
                  <TaskItem key={uuidv4()} obj={item} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
