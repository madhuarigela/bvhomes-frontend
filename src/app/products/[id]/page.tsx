"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Product } from "@/types/product";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const router = useRouter();


    useEffect(() => {
        api.get(`/products`).then((res) => {
            const found = res.data.find((p: Product) => p.id === Number(id));
            setProduct(found);
        });
    }, [id]);

    if (!product) return <div className="p-10">Loading...</div>;

    return (
        <div className="min-h-screen p-10">
            <button
                onClick={() => router.push("/")}
                className="mb-6 text-sm text-gray-600 hover:text-black transition"
            >
                ← Back to Home
            </button>
            <div className="grid md:grid-cols-2 gap-10">
                {product.image_url && (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="rounded-2xl"
                    />
                )}

                <div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-500 mt-4">{product.description}</p>
                    <p className="text-2xl font-bold mt-6">₹ {product.price}</p>

                    <button className="mt-6 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition">
                        I'm Interested
                    </button>
                </div>
            </div>
        </div>
    );
}
