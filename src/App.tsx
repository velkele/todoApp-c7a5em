import { useState } from 'react';
import './App.css';
import { type TodoType } from './types';
import { createId } from '@paralleldrive/cuid2';
import { Todo } from './todo';

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [query, setQuery] = useState<string | undefined>();
  const [todoInput, setTodoInput] = useState<TodoType['description'] | undefined>();

  const filteredTodos = todos.filter((todo) =>
    query !== undefined
      ? todo.description.toLowerCase().includes(query.toLowerCase())
      : true
  );
  function addTodo(): void {
    if (todoInput === undefined) return;
    setTodos((prev) => [
      ...prev,
      {
        description: todoInput,
        completed: false,
        id: createId(),
      },
    ]);
  }

  return (
    <>
      <div>
        Todo List
        {JSON.stringify(todos, null, 2)}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
            setTodoInput('');
          }}
        >
          <label>
            Todo
            <input
              type="text"
              name="todo-description"
              value={todoInput ?? ''}
              onChange={(ev) => {
                setTodoInput(ev.target.value);
              }}
            />
          </label>
          <button type="submit">Add</button>
        </form>
        <label>
          Search a todo
          <input
            type="text"
            onChange={(ev) => {
              setQuery(ev.target.value);
            }}
          />
        </label>
        {filteredTodos.map((todo) => (
          <Todo todo={todo} setTodos={setTodos} />
        ))}
      </div>
    </>
  );
}

export default App;
