import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Star, MapPin, Truck, Shield, Clock, Plus, Minus, ArrowLeft, Heart } from 'lucide-react';
import { Product } from '../App';
import type { Page } from "../types/navigation";
import { formatNaira } from '../utils/currency';

interface ProductDetailProps {
  product: Product;
  navigateTo: (page: Page) => void;
  addToCart: (product: Product, quantity: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, navigateTo, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock additional images for the product
  const productImages = [
    product.image,
    product.image, // In a real app, these would be different images
    product.image
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Show success feedback in a real app
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  // Mock vendor info
  const vendorInfo = {
    name: product.vendor,
    type: 'Family Farm',
    location: 'Springfield Valley',
    rating: 4.8,
    totalProducts: 45,
    yearsInBusiness: 12,
    certifications: ['Organic Certified', 'Fair Trade', 'Local Sourced']
  };

  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: 'Sarah M.',
      rating: 5,
      comment: 'Amazing quality! The produce was fresh and arrived quickly.',
      date: '2 days ago'
    },
    {
      id: 2,
      user: 'Mike R.',
      rating: 4,
      comment: 'Good quality, will order again. Fast delivery service.',
      date: '1 week ago'
    },
    {
      id: 3,
      user: 'Emma L.',
      rating: 5,
      comment: 'Best organic produce I\'ve found online. Highly recommended!',
      date: '2 weeks ago'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigateTo('products')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Products</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-green-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl">{product.name}</h1>
                <p className="text-xl text-gray-600 mt-1">{product.vendor}</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg">{product.rating}</span>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                {product.freshness}
              </Badge>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{product.location}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Price and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="text-3xl text-green-600">{formatNaira(product.price)}</div>
              <div className="text-lg text-gray-600">{product.unit}</div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  className="p-2 hover:bg-gray-100 rounded-l-lg"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-lg">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="p-2 hover:bg-gray-100 rounded-r-lg"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <Button size="lg" onClick={handleAddToCart} className="flex-1">
                Add to Cart - {formatNaira(product.price * quantity)}
              </Button>
            </div>

            <Button variant="outline" size="lg" className="w-full">
              Buy Now
            </Button>
          </div>

          <Separator />

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Truck className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-sm">Fresh Delivery</div>
              <div className="text-xs text-gray-600">Within 24 hours</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm">Quality Assured</div>
              <div className="text-xs text-gray-600">100% Guarantee</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-sm">Always Fresh</div>
              <div className="text-xs text-gray-600">Direct from farm</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="vendor">Vendor Info</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-lg">Key Features:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>100% Organic and pesticide-free</li>
                    <li>Freshly harvested from local farms</li>
                    <li>Rich in nutrients and vitamins</li>
                    <li>Perfect for various cooking methods</li>
                    <li>Sustainable farming practices</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendor" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏪</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl">{vendorInfo.name}</h3>
                    <p className="text-gray-600">{vendorInfo.type} • {vendorInfo.location}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{vendorInfo.rating}</span>
                      </div>
                      <span className="text-gray-600">{vendorInfo.totalProducts} products</span>
                      <span className="text-gray-600">{vendorInfo.yearsInBusiness} years in business</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg mb-3">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {vendorInfo.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary">{cert}</Badge>
                    ))}
                  </div>
                </div>

                <Button variant="outline">View All Products from {vendorInfo.name}</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Review Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-4xl">{product.rating}</div>
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{product.reviews} reviews</div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <span className="text-sm w-8">{rating}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 10}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8">
                            {rating === 5 ? '70%' : rating === 4 ? '20%' : '10%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span>{review.user}</span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'text-yellow-500 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-600">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
