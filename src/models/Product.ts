export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  userId: number;
  categoryId: number;
}

export interface CreateProductBody {
  name: string;
  price: number;
  stock: number;
  userId: number;
  categoryId: number;
}

export interface UpdateProductBody {
  name?: string;
  price?: number;
  stock?: number;
  userId?: number;
  categoryId?: number;
}

let products: Product[] = [
  { id: 1, name: 'Café de Olla', price: 150, stock: 50, userId: 1, categoryId: 1 },
  { id: 2, name: 'Tostada Grande', price: 45, stock: 120, userId: 1, categoryId: 2 },
  { id: 3, name: 'Chilango Rojo', price: 28, stock: 200, userId: 2, categoryId: 2 },
];

let nextId = 4;

export const productStore = {
  findAll: (): Product[] => products,

  findById: (id: number): Product | undefined =>
    products.find((p) => p.id === id),

  create: (body: CreateProductBody): Product => {
    const product: Product = { id: nextId++, ...body };
    products.push(product);
    return product;
  },

  update: (id: number, body: UpdateProductBody): Product | undefined => {
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    const product = products[idx];
    if (!product) return undefined;
    products[idx] = { ...product, ...body };
    return products[idx];
  },

  delete: (id: number): boolean => {
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    products.splice(idx, 1);
    return true;
  },
};   