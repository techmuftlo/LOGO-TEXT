import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [

    index(
      "routes/home.tsx"
    ),

    route(
      "category/:slug",
      "routes/category.tsx"
    ),

    route(
      "product/:id",
      "routes/product.tsx"
    ),

    route(
      "reviews",
      "routes/reviews.tsx"
      
    ),
route(
  "products",
  "routes/products.tsx"
),
    route(
      "cart",
      "routes/Cart.tsx"
    ),

  ]),
] satisfies RouteConfig;