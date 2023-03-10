import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { CreateProductMutation } from 'API';
import { createProduct } from 'graphql/mutations';
import { ROUTES } from 'myConstants';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastError, toastSuccess } from 'utils/toast';

interface useCreateProductParams {
  name: string;
  description: string;
  image: string;
}

export const useCreateProduct = () => {
  const navigate = useNavigate();

  const mutation = useCallback(
    async (params: useCreateProductParams) => {
      try {
        await API.graphql<GraphQLQuery<CreateProductMutation>>({
          query: createProduct,
          variables: { input: params },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });
        toastSuccess('Create product success');
        navigate(ROUTES.products.list);
      } catch (error) {
        toastError('Create product failed');
      }
    },
    [navigate]
  );

  return { mutation };
};
