"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { countriesList } from "@/lib/helperFunctions";
import { useRouter } from "next/navigation";

export default function CountriesDropdown({ country, redirectUrl }) {
  const router = useRouter();
  return (
    <Select
      value={country ? country : ""}
      onValueChange={(newVal) =>
        router.push(`?country=${newVal === "global" ? "" : newVal}`, {
          scroll: false,
        })
      }
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select Country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"global"} className="font-semibold">
          Global
        </SelectItem>
        {countriesList.map((country, idx) => (
          <SelectItem key={idx} value={country}>
            {country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
