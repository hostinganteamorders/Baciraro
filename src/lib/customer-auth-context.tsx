"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface Customer {
  id: number;
  email: string;
  name: string;
  phone: string;
  photo_url: string;
  total_points: number;
}

interface CustomerAuthContextType {
  customer: Customer | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (email: string, password: string, name: string, phone?: string, photo_url?: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  updateProfile: (name: string, phone: string, photo_url: string) => Promise<{ error?: string }>;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | null>(null);

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/customer/me");
      const data = await res.json();
      setCustomer(data.customer || null);
    } catch {
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/auth/customer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Login failed" };
    setCustomer(data.customer);
    return {};
  }, []);

  const register = useCallback(async (email: string, password: string, name: string, phone?: string, photo_url?: string) => {
    const res = await fetch("/api/auth/customer/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, phone, photo_url }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Registration failed" };
    setCustomer(data.customer);
    return {};
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/customer/logout", { method: "POST" });
    setCustomer(null);
  }, []);

  const updateProfile = useCallback(async (name: string, phone: string, photo_url: string) => {
    const res = await fetch("/api/auth/customer/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, photo_url }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to update profile" };
    setCustomer(data.customer);
    return {};
  }, []);

  return (
    <CustomerAuthContext.Provider value={{ customer, loading, login, register, logout, refresh, updateProfile }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error("useCustomerAuth must be used within CustomerAuthProvider");
  return ctx;
}
