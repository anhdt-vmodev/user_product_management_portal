export const ROUTES = {
  home: '/',
  signup: '/signup',
  login: '/login',
  products: {
    list: '/products',
    create: '/products/create',
    detail: (id: string) => {
      return `/products/${id}`;
    },
  },
};
