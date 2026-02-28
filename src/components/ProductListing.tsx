import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Star, Filter, Grid, List, MapPin } from 'lucide-react';
import { Product, mockProducts } from '../App';
import type { Page } from "../types/navigation";
import { formatNaira } from '../utils/currency';

interface ProductListingProps {
  navigateTo: (page: Page, productId?: string) => void;
  category: string;
  addToCart: (product: Product, quantity: number) => void;
  products?: Product[];
}

export const ProductListing: React.FC<ProductListingProps> = ({ navigateTo, category, addToCart, products = [] }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedFreshness, setSelectedFreshness] = useState<string[]>([]);
  const [selectedVendorTypes, setSelectedVendorTypes] = useState<string[]>([]);

  const allProducts = useMemo(
    () => (products.length > 0 ? products : mockProducts),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Category filter
      if (category && product.category !== category) return false;
      
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      
      // Location filter
      if (selectedLocations.length > 0 && !selectedLocations.some(loc => product.location.includes(loc))) return false;
      
      // Freshness filter
      if (selectedFreshness.length > 0 && !selectedFreshness.includes(product.freshness)) return false;
      
      return true;
    });
  }, [allProducts, category, priceRange, selectedLocations, selectedFreshness]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return products.sort((a, b) => b.id.localeCompare(a.id));
      default:
        return products;
    }
  }, [filteredProducts, sortBy]);

  const locations = ['Local', 'Regional'];
  const freshnessOptions = ['Harvested today', 'Picked yesterday', 'Perfect ripeness', 'This season'];
  const vendorTypes = ['Farm', 'Cooperative', 'Distributor'];

  const handleLocationToggle = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const handleFreshnessToggle = (freshness: string) => {
    setSelectedFreshness(prev =>
      prev.includes(freshness)
        ? prev.filter(f => f !== freshness)
        : [...prev, freshness]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 max-sm:py-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl max-sm:text-2xl">{category || 'All Products'}</h1>
          <p className="text-gray-600 mt-1">{sortedProducts.length} products found</p>
        </div>
        
        <div className="flex items-center gap-3 max-sm:flex-col max-sm:items-stretch">
          {/* View Mode Toggle */}
          <div className="flex border rounded-lg p-1 max-sm:w-full">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded p-2 max-sm:flex-1 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded p-2 max-sm:flex-1 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 max-sm:w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="space-y-6 p-6 max-sm:p-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <h3 className="text-lg">Filters</h3>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <h4 className="text-sm text-gray-700">Price Range</h4>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={500000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatNaira(priceRange[0])}</span>
                <span>{formatNaira(priceRange[1])}</span>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <h4 className="text-sm text-gray-700">Location</h4>
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={() => handleLocationToggle(location)}
                  />
                  <label htmlFor={location} className="text-sm cursor-pointer">
                    {location}
                  </label>
                </div>
              ))}
            </div>

            {/* Freshness */}
            <div className="space-y-3">
              <h4 className="text-sm text-gray-700">Freshness</h4>
              {freshnessOptions.map((freshness) => (
                <div key={freshness} className="flex items-center space-x-2">
                  <Checkbox
                    id={freshness}
                    checked={selectedFreshness.includes(freshness)}
                    onCheckedChange={() => handleFreshnessToggle(freshness)}
                  />
                  <label htmlFor={freshness} className="text-sm cursor-pointer">
                    {freshness}
                  </label>
                </div>
              ))}
            </div>

            {/* Clear Filters */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setPriceRange([0, 500000]);
                setSelectedLocations([]);
                setSelectedFreshness([]);
                setSelectedVendorTypes([]);
              }}
            >
              Clear All Filters
            </Button>
          </Card>
        </div>

        {/* Products Grid/List */}
        <div className="lg:col-span-3">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigateTo('product-detail', product.id)}
                >
                  <div className="aspect-w-16 aspect-h-12">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.vendor}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {product.freshness}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{product.rating} ({product.reviews})</span>
                      <div className="ml-auto flex items-center text-sm text-gray-500 max-sm:ml-0">
                        <MapPin className="h-3 w-3 mr-1" />
                        {product.location}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <div className="text-xl">{formatNaira(product.price)}</div>
                        <div className="text-sm text-gray-600">{product.unit}</div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigateTo('product-detail', product.id)}
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-6 items-center md:grid-cols-4">
                      <div className="md:col-span-1">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="md:col-span-2 space-y-2">
                        <div className="flex items-start justify-between gap-2 max-sm:flex-col max-sm:items-start">
                          <div>
                            <h3 className="text-xl">{product.name}</h3>
                            <p className="text-gray-600">{product.vendor}</p>
                          </div>
                          <Badge variant="secondary">{product.freshness}</Badge>
                        </div>
                        
                        <p className="text-gray-600 text-sm">{product.description}</p>
                        
                        <div className="flex items-center space-x-4 max-sm:flex-wrap max-sm:gap-2 max-sm:space-x-0">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{product.rating} ({product.reviews})</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            {product.location}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 text-left md:col-span-1 md:text-right">
                        <div>
                          <div className="text-2xl">{formatNaira(product.price)}</div>
                          <div className="text-sm text-gray-600">{product.unit}</div>
                        </div>
                        <Button 
                          className="max-sm:w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setPriceRange([0, 500000]);
                  setSelectedLocations([]);
                  setSelectedFreshness([]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
