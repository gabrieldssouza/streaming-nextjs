import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const ExampleComponent = () => {
  return <div>Hello, World!</div>;
};

test('renders Hello, World!', () => {
  const { getByText } = render(<ExampleComponent />);
  expect(getByText('Hello, World!')).toBeInTheDocument();
});