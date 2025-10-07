"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "./button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./popover";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./command";
import { cn } from "../../lib/utils";

interface ComboboxDemoProps {
  value: string;
  onChange: (value: string) => void;
}

const generos = [{value:"masculino", label:"Masculino"}, {value:"feminino", label:"Feminino"}];

export function Genero({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild className="">
        <Button
          role="combobox"
          className={`pl-5 text-[16px] w-full border rounded-[15px] h-[50px]  hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
        >
          <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">
            {value
              ? <div className="">{generos.find((framework) => framework.value === value)?.label as string}</div> 
              : <div className="text-[#9CA3AF]">Matéria designada</div> 
              }
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-[200px] border border-gray-400 bg-transparent p-0 rounded-[15px] z-[1100] cursor-pointer ">
        <Command className="rounded-[15px] bg-transparent"> 
          <CommandList className="rounded-[10px]  cursor-pointer ">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="cursor-pointer  bg-[rgba(12,12,14,1)] ">
              {generos.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className="text-[16px] transition-all ease-in-out duration-300 data-[selected=true]:text-yellow-400 data-[selected=true]:bg-[rgba(8,8,10,1)] hover:bg-red-500 text-white cursor-pointer bg-transparent"
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto transition-all ease-in-out duration-300",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}