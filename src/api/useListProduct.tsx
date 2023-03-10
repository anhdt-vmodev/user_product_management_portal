import { API } from 'aws-amplify';
import { listProducts } from 'graphql/queries';
import { useEffect, useState } from 'react';
import { toastError } from 'utils/toast';

export interface useListProductParams {
  limit: number;
  nextToken?: string;
}
export const useListProduct = (params: useListProductParams) => {
  const [data, setData] = useState<IListProductResp>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const resp = await API.graphql({
          query: listProducts,
          variables: params,
        });

        setData(resp as IListProductResp);
      } catch (error) {
        toastError('Fetch Product failed');
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [params]);
  return { data, loading };
};

export interface IListProductResp {
  data: Data;
}

export interface Data {
  listProducts: ListProducts;
}

export interface ListProducts {
  items: Item[];
  nextToken: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
