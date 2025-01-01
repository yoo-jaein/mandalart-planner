import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Mandalart Planner header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Mandalart Planner/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders the Load Plan button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Load Plan/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders a 9x9 grid', () => {
  render(<App />);
  const gridCells = screen.getAllByRole('textbox'); // 각 그리드 셀은 input 요소로 표시됨
  expect(gridCells).toHaveLength(81); // 9x9 = 81개 셀이 있어야 함
});
