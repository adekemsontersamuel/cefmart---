import { supabase } from "../lib/supabaseClient";
import { mockProducts } from "../App";
import type { Product } from "../App";
import type { Vendor } from "../App";
import type {
  CategoryRecord,
  ProductRecord,
  UserRole,
  VendorRecord,
} from "../types/marketplace";

const isMissingRelationError = (error: any) =>
  error?.code === "42P01" ||
  String(error?.message || "").toLowerCase().includes("does not exist");

const safeMessage = (error: any) =>
  typeof error?.message === "string" ? error.message : "Unknown error.";

const toProductViewModel = (
  row: any,
  vendorName?: string,
  categoryName?: string
): Product => ({
  id: row.id,
  name: row.name,
  price: Number(row.price ?? 0),
  unit: row.unit ?? "per item",
  image: row.image_url ||
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1080&q=80",
  vendor: vendorName ?? row.tbl_vendoor?.vendor_name ?? "Vendor",
  vendorId: row.vendor_id,
  category: categoryName ?? row.tbl_category?.name ?? "General",
  location:
    row.tbl_vendoor?.location ||
    [row.tbl_vendoor?.city, row.tbl_vendoor?.state].filter(Boolean).join(", ") ||
    "Local",
  freshness: row.freshness_label ?? "Fresh",
  description: row.description ?? "",
  inStock: Number(row.stock_quantity ?? 0) > 0,
  rating: Number(row.rating_avg ?? 4.5),
  reviews: Number(row.reviews_count ?? 0),
});

export async function resolveCurrentUserRole(): Promise<{
  role: UserRole;
  userId: string | null;
  vendorId: string | null;
}> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { role: "guest", userId: null, vendorId: null };
  }

  const { data: adminRecord } = await supabase
    .from("tbl_admin")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (adminRecord) {
    return { role: "admin", userId: user.id, vendorId: null };
  }

  const { data: vendorRecord } = await supabase
    .from("tbl_vendoor")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (vendorRecord) {
    return { role: "vendor", userId: user.id, vendorId: vendorRecord.id };
  }

  const { data: customerRecord } = await supabase
    .from("tbl_customer")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (customerRecord) {
    return { role: "customer", userId: user.id, vendorId: null };
  }

  const metadataRole = (user.user_metadata?.role || "").toLowerCase();
  if (metadataRole === "admin" || metadataRole === "vendor" || metadataRole === "customer") {
    return { role: metadataRole as UserRole, userId: user.id, vendorId: null };
  }

  return { role: "guest", userId: user.id, vendorId: null };
}

export async function listProducts(category?: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("tbl_product")
    .select(
      `
      id,name,price,unit,image_url,vendor_id,description,stock_quantity,freshness_label,
      tbl_vendoor:vendor_id(vendor_name,location,city,state),
      tbl_category:category_id(name)
    `
    )
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingRelationError(error)) {
      return mockProducts.filter((p) => (category ? p.category === category : true));
    }
    throw new Error(safeMessage(error));
  }

  const mapped = (data || []).map((row: any) =>
    toProductViewModel(row, row.tbl_vendoor?.vendor_name, row.tbl_category?.name)
  );

  return category ? mapped.filter((p) => p.category === category) : mapped;
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("tbl_product")
    .select(
      `
      id,name,price,unit,image_url,vendor_id,description,stock_quantity,freshness_label,
      tbl_vendoor:vendor_id(vendor_name,location,city,state),
      tbl_category:category_id(name)
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    if (isMissingRelationError(error)) {
      return mockProducts.find((p) => p.id === id) || null;
    }
    throw new Error(safeMessage(error));
  }

  if (!data) return null;

  return toProductViewModel(data, data.tbl_vendoor?.vendor_name, data.tbl_category?.name);
}

export async function listCategories(): Promise<CategoryRecord[]> {
  const { data, error } = await supabase
    .from("tbl_category")
    .select("id,name,slug,is_active")
    .order("name", { ascending: true });

  if (error) {
    if (isMissingRelationError(error)) {
      return [];
    }
    throw new Error(safeMessage(error));
  }

  return (data || []) as CategoryRecord[];
}

export async function createCategory(input: { name: string; slug: string }) {
  const { error } = await supabase.from("tbl_category").insert({
    name: input.name,
    slug: input.slug,
    is_active: true,
  });

  if (error) throw new Error(safeMessage(error));
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from("tbl_category").delete().eq("id", id);
  if (error) throw new Error(safeMessage(error));
}

export async function listVendorProducts(vendorId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("tbl_product")
    .select(
      `
      id,name,price,unit,image_url,vendor_id,description,stock_quantity,freshness_label,status,
      tbl_vendoor:vendor_id(vendor_name,location,city,state),
      tbl_category:category_id(name)
    `
    )
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingRelationError(error)) {
      return mockProducts.filter((p) => p.vendorId === vendorId);
    }
    throw new Error(safeMessage(error));
  }

  return (data || []).map((row: any) =>
    toProductViewModel(row, row.tbl_vendoor?.vendor_name, row.tbl_category?.name)
  );
}

export async function createVendorProduct(vendorId: string, payload: {
  name: string;
  price: number;
  unit: string;
  categoryId: string | null;
  description: string;
  imageUrl: string;
}) {
  const { error } = await supabase.from("tbl_product").insert({
    vendor_id: vendorId,
    category_id: payload.categoryId,
    name: payload.name,
    description: payload.description,
    price: payload.price,
    unit: payload.unit,
    image_url: payload.imageUrl,
    stock_quantity: 100,
    status: "active",
    freshness_label: "Fresh",
  });

  if (error) throw new Error(safeMessage(error));
}

export async function deleteVendorProduct(vendorId: string, productId: string) {
  const { error } = await supabase
    .from("tbl_product")
    .delete()
    .eq("id", productId)
    .eq("vendor_id", vendorId);

  if (error) throw new Error(safeMessage(error));
}

export async function listVendorOrders(vendorId: string) {
  const { data, error } = await supabase
    .from("tbl_order_item")
    .select(
      `
      id, quantity, unit_price, subtotal,
      tbl_order:order_id(id,status,created_at,total_amount),
      tbl_product:product_id(name)
    `
    )
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingRelationError(error)) {
      return [];
    }
    throw new Error(safeMessage(error));
  }

  return (data || []).map((item: any) => ({
    id: item.tbl_order?.id || item.id,
    product: item.tbl_product?.name || "Product",
    quantity: Number(item.quantity || 0),
    unitPrice: Number(item.unit_price || 0),
    amount: Number(item.subtotal || 0),
    status: item.tbl_order?.status || "pending",
    date: item.tbl_order?.created_at || new Date().toISOString(),
  }));
}

export async function listAdminVendors(): Promise<VendorRecord[]> {
  const { data, error } = await supabase
    .from("tbl_vendoor")
    .select("id,auth_user_id,email,vendor_name,vendor_type,phone,city,state,location,verified,is_active")
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingRelationError(error)) {
      return [];
    }
    throw new Error(safeMessage(error));
  }

  return (data || []) as VendorRecord[];
}

export async function listPublicVendors(): Promise<Vendor[]> {
  const { data, error } = await supabase
    .from("tbl_vendoor")
    .select("id,vendor_name,vendor_type,location,city,state,verified")
    .eq("verified", true)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    if (isMissingRelationError(error)) return [];
    throw new Error(safeMessage(error));
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.vendor_name,
    type: row.vendor_type || "farm",
    location:
      row.location || [row.city, row.state].filter(Boolean).join(", ") || "Local",
    rating: 4.8,
    products: 0,
    verified: Boolean(row.verified),
  }));
}

export async function setVendorVerification(vendorId: string, verified: boolean) {
  const { error } = await supabase
    .from("tbl_vendoor")
    .update({ verified })
    .eq("id", vendorId);

  if (error) throw new Error(safeMessage(error));
}

export async function listAdminOrders() {
  const { data, error } = await supabase
    .from("tbl_order")
    .select("id,status,total_amount,created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    if (isMissingRelationError(error)) {
      return [];
    }
    throw new Error(safeMessage(error));
  }

  return data || [];
}

export async function updateOrderStatus(orderId: string, status: string) {
  const { error } = await supabase
    .from("tbl_order")
    .update({ status })
    .eq("id", orderId);

  if (error) throw new Error(safeMessage(error));
}

export async function adminOverviewCounts() {
  const [vendors, categories, products, orders] = await Promise.all([
    supabase.from("tbl_vendoor").select("id", { count: "exact", head: true }),
    supabase.from("tbl_category").select("id", { count: "exact", head: true }),
    supabase.from("tbl_product").select("id", { count: "exact", head: true }),
    supabase.from("tbl_order").select("id", { count: "exact", head: true }),
  ]);

  return {
    vendors: vendors.count || 0,
    categories: categories.count || 0,
    products: products.count || 0,
    orders: orders.count || 0,
  };
}
