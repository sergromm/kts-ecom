export const routerPaths = {
  root: '/',
  products: '/products',
  productId: ':productId',
  profile: { root: '/profile', me: 'profile/me', orders: 'profile/orders', favorites: 'profile/favorites' },
  about: '/about',
  categories: '/categories',
  checkout: '/checkout',
  signup: '/sign-up',
  signin: '/sign-in',
} as const;
