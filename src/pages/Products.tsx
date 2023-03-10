import { Button } from '@aws-amplify/ui-react';
import { useGetFile } from 'api/useGetFile';
import { Item, useListProduct, useListProductParams } from 'api/useListProduct';
import { Container } from 'components/Container';
import { Navbar } from 'components/Navbar';
import { chain, isEqual, truncate } from 'lodash';
import { ROUTES } from 'myConstants';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TProduct } from './ProductCreation';

const DEFAULT_PRODUCT_URL = `${process.env.PUBLIC_URL}/product.webp`;
const DEFAULT_PAGE_SIZE = 10;

export default function Products() {
  const [variables, setVariables] = useState<useListProductParams>({
    limit: DEFAULT_PAGE_SIZE,
  });

  const [products, setProducts] = useState<Item[]>([]);

  const { data } = useListProduct(variables);

  useEffect(() => {
    const newProducts = data?.data?.listProducts?.items || [];
    const combinedProducts = chain([...products, ...newProducts])
      .compact()
      .uniqWith(isEqual)
      .value();
    setProducts(combinedProducts);
  }, [data, products]);

  const nextToken = useMemo(() => {
    return data?.data?.listProducts?.nextToken || '';
  }, [data]);

  const handleNext = useCallback(() => {
    setVariables((prev) => ({ ...prev, nextToken }));
  }, [nextToken, setVariables]);

  return (
    <>
      <Navbar />
      <Container>
        <div className="text-right">
          <Link to={ROUTES.products.create}>
            <Button variation="primary" className="text-right mb-4">
              Create product
            </Button>
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-8">Product list</h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(154px, 1fr))',
            minHeight: 200,
            gap: '20px',
          }}
          className=" "
        >
          {products!.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
        </div>
        {nextToken && (
          <div className="flex justify-center w-full my-8">
            <Button onClick={handleNext}>Load more</Button>
          </div>
        )}
      </Container>
    </>
  );
}

export const Product = ({ product }: { product: TProduct }) => {
  const { description, image, name } = product;
  const { url } = useGetFile({ key: image });
  return (
    <div className="border">
      <div className="w-full h-[150px] ">
        <img
          className="w-full h-full object-cover"
          onError={(e) => {
            // @ts-ignore: Unreachable code error
            e.target.src = DEFAULT_PRODUCT_URL;
          }}
          alt={description}
          src={url || `${process.env.PUBLIC_URL}/product.webp`}
        />
      </div>
      <div className="p-4 ">
        <div className="font-bold">{truncate(name, { length: 15 })}</div>
        <div className=" ">{truncate(description, { length: 30 })}</div>
      </div>
    </div>
  );
};
