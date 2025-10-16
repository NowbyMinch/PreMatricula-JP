"use client";

import { useEffect, useState } from "react";
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
import {LoadingSmaller} from "./loading";
import { usePathname } from "next/navigation";

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

type ResponsavelData = {
  nome: string;
  id?: number;
};

export function Responsavel({ value, onChange, disabled }: ComboboxDemoProps2) {
  const [ responsaveis, setResponsaveis] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const Responsaveis = async () => {
      const tok = await fetch("/api/token", { credentials: "include" });
      const data = await tok.json();
      if (!data.token) return
      const token = data.token;

      const Matricula = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/recente`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
      const matricula = await Matricula.json();
      
      const matriculaID = matricula.id;
      const Responsavel = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cadastro/responsaveis/${matriculaID}`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
      const dataResponsavel = await Responsavel.json();
      
      console.log(dataResponsavel);
      
      const array: ResponsavelData[] = Array.isArray(dataResponsavel)
      ? dataResponsavel
      : [dataResponsavel];


      const Res = array.map((item, index) => ({
        value: `Responsavel ${index + 1}`,
        label: item.nome
      }));
      setResponsaveis(Res);
    }; Responsaveis();
  },[])


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
      <input type="hidden" value={value} />

      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild className="">
          <Button
            role="combobox"
            disabled={isDisabled}
            className={`${isDisabled ? "bg-gray-700 opacity-[0.15] text-gray-400 cursor-not-allowed " : "focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-transparent text-white"} pl-5 text-[16px] w-full border rounded-[15px] h-[50px] border-gray-400 hover:border-yellow-400 ${value? "border-yellow-400": ""} hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
          >
            <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">
              {value
                ? value
                : <span className="text-[#9CA3AF]">Reponsáveis</span>
              }

              <input
                type="text"
                name="responsavel"
                value={value}
                
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
                {responsaveis.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    className="text-[16px] transition-all ease-in-out duration-300 data-[selected=true]:text-yellow-400 data-[selected=true]:bg-[rgba(8,8,10,1)] text-white cursor-pointer bg-transparent"
                    onSelect={(currentValue) => {
                      const selected = responsaveis.find(r => r.value === currentValue);
                      onChange(selected ? selected.label : "");
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

type MatriculasData = {
  numero: string;
  id?: number;
};

export function Matricula({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);
  const [ matricula, setMatricula] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      const tok = await fetch('/api/token');
      const data = await tok.json();
      if (!data.token) {return;}
      const token = data.token;
      
      const usuarioID = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/usuario-id`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
      });
      const usuarioIDRetorno = await usuarioID.json();
      const usuarioId = usuarioIDRetorno.usuarioId; 

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/usuario/${usuarioId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
      });
      const dataRes = await res.json();

      const array: MatriculasData[] = Array.isArray(dataRes.items)
      ? dataRes.items
      : [dataRes.items];

      const Res = array.map((item, index) => ({
        value: item.id !== undefined ? String(item.id) : "",
        label: `Matricula ${index + 1}`
      }));
      
      setMatricula(Res);
      setLoading(false);
      
    }; fetchToken();

  },[]);

  if (loading) return <div className="w-[120px] border rounded-[15px] h-[45px] border-gray-400 "><LoadingSmaller /></div>

  return (
    <>
      <input type="hidden" value={value} required />

      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild className="">
          <Button
            role="combobox"
            className={` text-[15px] px-3 w-fit max-w-[100px] border rounded-[15px] h-[45px] border-gray-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
          >
            <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">
              {value
                ? matricula.find((framework) => framework.value === value)?.label as string
                : <span className="text-[#9CA3AF]">Matriculas </span>
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

        <PopoverContent className="w-[130px] text-[15px] border border-gray-400 bg-transparent p-0 rounded-[15px] z-[1100] cursor-pointer ">

          <Command className="rounded-[15px] bg-transparent"> 
            <CommandList className="rounded-[10px] cursor-pointer bg-[rgba(12,12,14,1)]">
              <CommandEmpty className="text-white mx-auto text-center py-2 my-auto bg-[rgba(12,12,14,1)]">Nenhuma matrícula encontrada</CommandEmpty>
              <CommandGroup className="cursor-pointer  bg-[rgba(12,12,14,1)] relative">

                {matricula.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    className="text-[15px] transition-all ease-in-out duration-300 data-[selected=true]:text-yellow-400 data-[selected=true]:bg-[rgba(8,8,10,1)] text-white cursor-pointer bg-transparent"
                    onSelect={(currentValue) => {
                      onChange(currentValue);
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

export function Dados({ value, onChange }: ComboboxDemoProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [atual, setAtual] = useState("");
  const id = pathname.split("/")[3]; 
  
  const Dados = [
    {value:"dados_do_responsavel_financeiro", label:"Dados do responsável"}, 
    {value:"endereco_e_comunicacao_responsavel", label:"Endereço/Comunicação do responsável"}, 
    {value:"dados_do_aluno", label:"Dados do aluno"},  
    {value:"endereco_e_comunicacao_aluno", label:"Endereço/Comunicação do aluno"}
  ];

  useEffect(() => {
    const atual = Dados.filter((item) => item.value === id)[0].label;
    setAtual(atual);
  },[Dados, id])

  return (
    <>
      <input type="hidden" value={value} required />

      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild className="">
          <Button
            role="combobox"
            className={`dadosBox xl:hidden text-[15px] px-3 w-fit max-w-[100px] border rounded-[15px] h-[45px] border-gray-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
          >
            <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap text-nowrap">
              {value
                ? Dados.find((framework) => framework.value === value)?.label as string
                : atual
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

        <PopoverContent className="w-[200px] text-[15px] border border-gray-400 bg-transparent p-0 rounded-[15px] z-[1100] cursor-pointer ">

          <Command className="rounded-[15px] bg-transparent"> 
            <CommandList className="rounded-[10px] cursor-pointer bg-[rgba(12,12,14,1)]">
              <CommandEmpty className="text-white mx-auto text-center py-2 my-auto bg-[rgba(12,12,14,1)]">Nenhum dado</CommandEmpty>
              <CommandGroup className="cursor-pointer  bg-[rgba(12,12,14,1)] relative">

                {Dados.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    className="text-[15px] transition-all ease-in-out duration-300 data-[selected=true]:text-yellow-400 data-[selected=true]:bg-[rgba(8,8,10,1)] text-white cursor-pointer "
                    onSelect={(currentValue) => {
                      onChange(currentValue);
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

export function CEP({ value = "", onChange, placeholder = "00000-000", disabled }: CpfInputProps) {
  const [CEP, setCEP] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (v.length > 8) v = v.slice(0, 8); // limit to 11 digits

    // apply mask
    v = v
      .replace(/(\d{5})(\d{3})$/, "$1-$2")

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