
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const sneakersData = [
  { id: 1, name: "Nike Air Max", brand: "Nike", price: 120, color: "Red" },
  { id: 2, name: "Adidas Ultraboost", brand: "Adidas", price: 150, color: "Black" },
  { id: 3, name: "Puma RS-X", brand: "Puma", price: 100, color: "White" },
  { id: 4, name: "Reebok Classic", brand: "Reebok", price: 80, color: "Blue" },
  { id: 5, name: "New Balance 574", brand: "New Balance", price: 110, color: "Gray" },
  { id: 6, name: "Nike Zoom Fly", brand: "Nike", price: 130, color: "Green" },
  { id: 7, name: "Adidas NMD", brand: "Adidas", price: 140, color: "White" },
  { id: 8, name: "Puma Suede", brand: "Puma", price: 90, color: "Black" },
];

const brandOptions = ["All", "Nike", "Adidas", "Puma", "Reebok", "New Balance"];

export default function SneakerStore() {
  const [brandFilter, setBrandFilter] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredSneakers = sneakersData.filter((sneaker) => {
    const price = parseInt(maxPrice);
    return (
      (brandFilter === "All" || sneaker.brand === brandFilter) &&
      (maxPrice === "" || (!isNaN(price) && sneaker.price <= price))
    );
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Sneaker Store</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Select value={brandFilter} onValueChange={(value) => setBrandFilter(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Brand" />
          </SelectTrigger>
          <SelectContent>
            {brandOptions.filter((b) => b !== "").map((brand) => (
              <SelectItem
                key={brand}
                value={brand}
              >
                {brand === "All" ? "All Brands" : brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <Button
          variant="outline"
          onClick={() => {
            setBrandFilter("All");
            setMaxPrice("");
          }}
        >
          Clear Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSneakers.length > 0 ? (
          filteredSneakers.map((sneaker) => (
            <Card key={sneaker.id} className="shadow-md">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{sneaker.name}</h2>
                <p className="text-sm text-gray-600">Brand: {sneaker.brand}</p>
                <p className="text-sm text-gray-600">Color: {sneaker.color}</p>
                <p className="text-lg font-bold mt-2">${sneaker.price}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No sneakers match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
