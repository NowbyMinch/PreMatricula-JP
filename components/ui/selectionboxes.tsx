"use client";

import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { Button } from "./button";
import { motion } from "framer-motion";
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
import { AnimatePresence } from "framer-motion";

interface ComboboxDemoProps {
  value: string;
  onChange: (value: string) => void;
}

const generos = [{value:"MASCULINO", label:"Masculino"}, {value:"FEMININO", label:"Feminino"}];

export function Genero({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <>

      <input type="hidden" value={value} required />

      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild className="">
          <Button
            role="combobox"
            className={`pl-5 text-[16px] w-full border rounded-[15px] h-[50px] border-gray-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
          >
            <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">
              {value
                ? generos.find((framework) => framework.value === value)?.label as string
                : <span className="text-[#9CA3AF]">Escolha o gênero</span>
              }

              <input
                type="text"
                name="genero"
                value={value}
                required
                onChange={() => {}}
                style={{
                  opacity: 0,
                  position: 'absolute',
                  pointerEvents: 'none',
                }}
              />
            </span>
          </Button>

        </PopoverTrigger>

        <PopoverContent className="min-w-[200px] border border-gray-400 bg-transparent p-0 rounded-[15px] z-[1100] cursor-pointer ">

          <Command className="rounded-[15px] bg-transparent"> 
            <CommandList className="rounded-[10px]  cursor-pointer ">
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup className="cursor-pointer  bg-[rgba(12,12,14,1)] relative">

                {generos.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    className="text-[16px] transition-all ease-in-out duration-300 data-[selected=true]:text-yellow-400 data-[selected=true]:bg-[rgba(8,8,10,1)] text-white cursor-pointer bg-transparent"
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
    
      
    </>
  );
}

const civil = [
  {value:"SOLTEIRO", label:"Solteiro"}, 
  {value:"CASADO", label:"Casado"},
  {value:"DIVORCIADO", label:"Divorciado"},
  {value:"SEPARADO", label:"Separado"}, 
  {value:"VIUVO", label:"Viúvo"},
  {value:"UNIAO_ESTAVEL", label:"União estável"},
];

export function Civil({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild className="">
          <Button
            role="combobox"
            className={`pl-5 text-[16px] w-full border rounded-[15px] h-[50px] border-gray-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
          >
            <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">
              {value
                ? <div className="">{civil.find((framework) => framework.value === value)?.label as string}</div> 
                : <div className="text-[#9CA3AF]">Escolha o estado civíl</div> 
              }
              
              <input
                type="text"
                name="genero"
                value={value}
                required
                onChange={() => {}}
                style={{
                  opacity: 0,
                  position: 'absolute',
                  pointerEvents: 'none',
                }}
              />

            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="min-w-[200px] border border-gray-400 bg-transparent p-0 rounded-[15px] z-[1100] cursor-pointer ">
          <Command className="rounded-[15px] bg-transparent"> 
            <CommandList className="rounded-[10px]  cursor-pointer ">
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup className="cursor-pointer  bg-[rgba(12,12,14,1)] ">
                {civil.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    className="text-[16px] transition-all ease-in-out duration-300 data-[selected=true]:text-yellow-400 data-[selected=true]:bg-[rgba(8,8,10,1)] text-white cursor-pointer bg-transparent"
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
    
      <input type="hidden" name="genero" value={value} required />

    </>
  );
}

interface CpfInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CpfInput({ value = "", onChange, placeholder = "000.000.000-00", className = ""}: CpfInputProps) {
  const [cpf, setCpf] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (v.length > 11) v = v.slice(0, 11); // limit to 11 digits

    // apply mask
    v = v
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setCpf(v);
    onChange?.(v);
  };

  return (
    <motion.input
    required
    inputMode="numeric"
    value={cpf}
    onChange={handleChange}
    placeholder={placeholder}
    type="text" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
  )
};

export function NumeroRG({ value = "", onChange, placeholder = "000.000.000-0", className = "", ...props }: CpfInputProps) {
  const [numeroRG, setNumeroRG] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (v.length > 10) v = v.slice(0, 10); // limit to 11 digits

    // apply mask
    v = v
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setNumeroRG(v);
    onChange?.(v);
  };
  return (
    <motion.input
    required
    inputMode="numeric"
    value={numeroRG}
    onChange={handleChange}
    placeholder={placeholder}
    {...props}
    type="text" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
  )
};

export function CEP({ value = "", onChange, placeholder = "00.000-000", className = ""}: CpfInputProps) {
  const [CEP, setCEP] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (v.length > 8) v = v.slice(0, 8); // limit to 11 digits

    // apply mask
    v = v
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")

    setCEP(v);
    onChange?.(v);
  };

  return (
    <motion.input
    required
    inputMode="numeric"
    value={CEP}
    onChange={handleChange}
    placeholder={placeholder}
    type="text" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
  )
};

export function Numero({ value = "", onChange, placeholder = "000", className = "", ...props }: CpfInputProps) {
  const [numero, setNumero] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (v.length > 3) v = v.slice(0, 3); // limit to 11 digits

    setNumero(v);
    onChange?.(v);
  };

  return (
    <motion.input
    required
    inputMode="numeric"
    value={numero}
    onChange={handleChange}
    placeholder={placeholder}
    {...props}
    type="text" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
  )
};

export function Celular({ value = "", onChange, placeholder = "(00) 00000-0000", className = "", ...props }: CpfInputProps) {
  const [numero, setNumero] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (v.length > 11) v = v.slice(0, 11); // limit to 11 digits

    v = v
      .replace(/(\d{2})/, "($1) ",)
      .replace(/(\d{5})(\d)/, "$1-$2",)

    setNumero(v);
    onChange?.(v);
  };

  return (
    <motion.input
    required
    inputMode="numeric"
    value={numero}
    onChange={handleChange}
    placeholder={placeholder}
    {...props}
    type="text" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
  )
};