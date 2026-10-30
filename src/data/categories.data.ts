export interface category {
    id: number;
    name: string;
    description: string;
}

export const categories: category[] = [
    { id: 1, name: 'Tecnología', description: 'Dispositivos electrónicos, computadoras y gadgets' },
    { id: 2, name: 'Ropa', description: 'Prendas de vestir, calzado y accesorios' },
    { id: 3, name: 'Hogar', description: 'Muebles, electrodomésticos y decoración' },
    { id: 4, name: 'Deportes', description: 'Artículos deportivos, fitness y actividades al aire libre' }
];