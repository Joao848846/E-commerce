import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 32px;
`;

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

interface ProductsResponse {
  products: Product[];
}

const fetchProducts = async (): Promise<ProductsResponse> => {
  const res = await fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=1&sortBy=id&orderBy=DESC');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return data;
};

const Home = () => {
  const { data, error, isLoading } = useQuery<ProductsResponse>(['products'], fetchProducts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <Container>
      {data?.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default Home;

