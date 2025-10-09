"use client";

import { useState } from "react";
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

const inputClass = `w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 
    border-gray-400 max-w-[480px] bg-gray-700 opacity-[0.15] text-gray-400 cursor-not-allowed `;

interface ComboboxDemoProps {
  value: string;
  onChange: (value: string) => void;
}

interface ComboboxDemoProps2 {
  value: string;
  onChange: (value: string) => void;
  disabled?: (value: boolean) => void;
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

const responsavel = [{value:"RESPONSAVEL1", label:"María"}, {value:"RESPONSAVEL2", label:"Marío"}];

export function Responsavel({ value, onChange, disabled }: ComboboxDemoProps2) {
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  
  return (
    <>
      <motion.label 
      initial={{scale:0}}
      animate={{scale:1}}
      exit={{scale:0}}
      className="inline-flex items-center cursor-pointer mt-2">
          {/* Hidden native checkbox */}
          <input onChange={() => {
            setIsDisabled(!isDisabled);
            if (disabled) disabled(isDisabled); 
            if (!isDisabled) {onChange("")}; 
            console.log(disabled)
          }} type="checkbox" className="sr-only peer" />

          {/* Custom checkbox */}
          <motion.div 
          whileHover={{scale:1.10}}
          whileTap={{scale:0.90}}
          className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center peer-checked:bg-yellow-400 peer-checked:border-yellow-400">
              {/* Checkmark */}
              <svg className="w-3 h-3 text-white hidden peer-checked:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
              </svg>
          </motion.div>

          {/* Label text */}
          <span className="ml-2 select-none">Mora junto com algum dos seus responsáveis?</span>
      </motion.label>
      <input type="hidden" value={value} required />

      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild className="">
          <Button
            role="combobox"
            disabled={isDisabled}
            className={`${isDisabled ? "bg-gray-700 opacity-[0.15] text-gray-400 cursor-not-allowed " : "focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-transparent text-white"} pl-5 text-[16px] w-full border rounded-[15px] h-[50px] border-gray-400 hover:border-yellow-400 ${value? "border-yellow-400": ""} hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
          >
            <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">
              {value
                ? responsavel.find((framework) => framework.value === value)?.label as string
                : <span className="text-[#9CA3AF]">Reponsáveis</span>
              }

              <input
                type="text"
                name="responsavel"
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

                {/* <CommandItem
                  value={""}
                  className="text-[16px] transition-all ease-in-out duration-300 data-[selected=true]:text-yellow-400 data-[selected=true]:bg-[rgba(8,8,10,1)] text-white cursor-pointer bg-transparent"
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  Nenhum
                  <Check
                    className={cn(
                      "ml-auto transition-all ease-in-out duration-300",
                      value === "a" ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem> */}
                {responsavel.map((framework) => (
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
  disabled: boolean;
  // className?: string;
}

export function CpfInput({ value = "", onChange, placeholder = "000.000.000-00", }: CpfInputProps) {
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

export function NumeroRG({ value = "", onChange, placeholder = "000.000.000-0",  ...props }: CpfInputProps) {
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

export function CEP({ value = "", onChange, placeholder = "00.000-000", disabled }: CpfInputProps) {
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
    type="text" 
    disabled={disabled}
    className={`${disabled? inputClass : "w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"}`}/>
  )
};

export function Numero({ value = "", onChange, placeholder = "000", disabled, ...props }: CpfInputProps) {
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
    type="text" 
    disabled={disabled}
    className={`${disabled? inputClass : "w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] "}`}/>
  )
};

export function Celular({ value = "", onChange, placeholder = "(00) 00000-0000", disabled,  ...props }: CpfInputProps) {
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
    disabled={disabled}
    className={`${disabled? inputClass : " w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"} `}/>
  )
};