"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { filterData } from "@/lib/filterData";
import { useRouter, useSearchParams } from "next/navigation";

export function Sidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const updateRouter = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (newSearchParams.has(key)) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }
    router.push(`/mentors?${newSearchParams.toString()}`);
  };

  return (
    <div className="w-64  border-r p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="mb-6 mx-5">
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        {filterData.categories.map((category) => (
          <div key={category.id} className="flex items-center mb-2">
            <Checkbox
              checked={searchParams.get("category") === category.slug}
              className="text-white"
              onClick={() => updateRouter("category", category.slug)}
              id={category.id}
            />
            <Label htmlFor={category.id} className="ml-2 cursor-pointer">
              {category.name}
            </Label>
          </div>
        ))}
      </div>

      <div className="mx-5">
        <h3 className="text-sm font-medium mb-2">Hourly Rate Below</h3>
        {filterData.hourlyRate.map((rate) => (
          <div key={rate.id} className="flex items-center mb-2">
            <Checkbox
              onClick={() => updateRouter("maxrate", rate.slug)}
              checked={searchParams.get("maxrate") === rate.slug}
              className="text-white checked:bg-blue-600"
              id={rate.id}
            />
            <Label htmlFor={rate.id} className="ml-2 cursor-pointer">
              {rate.rate}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
