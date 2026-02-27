import React, { useState } from "react";
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { supabase } from "../lib/supabaseClient";
import type { Page } from "../types/navigation";

interface RegisterProps {
  navigateTo: (page: Page) => void;
}

export const Register: React.FC<RegisterProps> = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState("customer");
  const [customerError, setCustomerError] = useState<string | null>(null);
  const [vendorError, setVendorError] = useState<string | null>(null);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [vendorLoading, setVendorLoading] = useState(false);
  
  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [vendorData, setVendorData] = useState({
    // Basic Info
    email: "",
    password: "",
    confirmPassword: "",
    
    // Vendor Profile
    vendorName: "",
    vendorType: "",
    contactPerson: "",
    phone: "",
    description: "",
    
    // Location
    address: "",
    city: "",
    state: "",
    zipCode: "",
    location: "",
    
    // Business Info
    businessLicense: "",
    taxId: "",
    website: "",
    
    // Banking
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    
    // Specialties
    specialties: "",
    certifications: "",
  });

  const handleCustomerRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerError(null);
    if (customerData.password !== customerData.confirmPassword) {
      setCustomerError("Passwords do not match.");
      return;
    }
    setCustomerLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: customerData.email,
      password: customerData.password,
      options: {
        data: {
          role: "customer",
          first_name: customerData.firstName,
          last_name: customerData.lastName,
        },
      },
    });
    if (error) {
      setCustomerError(error.message);
      setCustomerLoading(false);
      return;
    }

    const user = data.user;
    if (!user) {
      setCustomerError(
        "Account created. Please check your email to confirm before signing in."
      );
      setCustomerLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("tbl_customer")
      .insert({
        auth_user_id: user.id,
        email: customerData.email,
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        phone: customerData.phone,
        address: customerData.address,
        city: customerData.city,
        state: customerData.state,
        zip_code: customerData.zipCode,
      });
    if (insertError) {
      setCustomerError(insertError.message);
      setCustomerLoading(false);
      return;
    }

    navigateTo("customer-dashboard");
    setCustomerLoading(false);
  };

  const handleVendorRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setVendorError(null);
    if (vendorData.password !== vendorData.confirmPassword) {
      setVendorError("Passwords do not match.");
      return;
    }
    if (!vendorData.vendorType) {
      setVendorError("Please select a vendor type.");
      return;
    }
    setVendorLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: vendorData.email,
      password: vendorData.password,
      options: {
        data: {
          role: "vendor",
          vendor_name: vendorData.vendorName,
        },
      },
    });
    if (error) {
      setVendorError(error.message);
      setVendorLoading(false);
      return;
    }

    const user = data.user;
    if (!user) {
      setVendorError(
        "Account created. Please check your email to confirm before signing in."
      );
      setVendorLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("tbl_vendoor")
      .insert({
        auth_user_id: user.id,
        email: vendorData.email,
        vendor_name: vendorData.vendorName,
        vendor_type: vendorData.vendorType,
        contact_person: vendorData.contactPerson,
        phone: vendorData.phone,
        description: vendorData.description,
        address: vendorData.address,
        city: vendorData.city,
        state: vendorData.state,
        zip_code: vendorData.zipCode,
        location: vendorData.location,
        business_license: vendorData.businessLicense,
        tax_id: vendorData.taxId,
        website: vendorData.website,
        specialties: vendorData.specialties,
        certifications: vendorData.certifications,
      });
    if (insertError) {
      setVendorError(insertError.message);
      setVendorLoading(false);
      return;
    }

    navigateTo("vendor-dashboard");
    setVendorLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigateTo('login')}
              className="text-green-600 hover:text-green-500"
            >
              Sign in here
            </button>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Join CEFMART</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="customer">Customer Account</TabsTrigger>
                <TabsTrigger value="vendor">Vendor Account</TabsTrigger>
              </TabsList>

              <TabsContent value="customer" className="space-y-6">
                <div className="text-center py-4">
                  <h3 className="text-lg">Register as a Customer</h3>
                  <p className="text-sm text-gray-600">Shop for fresh, local agricultural products</p>
                </div>

                <form onSubmit={handleCustomerRegister} className="space-y-6">
                  {customerError && (
                    <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      {customerError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={customerData.firstName}
                        autoComplete="given-name"
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            firstName: e.target.value,
                          })
                        }
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={customerData.lastName}
                        autoComplete="family-name"
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            lastName: e.target.value,
                          })
                        }
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={customerData.email}
                      autoComplete="email"
                      onChange={(e) =>
                        setCustomerData({ ...customerData, email: e.target.value })
                      }
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={customerData.password}
                        autoComplete="new-password"
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            password: e.target.value,
                          })
                        }
                        placeholder="Create a password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={customerData.confirmPassword}
                        autoComplete="new-password"
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={customerData.phone}
                      autoComplete="tel"
                      onChange={(e) =>
                        setCustomerData({ ...customerData, phone: e.target.value })
                      }
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={customerData.address}
                      autoComplete="street-address"
                      onChange={(e) =>
                        setCustomerData({
                          ...customerData,
                          address: e.target.value,
                        })
                      }
                      placeholder="Enter your street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={customerData.city}
                        autoComplete="address-level2"
                        onChange={(e) =>
                          setCustomerData({ ...customerData, city: e.target.value })
                        }
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={customerData.state}
                        autoComplete="address-level1"
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            state: e.target.value,
                          })
                        }
                        placeholder="State"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={customerData.zipCode}
                        autoComplete="postal-code"
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            zipCode: e.target.value,
                          })
                        }
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={customerLoading}
                  >
                    {customerLoading
                      ? "Creating Customer Account..."
                      : "Create Customer Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="vendor" className="space-y-6">
                <div className="text-center py-4">
                  <h3 className="text-lg">Register as a Vendor</h3>
                  <p className="text-sm text-gray-600">Sell your agricultural products to customers</p>
                </div>

                <form onSubmit={handleVendorRegister} className="space-y-8">
                  {vendorError && (
                    <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      {vendorError}
                    </div>
                  )}
                  {/* Account Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg border-b pb-2">Account Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vendorEmail">Email Address</Label>
                        <Input
                          id="vendorEmail"
                          name="vendorEmail"
                          type="email"
                          required
                          value={vendorData.email}
                          autoComplete="email"
                          onChange={(e) =>
                            setVendorData({ ...vendorData, email: e.target.value })
                          }
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">Contact Person</Label>
                        <Input
                          id="contactPerson"
                          name="contactPerson"
                          required
                          value={vendorData.contactPerson}
                          autoComplete="name"
                          onChange={(e) =>
                            setVendorData({
                              ...vendorData,
                              contactPerson: e.target.value,
                            })
                          }
                          placeholder="Primary contact name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vendorPassword">Password</Label>
                        <Input
                          id="vendorPassword"
                          name="vendorPassword"
                          type="password"
                          required
                          value={vendorData.password}
                          autoComplete="new-password"
                          onChange={(e) =>
                            setVendorData({
                              ...vendorData,
                              password: e.target.value,
                            })
                          }
                          placeholder="Create a password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vendorConfirmPassword">Confirm Password</Label>
                        <Input
                          id="vendorConfirmPassword"
                          name="vendorConfirmPassword"
                          type="password"
                          required
                          value={vendorData.confirmPassword}
                          autoComplete="new-password"
                          onChange={(e) =>
                            setVendorData({
                              ...vendorData,
                              confirmPassword: e.target.value,
                            })
                          }
                          placeholder="Confirm your password"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg border-b pb-2">Business Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vendorName">Vendor/Business Name</Label>
                        <Input
                          id="vendorName"
                          name="vendorName"
                          required
                          value={vendorData.vendorName}
                          onChange={(e) =>
                            setVendorData({
                              ...vendorData,
                              vendorName: e.target.value,
                            })
                          }
                          placeholder="e.g., Green Valley Farm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vendorType">Vendor Type</Label>
                        <Select value={vendorData.vendorType} onValueChange={(value) => setVendorData({...vendorData, vendorType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vendor type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="farm">Family Farm</SelectItem>
                            <SelectItem value="cooperative">Cooperative</SelectItem>
                            <SelectItem value="distributor">Distributor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vendorPhone">Phone Number</Label>
                        <Input
                          id="vendorPhone"
                          name="vendorPhone"
                          type="tel"
                          required
                          value={vendorData.phone}
                          autoComplete="tel"
                          onChange={(e) =>
                            setVendorData({ ...vendorData, phone: e.target.value })
                          }
                          placeholder="Business phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website (Optional)</Label>
                        <Input
                          id="website"
                          name="website"
                          type="url"
                          value={vendorData.website}
                          onChange={(e) =>
                            setVendorData({ ...vendorData, website: e.target.value })
                          }
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendorDescription">Business Description</Label>
                      <Textarea
                        id="vendorDescription"
                        name="vendorDescription"
                        value={vendorData.description}
                        onChange={(e) =>
                          setVendorData({
                            ...vendorData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Describe your business and farming practices..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg border-b pb-2">Location Information</h4>
                    <div className="space-y-2">
                      <Label htmlFor="vendorAddress">Business Address</Label>
                      <Input
                        id="vendorAddress"
                        name="vendorAddress"
                        required
                        value={vendorData.address}
                        autoComplete="street-address"
                        onChange={(e) =>
                          setVendorData({ ...vendorData, address: e.target.value })
                        }
                        placeholder="Enter your business address"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vendorCity">City</Label>
                        <Input
                          id="vendorCity"
                          name="vendorCity"
                          required
                          value={vendorData.city}
                          autoComplete="address-level2"
                          onChange={(e) =>
                            setVendorData({ ...vendorData, city: e.target.value })
                          }
                          placeholder="City"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vendorState">State</Label>
                        <Input
                          id="vendorState"
                          name="vendorState"
                          required
                          value={vendorData.state}
                          autoComplete="address-level1"
                          onChange={(e) =>
                            setVendorData({ ...vendorData, state: e.target.value })
                          }
                          placeholder="State"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vendorZipCode">ZIP Code</Label>
                        <Input
                          id="vendorZipCode"
                          name="vendorZipCode"
                          required
                          value={vendorData.zipCode}
                          autoComplete="postal-code"
                          onChange={(e) =>
                            setVendorData({ ...vendorData, zipCode: e.target.value })
                          }
                          placeholder="ZIP Code"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendorLocation">Location Description</Label>
                      <Input
                        id="vendorLocation"
                        name="vendorLocation"
                        value={vendorData.location}
                        onChange={(e) =>
                          setVendorData({ ...vendorData, location: e.target.value })
                        }
                        placeholder="e.g., Springfield Valley"
                      />
                    </div>
                  </div>

                  {/* Legal & Financial Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg border-b pb-2">Legal & Financial Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessLicense">Business License Number</Label>
                      <Input
                        id="businessLicense"
                        name="businessLicense"
                        value={vendorData.businessLicense}
                        onChange={(e) =>
                          setVendorData({
                            ...vendorData,
                            businessLicense: e.target.value,
                          })
                        }
                        placeholder="License number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Tax ID/EIN</Label>
                      <Input
                        id="taxId"
                        name="taxId"
                        value={vendorData.taxId}
                        onChange={(e) =>
                          setVendorData({ ...vendorData, taxId: e.target.value })
                        }
                        placeholder="Tax identification number"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        name="bankName"
                        value={vendorData.bankName}
                        onChange={(e) =>
                          setVendorData({ ...vendorData, bankName: e.target.value })
                        }
                        placeholder="Your bank name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        name="accountNumber"
                        value={vendorData.accountNumber}
                        onChange={(e) =>
                          setVendorData({
                            ...vendorData,
                            accountNumber: e.target.value,
                          })
                        }
                        placeholder="Account number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input
                        id="routingNumber"
                        name="routingNumber"
                        value={vendorData.routingNumber}
                        onChange={(e) =>
                          setVendorData({
                            ...vendorData,
                            routingNumber: e.target.value,
                          })
                        }
                        placeholder="Routing number"
                      />
                    </div>
                  </div>
                  </div>

                  {/* Specialties & Certifications */}
                  <div className="space-y-4">
                    <h4 className="text-lg border-b pb-2">Specialties & Certifications</h4>
                    <div className="space-y-2">
                      <Label htmlFor="specialties">Product Specialties</Label>
                      <Textarea
                        id="specialties"
                        name="specialties"
                        value={vendorData.specialties}
                        onChange={(e) =>
                          setVendorData({
                            ...vendorData,
                            specialties: e.target.value,
                          })
                        }
                        placeholder="e.g., Organic vegetables, heritage grains, seasonal fruits..."
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certifications">Certifications</Label>
                      <Textarea
                        id="certifications"
                        name="certifications"
                        value={vendorData.certifications}
                        onChange={(e) =>
                          setVendorData({
                            ...vendorData,
                            certifications: e.target.value,
                          })
                        }
                        placeholder="e.g., USDA Organic, Fair Trade, Local certifications..."
                        rows={2}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={vendorLoading}
                  >
                    {vendorLoading ? "Creating Vendor Account..." : "Create Vendor Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
