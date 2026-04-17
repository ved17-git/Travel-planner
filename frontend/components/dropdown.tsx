"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
];

export default function Example() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-xl mx-auto relative">
      <Popover open={open} onOpenChange={setOpen}>
        
        <PopoverTrigger className="w-full">
          <Button
            className="w-full justify-between"
            variant="outline"
            role="combobox"
          >
            {value
              ? countries.find((c) => c.value === value)?.label
              : "Select country..."}
            <ChevronsUpDown className="ml-2 size-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        {/* ✅ FULL WIDTH FIX */}
        <PopoverContent
          className="w-full p-0"
          align="start"
        >
          <Command>
            <CommandInput
              placeholder="Search country..."
              className="h-11 px-4"
            />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.value}
                    value={country.value}
                    onSelect={(val) => {
                      setValue(val === value ? "" : val);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        value === country.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {country.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>

      </Popover>
    </div>
  );
}