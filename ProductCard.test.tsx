import { render, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';

const product = {
  name: 'Test Product',
  price: '999.99',
  imageUrl: '/test-image.jpg'
};

test('renders product card', () => {
  render(<ProductCard product={product} />);
  expect(screen.getByText('Test Product')).toBeInTheDocument();
  expect(screen.getByText('R$999.99')).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', '/test-image.jpg');
});
