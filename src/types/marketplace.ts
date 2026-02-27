export type UserRole = "guest" | "customer" | "vendor" | "admin";

export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
}

export interface VendorRecord {
  id: string;
  auth_user_id: string;
  email: string;
  vendor_name: string;
  vendor_type: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  location: string | null;
  verified: boolean;
  is_active: boolean;
}

export interface ProductRecord {
  id: string;
  vendor_id: string;
  category_id: string | null;
  name: string;
  description: string;
  price: number;
  unit: string;
  image_url: string | null;
  stock_quantity: number;
  status: "draft" | "active" | "archived";
  freshness_label: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderRecord {
  id: string;
  customer_id: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItemRecord {
  id: string;
  order_id: string;
  vendor_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}
