import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ShoppingBag, Heart, MapPin, CreditCard, Gift, Star, Package, Truck } from 'lucide-react';
import { mockProducts } from '../App';
import type { Page } from "../types/navigation";
import { formatNaira } from '../utils/currency';

interface CustomerDashboardProps {
  navigateTo: (page: Page) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ navigateTo }) => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Mock customer data
  const customerInfo = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 987-6543',
    joinDate: 'March 2023',
    totalOrders: 47,
    loyaltyPoints: 1250
  };

  const orderHistory = [
    {
      id: '#ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      items: [
        { name: 'Organic Tomatoes', quantity: 2, price: 1800 },
        { name: 'Fresh Carrots', quantity: 1, price: 1280 }
      ],
      total: 4880,
      vendor: 'Green Valley Farm'
    },
    {
      id: '#ORD-2024-002',
      date: '2024-01-12',
      status: 'processing',
      items: [
        { name: 'Premium Apples', quantity: 3, price: 2480 }
      ],
      total: 7440,
      vendor: 'Orchard Co-op'
    },
    {
      id: '#ORD-2024-003',
      date: '2024-01-10',
      status: 'delivered',
      items: [
        { name: 'Whole Grain Rice', quantity: 1, price: 4800 },
        { name: 'Organic Bananas', quantity: 2, price: 1120 }
      ],
      total: 7040,
      vendor: 'Heritage Grains'
    }
  ];

  const savedItems = mockProducts.slice(0, 2);

  const addresses = [
    {
      id: '1',
      type: 'Home',
      street: '123 Oak Street',
      city: 'Springfield',
      state: 'CA',
      zipCode: '90210',
      isDefault: true
    },
    {
      id: '2',
      type: 'Work',
      street: '456 Business Ave',
      city: 'Springfield',
      state: 'CA',
      zipCode: '90211',
      isDefault: false
    }
  ];

  const paymentMethods = [
    {
      id: '1',
      type: 'Visa',
      last4: '4242',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: '2',
      type: 'Mastercard',
      last4: '8888',
      expiry: '09/25',
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <ShoppingBag className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="text-xl">SJ</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl">Welcome back, {customerInfo.name}!</h1>
            <p className="text-gray-600">Member since {customerInfo.joinDate}</p>
          </div>
        </div>
        <Button onClick={() => navigateTo('products')}>
          Continue Shopping
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl">{customerInfo.totalOrders}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Loyalty Points</p>
                <p className="text-2xl">{customerInfo.loyaltyPoints}</p>
              </div>
              <Gift className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Saved Items</p>
                <p className="text-2xl">{savedItems.length}</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="saved">Saved Items</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">Order History</h2>
            <p className="text-gray-600">{orderHistory.length} orders</p>
          </div>
          
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <Card key={order.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg">{order.id}</h3>
                        <p className="text-gray-600">Ordered from {order.vendor}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl">{formatNaira(order.total)}</div>
                      <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1 mt-2`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>{formatNaira(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      )}
                    </div>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4 mr-1" />
                        Rate Order
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">Saved Items</h2>
            <Button variant="outline" onClick={() => navigateTo('products')}>
              Browse More
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.vendor}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{product.rating} ({product.reviews})</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xl">{formatNaira(product.price)}</div>
                      <div className="text-sm text-gray-600">{product.unit}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">Delivery Addresses</h2>
            <Button>Add New Address</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <Card key={address.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <span className="text-lg">{address.type}</span>
                      {address.isDefault && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  
                  <div className="text-gray-600 space-y-1">
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zipCode}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">Payment Methods</h2>
            <Button>Add New Card</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-gray-500" />
                      <span className="text-lg">{payment.type}</span>
                      {payment.isDefault && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  
                  <div className="text-gray-600 space-y-1">
                    <p>•••• •••• •••• {payment.last4}</p>
                    <p>Expires {payment.expiry}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <h2 className="text-2xl">Profile Settings</h2>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue={customerInfo.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={customerInfo.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={customerInfo.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthday">Birthday</Label>
                  <Input id="birthday" type="date" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg">Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Email notifications</span>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SMS notifications</span>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Dietary preferences</span>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
