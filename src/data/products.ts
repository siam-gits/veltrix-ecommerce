export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  { id: 1, name: "Wireless AirPods Pro", price: 249, image: "/api/placeholder/400/400", category: "Electronics" },
  { id: 2, name: "Leather Wallet", price: 89, image: "/api/placeholder/400/400", category: "Fashion" },
  { id: 3, name: "Smart Watch Ultra", price: 399, image: "/api/placeholder/400/400", category: "Electronics" },
  { id: 4, name: "Running Shoes", price: 129, image: "/api/placeholder/400/400", category: "Fashion" },
  { id: 5, name: "Mechanical Keyboard", price: 179, image: "/api/placeholder/400/400", category: "Electronics" },
  { id: 6, name: "Backpack Pro", price: 99, image: "/api/placeholder/400/400", category: "Fashion" },
];