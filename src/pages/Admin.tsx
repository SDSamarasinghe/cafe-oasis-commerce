
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { products as initialProducts } from '@/data/products';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import AdminProductCard from '@/components/admin/AdminProductCard';
import ProductForm from '@/components/admin/ProductForm';
import { Plus } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const Admin = () => {
  const { isAdmin, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([...initialProducts]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  
  // Redirect if not admin
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
      toast.error('You need to login as admin to access this page');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  // Handle create product
  const handleAddProduct = () => {
    setCurrentProduct(undefined);
    setIsAddDialogOpen(true);
  };
  
  // Handle edit product
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };
  
  // Handle delete product
  const handleDeleteProduct = (productId: string) => {
    const productToDelete = products.find(p => p.id === productId);
    setCurrentProduct(productToDelete);
    setIsDeleteDialogOpen(true);
  };
  
  // Create or update product
  const handleSaveProduct = (product: Product) => {
    if (products.some(p => p.id === product.id)) {
      // Update existing product
      setProducts(currentProducts => 
        currentProducts.map(p => p.id === product.id ? product : p)
      );
    } else {
      // Add new product
      setProducts(currentProducts => [...currentProducts, product]);
    }
    
    // Close dialogs
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
  };
  
  // Confirm delete product
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
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="min-h-screen py-12">
      <div className="cafe-container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cafe-espresso">
            Admin Dashboard
          </h1>
          
          <Button 
            onClick={handleAddProduct}
            className="bg-cafe-brown hover:bg-cafe-darkBrown"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        {/* Product Management */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-cafe-lightBrown mb-8">
          <h2 className="text-xl font-semibold mb-6">Product Management</h2>
          
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
      </div>
      
      {/* Add Product Dialog */}
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
      
      {/* Edit Product Dialog */}
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
      
      {/* Delete Confirmation Dialog */}
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
