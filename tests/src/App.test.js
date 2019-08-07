import React from 'react'
import App from './App'
import {
  render,
  fireEvent,
  cleanup
} from '@testing-library/react'

afterEach(cleanup)

it('renders without crashing', () => {
  render(<App />)
})

it('shows counter', () => {
  const { getByText } = render(<App />)
  expect(getByText('Button has been clicked 0 times')).toBeTruthy()
})

it('shows counter based on initial props', () => {
  const { getByText } = render(<App initialCount={5} />)
  expect(getByText('Button has been clicked 5 times')).toBeTruthy()
})

it('has a "+1" button', () => {
  const { getByText } = render(<App />)
  expect(getByText('+1')).toBeTruthy()
})

it('increased counter by 1 when clicked', () => {
  const { getByText } = render(<App />)
  fireEvent.click(getByText('+1'))
  expect(getByText('Button has been clicked 1 time')).toBeTruthy()
  fireEvent.click(getByText('+1'))
  expect(getByText('Button has been clicked 2 times')).toBeTruthy()
})

it('renders the todos list', () => {
  const { getByTitle } = render(<App />)
  expect(getByTitle('Todos')).toBeTruthy()
})
