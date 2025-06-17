import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

const handleResult = (data) => {
  if (data.detail) {
    alert("예측 오류: " + data.detail);
  } else {
    setResult(data);
  }
};