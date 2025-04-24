
import { Product } from '@/types';

// Sample product data
export const products: Product[] = [
  {
    id: '1',
    name: 'Espresso',
    description: 'A concentrated form of coffee served in small, strong shots.',
    price: 3.50,
    category: 'coffee',
    image: '/espresso.jpg',
    featured: true,
    ingredients: ['Coffee beans'],
    isAvailable: true
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'An espresso-based coffee drink with steamed milk foam.',
    price: 4.50,
    category: 'coffee',
    image: '/cappuccino.jpg',
    featured: true,
    ingredients: ['Espresso', 'Steamed milk', 'Milk foam'],
    isAvailable: true
  },
  {
    id: '3',
    name: 'Croissant',
    description: 'A flaky, buttery pastry of Austrian origin.',
    price: 3.25,
    category: 'food',
    image: '/croissant.jpg',
    ingredients: ['Flour', 'Butter', 'Sugar'],
    isAvailable: true
  },
  {
    id: '4',
    name: 'Blueberry Muffin',
    description: 'A small, sweet quickbread with fresh blueberries.',
    price: 3.75,
    category: 'food',
    image: '/blueberry-muffin.jpg',
    ingredients: ['Flour', 'Sugar', 'Blueberries', 'Butter'],
    isAvailable: true
  },
  {
    id: '5',
    name: 'Latte',
    description: 'Coffee drink made with espresso and steamed milk.',
    price: 4.25,
    category: 'coffee',
    image: '/latte.jpg',
    ingredients: ['Espresso', 'Steamed milk'],
    isAvailable: true
  },
  {
    id: '6',
    name: 'Chocolate Cake',
    description: 'Rich, moist chocolate layer cake with chocolate ganache.',
    price: 5.50,
    category: 'dessert',
    image: '/chocolate-cake.jpg',
    ingredients: ['Flour', 'Sugar', 'Cocoa powder', 'Butter'],
    isAvailable: true
  },
  {
    id: '7',
    name: 'Chai Tea',
    description: 'Spiced black tea with milk and honey.',
    price: 3.75,
    category: 'coffee',
    image: '/chai-tea.jpg',
    ingredients: ['Black tea', 'Spices', 'Milk', 'Honey'],
    isAvailable: true
  },
  {
    id: '8',
    name: 'Cafe Mug',
    description: 'Ceramic mug with our cafe logo.',
    price: 12.99,
    category: 'merchandise',
    image: '/cafe-mug.jpg',
    isAvailable: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
