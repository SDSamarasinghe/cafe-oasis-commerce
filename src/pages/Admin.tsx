import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { products as initialProducts } from '@/data/products';
import { Product, Order, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminProductCard from '@/components/admin/AdminProductCard';
import ProductForm from '@/components/admin/ProductForm';
import { Plus, ListOrdered, Users } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const MOCK_ORDERS: Order[] = [
  {
    id: 'order1',
    items: [
      {
        product: initialProducts[0],
        quantity: 2
      }
    ],
    total: 10.98,
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890'
    },
    status: 'pending',
    createdAt: new Date()
  }
];

const Admin = () => {
  const { isAdmin, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([...initialProducts]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'users'>('products');
  
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
      toast.error('You need to login as admin to access this page');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  const handleAddProduct = () => {
    setCurrentProduct(undefined);
    setIsAddDialogOpen(true);
  };
  
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteProduct = (productId: string) => {
    const productToDelete = products.find(p => p.id === productId);
    setCurrentProduct(productToDelete);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSaveProduct = (product: Product) => {
    if (products.some(p => p.id === product.id)) {
      setProducts(currentProducts => 
        currentProducts.map(p => p.id === product.id ? product : p)
      );
    } else {
      setProducts(currentProducts => [...currentProducts, product]);
    }
    
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
  };
  
  const confirmDeleteProduct = () => {
    if (currentProduct) {
      setProducts(currentProducts => 
        currentProducts.filter(p => p.id !== currentProduct.id)
      );
      toast.success(`${currentProduct.name} has been deleted`);
    }
    setIsDeleteDialogOpen(false);
  };
  
  if (!isAuthenticated || !isAdmin) {
    return null;
  }
  
  return (
    <div className="min-h-screen py-12">
      <div className="cafe-container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cafe-espresso">
            Admin Dashboard
          </h1>
          
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setActiveTab('products')}
              className={activeTab === 'products' ? 'bg-cafe-brown text-white' : ''}
            >
              Products
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveTab('orders')}
              className={activeTab === 'orders' ? 'bg-cafe-brown text-white' : ''}
            >
              <ListOrdered className="mr-2 h-4 w-4" />
              Orders
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveTab('users')}
              className={activeTab === 'users' ? 'bg-cafe-brown text-white' : ''}
            >
              <Users className="mr-2 h-4 w-4" />
              Subscribed Users
            </Button>
          </div>
        </div>
        
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-cafe-lightBrown mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Product Management</h2>
              <Button 
                onClick={handleAddProduct}
                className="bg-cafe-brown hover:bg-cafe-darkBrown"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <AdminProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
            
            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products available</p>
                <Button 
                  onClick={handleAddProduct} 
                  className="mt-4 bg-cafe-brown hover:bg-cafe-darkBrown"
                >
                  Add Your First Product
                </Button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-cafe-lightBrown mb-8">
            <h2 className="text-xl font-semibold mb-6">Orders</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_ORDERS.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.quantity}x {item.product.name}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className="capitalize">{order.status}</span>
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {MOCK_ORDERS.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No orders yet</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-cafe-lightBrown mb-8">
            <h2 className="text-xl font-semibold mb-6">Subscribed Users</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscription Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...MOCK_ORDERS].map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>{order.customer.email}</TableCell>
                    <TableCell>
                      <span className="text-green-600">Subscribed</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {MOCK_ORDERS.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No subscribed users yet</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm 
            onSubmit={handleSaveProduct}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {currentProduct && (
            <ProductForm 
              product={currentProduct}
              onSubmit={handleSaveProduct}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{' '}
              <span className="font-semibold">{currentProduct?.name}</span>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteProduct}
              className="bg-destructive"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
