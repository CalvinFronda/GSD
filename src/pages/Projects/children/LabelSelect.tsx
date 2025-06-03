"use client";

import { Plus, X } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

const defaultLabels = ["Easy", "Medium", "Hard", "Very Hard"];

type LabelSelectProps = {
  values: string[];
  onChange: (values: string[]) => void;
};

export const LabelSelect = ({ values, onChange }: LabelSelectProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(defaultLabels);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = input
    ? options.filter((opt) => opt.toLowerCase().includes(input.toLowerCase()))
    : options;

  const canCreate = input.length > 0 && !options.includes(input);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const toggleValue = (label: string) => {
    console.log("label", label);
    if (values.includes(label)) {
      onChange(values.filter((v) => v !== label));
    } else {
      onChange([...values, label]);
    }
  };

  const handleCreate = () => {
    if (canCreate) {
      setOptions((prev) => [...prev, input]);
      onChange([...values, input]);
      setInput("");
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canCreate) {
      e.preventDefault();
      handleCreate();
    }
  };

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2 ">
        {values.map((label) => (
          <Badge
            key={label}
            variant="secondary"
            className="flex items-center gap-1 bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full"
            onClick={() => toggleValue(label)}
          >
            {label}
            <Button className="w-5 h-5" size="sm" variant="ghost">
              <X className="w-2 h-2 cursor-pointer" />
            </Button>
          </Badge>
        ))}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className="w-50 justify-between"
          >
            {values.length === 0 ? "Select or create labels" : "Edit labels"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 pointer-events-auto">
          <Command>
            <CommandInput
              placeholder="Search or create label..."
              ref={inputRef}
              value={input}
              onValueChange={setInput}
              onKeyDown={handleKeyDown}
            />
            <CommandEmpty>
              {canCreate ? (
                <div
                  className="p-2 cursor-pointer flex items-center gap-2 hover:bg-muted rounded-sm"
                  onClick={handleCreate}
                >
                  <Plus className="w-4 h-4" />
                  Create “{input}”
                </div>
              ) : (
                "No results found"
              )}
            </CommandEmpty>
            <CommandGroup>
              {filtered.map((label) => (
                <CommandItem
                  key={label}
                  value={label}
                  onSelect={() => toggleValue(label)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full border",
                        values.includes(label)
                          ? "bg-primary border-primary"
                          : "border-muted-foreground",
                      )}
                    />
                    {label}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
