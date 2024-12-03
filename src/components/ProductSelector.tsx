import React from "react";
import { Product } from "../types";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid"; // Puedes usar Heroicons o cualquier ícono SVG.

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: string;
  onSelectProduct: (productId: string) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  products,
  selectedProduct,
  onSelectProduct,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className={`relative cursor-pointer transition-all p-5 rounded-2xl shadow-md border ${
              selectedProduct === product.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:shadow-lg"
            }`}
            onClick={() => onSelectProduct(product.id)}
          >
            {/* Indicador de selección */}
            {selectedProduct === product.id && (
              <motion.div
                className="absolute top-2 right-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircleIcon className="h-6 w-6 text-blue-500" />
              </motion.div>
            )}

            {/* Contenido del producto */}
            <div className="text-center">
              <h3 className="font-bold text-lg truncate text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1 truncate">
                {product.description || "Sin descripción"}
              </p>
              <p className="text-xl font-semibold text-blue-600 mt-3">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Indicador de stock */}
            <div
              className={`mt-4 text-xs font-medium px-3 py-1 rounded-full text-center ${
                product.quantity && product.quantity > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.quantity && product.quantity > 0
                ? "Disponible"
                : "Agotado"}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
