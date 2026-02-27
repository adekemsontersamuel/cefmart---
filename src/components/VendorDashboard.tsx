import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Plus,
  Package,
  DollarSign,
  TrendingUp,
  Trash2,
  Star,
} from "lucide-react";
import type { Page } from "../types/navigation";
import { formatNaira } from "../utils/currency";
import {
  createVendorProduct,
  deleteVendorProduct,
  listCategories,
  listVendorOrders,
  listVendorProducts,
  resolveCurrentUserRole,
} from "../services/marketplace";

interface VendorDashboardProps {
  navigateTo: (page: Page) => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({ navigateTo }) => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: "per kg",
    categoryId: "",
    description: "",
    image: "",
  });

  const loadData = async () => {
    setError(null);
    setLoading(true);
    try {
      const role = await resolveCurrentUserRole();
      if (role.role !== "vendor" || !role.vendorId) {
        setError("Vendor access is required.");
        setLoading(false);
        return;
      }

      setVendorId(role.vendorId);
      const [vendorProducts, vendorOrders, categoryRows] = await Promise.all([
        listVendorProducts(role.vendorId),
        listVendorOrders(role.vendorId),
        listCategories(),
      ]);

      setProducts(vendorProducts);
      setOrders(vendorOrders);
      setCategories(categoryRows);
    } catch (e: any) {
      setError(e?.message || "Failed to load vendor data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddProduct = async () => {
    if (!vendorId) return;
    if (!newProduct.name || !newProduct.price) {
      setError("Product name and price are required.");
      return;
    }

    try {
      await createVendorProduct(vendorId, {
        name: newProduct.name,
        price: Number(newProduct.price),
        unit: newProduct.unit,
        categoryId: newProduct.categoryId || null,
        description: newProduct.description,
        imageUrl: newProduct.image,
      });
      setIsAddProductOpen(false);
      setNewProduct({
        name: "",
        price: "",
        unit: "per kg",
        categoryId: "",
        description: "",
        image: "",
      });
      await loadData();
    } catch (e: any) {
      setError(e?.message || "Unable to add product.");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!vendorId) return;
    try {
      await deleteVendorProduct(vendorId, productId);
      await loadData();
    } catch (e: any) {
      setError(e?.message || "Unable to delete product.");
    }
  };

  const vendorStats = useMemo(() => {
    const totalSales = orders.length;
    const monthlyRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
    const averageRating =
      products.length > 0
        ? products.reduce((sum, product) => sum + (product.rating || 0), 0) /
          products.length
        : 0;

    return {
      totalProducts: products.length,
      totalSales,
      monthlyRevenue,
      averageRating,
    };
  }, [products, orders]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="p-8">Loading vendor dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl">Vendor Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage products and track orders in real time.
          </p>
        </div>
        <Button onClick={() => navigateTo("home")}>View Storefront</Button>
      </div>

      {error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl">{vendorStats.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl">{vendorStats.totalSales}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl">{formatNaira(vendorStats.monthlyRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <div className="flex items-center space-x-1">
                  <p className="text-2xl">{vendorStats.averageRating.toFixed(1)}</p>
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                </div>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">Manage Products</h2>
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input
                      id="product-name"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      placeholder="e.g., Organic Tomatoes"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-price">Price</Label>
                    <Input
                      id="product-price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-unit">Unit</Label>
                    <Select
                      value={newProduct.unit}
                      onValueChange={(value) =>
                        setNewProduct({ ...newProduct, unit: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="per kg">per kg</SelectItem>
                        <SelectItem value="per lb">per lb</SelectItem>
                        <SelectItem value="per piece">per piece</SelectItem>
                        <SelectItem value="per bunch">per bunch</SelectItem>
                        <SelectItem value="per bag">per bag</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-category">Category</Label>
                    <Select
                      value={newProduct.categoryId}
                      onValueChange={(value) =>
                        setNewProduct({ ...newProduct, categoryId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.length === 0 ? (
                          <SelectItem value="__none" disabled>
                            No categories yet
                          </SelectItem>
                        ) : (
                          categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="product-description">Description</Label>
                    <Textarea
                      id="product-description"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe your product..."
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="product-image">Image URL</Label>
                    <Input
                      id="product-image"
                      value={newProduct.image}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, image: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddProductOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddProduct}>Add Product</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <div>{product.name}</div>
                            <div className="text-sm text-gray-600">
                              ⭐ {product.rating} ({product.reviews} reviews)
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        {formatNaira(product.price)} {product.unit}
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.inStock ? "default" : "secondary"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <h2 className="text-2xl">Recent Orders</h2>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={`${order.id}-${order.product}`}>
                      <TableCell className="text-blue-600">{order.id}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{formatNaira(order.amount)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(order.date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
