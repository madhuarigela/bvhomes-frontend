"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-8">BV Homes</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition duration-300 bg-white"
          >
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}

            <h2 className="text-lg font-semibold">{product.name}</h2>

            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {product.description}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold">₹ {product.price}</span>
              <Link
                href={`/products/${product.id}`}
                className="px-4 py-2 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition"
              >
                View
              </Link>
            </div>
          </div>

        ))}
      </div>
    </main>
  );
}
