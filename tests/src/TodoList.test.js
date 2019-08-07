import React from 'react'
import ReactDOM from 'react-dom'
import TodoList from './TodoList.js'
import {
  render,
  fireEvent,
  cleanup,
  act
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

it('renders without crashing', () => {
  render(<TodoList />)
})

it('has input to add todos', () => {
  const { getByLabelText } = render(<TodoList />)
  expect(getByLabelText('New todo:')).toBeTruthy()
})

it('adds todo when enter is pressed with content', () => {
  const { getByLabelText, getByDisplayValue, getByTitle, getByText, getByRole } = render(<TodoList />)
  fireEvent.change(getByLabelText('New todo:'), {target: {value: 'write tests'}})
  expect(getByDisplayValue('write tests')).toHaveValue('write tests')
  fireEvent.submit(getByRole('form'))
  expect(getByTitle('Todos')).toContainElement(getByText('write tests'))
})

it('renders todos from props', () => {
  const { getByTitle, getByText } = render(<TodoList initialTodos={[{id: 0, text: 'saved todo 1'}, {id: 1, text: 'saved todo 2'}]} />)
  expect(getByTitle('Todos')).toContainElement(getByText('saved todo 1'))
  expect(getByTitle('Todos')).toContainElement(getByText('saved todo 2'))
})

it('removes todo when x is clicked', () => {
  const { getByTitle } = render(<TodoList initialTodos={[{id: 0, text: 'delete me'}]} />)
  fireEvent.click(getByTitle('Delete todo'))
  expect([...getByTitle('Todos').children].length).toBe(0)
})

it('removes specific todo when x is clicked', () => {
  const { getAllByTitle, getByTitle, getByText } = render(<TodoList initialTodos={[{id: 0, text: 'let me stay'}, {id: 1, text: 'delete me'}, {id: 2, text: 'another todo'}]} />)
  fireEvent.click(getAllByTitle('Delete todo')[1])
  expect([...getByTitle('Todos').children].length).toBe(2)
  expect(getByTitle('Todos')).toContainElement(getByText('let me stay'))
  expect(getByTitle('Todos')).toContainElement(getByText('another todo'))
})

it('toggles todo', () => {
  const { getByTitle, getByText } = render(<TodoList initialTodos={[{id: 0, text: 'toggleMe'}]} />)
  fireEvent.click(getByTitle('Toggle todo'))
  expect(getByText('toggleMe')).toHaveClass('finished')
})

it('removed all todos', () => {
  const { getByTitle, getByText } = render(<TodoList initialTodos={[{id: 0, text: 'saved todo 1'}, {id: 1, text: 'saved todo 2'}]} />)
  fireEvent.click(getByText('Clear'))
  expect([...getByTitle('Todos').children].length).toBe(0)
})
