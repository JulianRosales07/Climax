import React, { useState, useEffect } from 'react';
import { Beer, Search } from 'lucide-react';
import { Product } from '../types';
import { productService } from '../services/productService';
import toast from 'react-hot-toast';

interface ClientViewProps {
  products: Product[];
}

export const ClientView: React.FC<ClientViewProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await productService.getAll();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        toast.error('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Nuestros Productos</h1>
        <p className="text-gray-600">Explora nuestra selección de bebidas</p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-1 aspect-h-1 w-full">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <Beer className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-center mb-2">{product.name}</h2>
              <p className="text-gray-600 text-center mb-2">{product.category}</p>
              <p className="text-2xl font-bold text-blue-600 text-center">
                ${product.price.toLocaleString()}
              </p>
              {product.description && (
                <p className="text-sm text-gray-500 text-center mt-2">{product.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron productos
        </div>
      )}
    </div>
  );
};