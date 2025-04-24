
import React from 'react';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash } from 'lucide-react';

interface AdminProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const AdminProductCard: React.FC<AdminProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="h-full flex flex-col">
      {/* Product Image */}
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image || "/placeholder.svg"} 
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          {product.isAvailable ? (
            <Badge className="bg-green-600">Available</Badge>
          ) : (
            <Badge variant="outline" className="bg-red-100 text-red-600 border-red-300">
              Unavailable
            </Badge>
          )}
          
          {product.featured && (
            <Badge className="ml-1 bg-cafe-orange">Featured</Badge>
          )}
        </div>
      </div>
      
      <CardContent className="flex-grow p-4">
        {/* Category */}
        <p className="text-xs uppercase text-cafe-brown font-medium">
          {product.category}
        </p>
        
        {/* Product Name */}
        <h3 className="font-semibold text-lg mt-1">{product.name}</h3>
        
        {/* Price */}
        <div className="mt-2 text-lg font-medium">
          ${product.price.toFixed(2)}
        </div>
        
        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button 
          variant="outline" 
          size="sm"
          className="border-cafe-brown text-cafe-brown"
          onClick={() => onEdit(product)}
        >
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
        
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => onDelete(product.id)}
        >
          <Trash className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminProductCard;
