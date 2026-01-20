"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(
    searchParams.get("query") || ""
  );
  const [result, setResult] = useState(
    searchParams.get("result") || "all"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (query.trim()) {
        params.set("query", query.trim());
      } else {
        params.delete("query");
      }

      if (result !== "all") {
        params.set("result", result);
      } else {
        params.delete("result");
      }

      params.set("page", "1"); // reset pagination on search

      router.push(`/explore?${params.toString()}`, {
        scroll: false,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [query, result, router, searchParams]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* Search Input */}
      <Input
        placeholder="Search by company..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="sm:w-64"
      />

      {/* Result Filter */}
      <Select value={result} onValueChange={setResult}>
        <SelectTrigger className="sm:w-40">
          <SelectValue placeholder="Result" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Selected">Selected</SelectItem>
          <SelectItem value="Rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
