import { StateCreator } from 'zustand';
import { Product } from '../../types';
import { productService } from '../../services/productService';
import toast from 'react-hot-toast';

export interface ProductState {
  products: Product[];
}

export interface ProductActions {
  loadProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getLowStockProducts: () => Promise<Product[]>;
}

export type ProductSlice = ProductState & ProductActions;

export const createProductSlice: StateCreator<ProductSlice> = (set, get) => ({
  products: [],
  
  loadProducts: async () => {
    try {
      const products = await productService.getAll();
      set({ products });
    } catch (error) {
      console.error('Error loading products:', error);
      set({ products: [] });
      toast.error('Error al cargar los productos');
    }
  },
  
  addProduct: async (product) => {
    try {
      const newProduct = await productService.add(product);
      set((state) => ({
        products: [...state.products, newProduct],
      }));
      toast.success('Producto agregado exitosamente');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error al agregar el producto');
    }
  },
  
  updateProduct: async (product) => {
    try {
      await productService.update(product);
      set((state) => ({
        products: state.products.map((p) => (p.id === product.id ? product : p)),
      }));
      toast.success('Producto actualizado exitosamente');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error al actualizar el producto');
    }
  },
  
  deleteProduct: async (id) => {
    try {
      await productService.delete(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
      toast.success('Producto eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error al eliminar el producto');
    }
  },

  getLowStockProducts: async () => {
    try {
      return await productService.getLowStock();
    } catch (error) {
      console.error('Error getting low stock products:', error);
      toast.error('Error al obtener productos con bajo stock');
      return [];
    }
  },
});