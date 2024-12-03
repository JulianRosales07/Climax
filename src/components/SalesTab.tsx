import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Sale, Product } from '../types';

const ProductCard: React.FC<{ product: Product; isSelected: boolean; onClick: () => void }> = ({ product, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer transition-all duration-300 transform hover:scale-105 p-4 rounded-lg shadow-md ${
      isSelected ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-white hover:shadow-lg'
    }`}
  >
    <h3 className="font-bold text-lg mb-2 text-gray-800">{product.name}</h3>
    <div className="flex justify-between items-center">
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        product.quantity && product.quantity > 0 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        Stock: {product.quantity ?? 'N/A'}
      </span>
      <span className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
    </div>
  </div>
);

export const SalesTab: React.FC = () => {
  const { products, addSale, sales, updateSale } = useStore();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'nequi' | 'datafono'>('efectivo');
  const [isFriendPrice, setIsFriendPrice] = useState(false);
  const [friendPrice, setFriendPrice] = useState('');
  const [tableNumber, setTableNumber] = useState('');

  const pendingSales = sales.filter(sale => sale.status === 'pending');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    if (product.quantity !== null && quantity > product.quantity) {
      alert('No hay suficiente stock para esta venta.');
      return;
    }

    const finalPrice = isFriendPrice ? Number(friendPrice) : product.price;

    await addSale({
      productId: product.id,
      quantity,
      totalPrice: finalPrice * quantity,
      paymentMethod,
      status: 'pending',
      tableNumber: tableNumber || undefined,
    });

    setSelectedProduct('');
    setQuantity(1);
    setPaymentMethod('efectivo');
    setIsFriendPrice(false);
    setFriendPrice('');
    setTableNumber('');
  };

  const handleMarkAsPaid = async (sale: Sale) => {
    await updateSale({ ...sale, status: 'paid' });
  };

  const selectedProductData = products.find((p) => p.id === selectedProduct);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Nuevo Pedido</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700 mb-1">Mesa/Referencia</label>
              <input
                id="tableNumber"
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="Ej: Mesa 1, Barra, etc."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div>
  <h3 className="text-xl font-semibold text-gray-800 mb-6">Seleccionar Producto</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map(product => (
      <div
        key={product.id}
        onClick={() => setSelectedProduct(product.id)}
        className={`cursor-pointer transition-all duration-300 rounded-lg p-5 border ${
          selectedProduct === product.id
            ? 'bg-indigo-100 border-indigo-600'
            : 'bg-white hover:bg-indigo-50 border-gray-300'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">{product.name}</h4>
          
          {/* Stock and Price */}
          <div className="flex justify-between w-full text-sm">
            <span
              className={`px-2 py-1 rounded-md text-white font-medium ${
                product.quantity > 0 ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {product.quantity > 0 ? `Stock: ${product.quantity}` : 'Agotado'}
            </span>
            <span className="text-lg font-semibold text-indigo-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Cantidad</label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-16 text-center border-t border-b border-gray-300 py-1"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Método de Pago</h3>
              <div className="flex space-x-4">
                {['efectivo', 'nequi', 'datafono'].map((method) => (
                  <label key={method} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method as 'efectivo' | 'nequi' | 'datafono')}
                      className="form-radio h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700 capitalize">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFriendPrice}
                  onChange={(e) => {
                    setIsFriendPrice(e.target.checked);
                    if (!e.target.checked) setFriendPrice('');
                  }}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">Precio Amigos</span>
              </label>
              {isFriendPrice && (
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={friendPrice}
                  onChange={(e) => setFriendPrice(e.target.value)}
                  placeholder="Ingrese el precio especial"
                  className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              )}
            </div>

            {selectedProductData && (
              <div className="bg-indigo-50 p-6 rounded-lg space-y-3">
                <h3 className="text-xl font-semibold text-indigo-800">
                  Información del Producto
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-md shadow">
                    <span className="font-medium text-gray-600">Categoría:</span>{' '}
                    <span className="text-indigo-600">{selectedProductData.category}</span>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow">
                    <span className="font-medium text-gray-600">Stock:</span>{' '}
                    <span className="text-indigo-600">{selectedProductData.quantity ?? 'N/A'}</span>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow">
                    <span className="font-medium text-gray-600">Precio:</span>{' '}
                    {isFriendPrice ? (
                      <span className="line-through text-gray-400">
                        ${selectedProductData.price.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-indigo-600">${selectedProductData.price.toFixed(2)}</span>
                    )}
                    {isFriendPrice && friendPrice && (
                      <span className="ml-2 text-green-600">
                        ${Number(friendPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                {quantity > 0 && (
                  <div className="text-2xl font-bold text-indigo-600 bg-white p-4 rounded-lg shadow-inner">
                    Total: ${((isFriendPrice ? Number(friendPrice) : selectedProductData.price) * quantity).toFixed(2)}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Registrar Pedido
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Pedidos Pendientes</h2>
          <div className="space-y-6">
            {pendingSales.map((sale) => {
              const product = products.find(p => p.id === sale.productId);
              return (
                <div key={sale.id} className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">{product?.name}</h3>
                    <p className="text-gray-600">
                      {sale.tableNumber && `Mesa: ${sale.tableNumber} - `}
                      Cantidad: {sale.quantity}
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800 mt-2">
                      {sale.paymentMethod}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-2xl text-indigo-600">${sale.totalPrice.toFixed(2)}</p>
                    <button
                      onClick={() => handleMarkAsPaid(sale)}
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      Marcar como Pagado
                    </button>
                  </div>
                </div>
              );
            })}
            {pendingSales.length === 0 && (
              <p className="text-gray-500 text-center py-8 text-lg">No hay pedidos pendientes</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTab;

