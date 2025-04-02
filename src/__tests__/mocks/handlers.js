import { rest } from 'msw';

export const handlers = [
  // Mock product API
  rest.get(`${import.meta.env.VITE_BASE_URL}/v1/api/products/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          {
            productId: 1,
            name: "Test Product",
            urlName: "test-product",
            companyName: "Test Company",
            modelName: "Test Model",
            category: { title: "Test Category" },
            brand: { title: "Test Brand" }
          }
        ]
      })
    );
  }),

  // Mock user API
  rest.get(`${import.meta.env.VITE_BASE_URL}/v1/api/users/me`, (req, res, ctx) => {
    const token = req.headers.get('Authorization');
    if (token === 'Bearer valid-token') {
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          name: "Test User",
          email: "test@example.com",
          role: "ROLE_USER",
          image: "/path/to/image.jpg"
        })
      );
    }
    return res(ctx.status(401));
  }),
];