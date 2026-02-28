import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Truck } from 'lucide-react';
import { CartItem } from '../App';
import type { Page } from "../types/navigation";
import { formatNaira } from '../utils/currency';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  navigateTo: (page: Page) => void;
}

export const Cart: React.FC<CartProps> = ({ cartItems, updateQuantity, navigateTo }) => {
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    zipCode: '',
    state: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = deliveryMethod === 'delivery' ? 1996 : 0;
  const discount = promoCode === 'FRESH10' ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee - discount;

  const handleCheckout = () => {
    // In a real app, this would process the payment
    alert('Order placed successfully! You will receive a confirmation email shortly.');
    // Reset cart and navigate
    cartItems.forEach(item => updateQuantity(item.product.id, 0));
    navigateTo('home');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 max-sm:py-10">
        <div className="text-center space-y-6">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto" />
          <div>
            <h2 className="text-2xl text-gray-800">Your cart is empty</h2>
            <p className="text-gray-600 mt-2">Add some fresh produce to get started!</p>
          </div>
          <Button onClick={() => navigateTo('products')} size="lg">
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 max-sm:py-6">
      <h1 className="text-3xl mb-8 max-sm:text-2xl">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 max-sm:p-4">
              <h2 className="text-xl mb-6">Cart Items ({cartItems.length})</h2>
              
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-start space-x-4 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg">{item.product.name}</h3>
                      <p className="text-gray-600">{item.product.vendor}</p>
                      <div className="text-lg">{formatNaira(item.product.price)} {item.product.unit}</div>
                    </div>
                    
                    <div className="flex items-center space-x-3 max-sm:w-full max-sm:justify-between max-sm:space-x-2">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 rounded-l-lg"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-lg"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="text-lg min-w-20 text-right max-sm:min-w-0">
                        {formatNaira(item.product.price * item.quantity)}
                      </div>
                      
                      <button
                        onClick={() => updateQuantity(item.product.id, 0)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Method */}
          <Card>
            <CardContent className="p-6 max-sm:p-4">
              <h3 className="text-lg mb-4">Delivery Method</h3>
              
              <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-2">
                      <div className="flex items-center space-x-3">
                        <Truck className="h-5 w-5 text-green-600" />
                        <div>
                          <div>Home Delivery</div>
                          <div className="text-sm text-gray-600">Delivered within 24 hours</div>
                        </div>
                      </div>
                      <div className="text-lg">{formatNaira(1996)}</div>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-2">
                      <div className="flex items-center space-x-3">
                        <ShoppingBag className="h-5 w-5 text-green-600" />
                        <div>
                          <div>Store Pickup</div>
                          <div className="text-sm text-gray-600">Ready in 2-4 hours</div>
                        </div>
                      </div>
                      <div className="text-lg">Free</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          {deliveryMethod === 'delivery' && (
            <Card>
              <CardContent className="p-6 max-sm:p-4">
                <h3 className="text-lg mb-4">Delivery Address</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={deliveryAddress.street}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, street: e.target.value})}
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                      placeholder="Springfield"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select value={deliveryAddress.state} onValueChange={(value) => setDeliveryAddress({...deliveryAddress, state: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={deliveryAddress.zipCode}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, zipCode: e.target.value})}
                      placeholder="12345"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="lg:sticky lg:top-8">
            <CardContent className="p-6 space-y-6 max-sm:p-4">
              <h3 className="text-xl">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? 'Free' : formatNaira(deliveryFee)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (FRESH10)</span>
                    <span>-{formatNaira(discount)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-xl">
                  <span>Total</span>
                  <span>{formatNaira(total)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <Label htmlFor="promo">Promo Code</Label>
                <div className="flex space-x-2 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-2">
                  <Input
                    id="promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                  />
                  <Button variant="outline" size="sm" className="max-sm:w-full">Apply</Button>
                </div>
                <p className="text-xs text-gray-600">Try: FRESH10 for 10% off</p>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <Label>Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                      <CreditCard className="h-4 w-4" />
                      <span>Credit/Debit Card</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="cursor-pointer">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                onClick={handleCheckout} 
                size="lg" 
                className="w-full"
                disabled={deliveryMethod === 'delivery' && (!deliveryAddress.street || !deliveryAddress.city)}
              >
                Place Order
              </Button>

              <div className="text-center text-sm text-gray-600">
                <p>🔒 Secure checkout with SSL encryption</p>
                <p className="mt-1">🚚 Free delivery on orders over ₦20,000</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
