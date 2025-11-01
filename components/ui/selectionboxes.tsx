"use client";

import { useMemo, useEffect, useState, useRef } from "react";
import { Check } from "lucide-react";
import { Button } from "./button";
import { AnimatePresence, motion } from "framer-motion";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./command";
import { cn } from "../../lib/utils";
import { Loading, LoadingSmaller } from "./loading";
import { usePathname } from "next/navigation";

const inputClass = `w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] bg-gray-700 opacity-[0.15] text-gray-400 cursor-not-allowed `;

interface ComboboxDemoProps {
  value: string;
  onChange: (value: string) => void;
}

// interface ComboboxDemoProps2 {
//   value: string;
//   onChange: (value: string) => void;
//   disabled?: (value: boolean) => void;
// }

interface ComboboxDemoProps2Check {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  enabled?: (value: boolean) => void;
}

const generos = [
  { value: "MASCULINO", label: "Masculino" },
  { value: "FEMININO", label: "Feminino" },
];

const parentesco = [
  { value: "PAI", label: "Pai" },
  { value: "MAE", label: "Mãe" },
];

export function Genero({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <input type="hidden" value={value} required />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="">
          <Button
            role="combobox"
            className={` pl-5 max-w-[480px] text-[16px] w-full border rounded-[15px] h-[50px] border-gray-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
          >
            <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">
              {value ? (
                (generos.find((framework) => framework.value === value)
                  ?.label as string)
              ) : (
                <span className="text-[#9CA3AF]">Escolha o gênero</span>
              )}

              <input
                type="text"
                name="genero"
                value={value}
                required
                onChange={() => {}}
                style={{
                  opacity: 0,
                  position: "absolute",
                  pointerEvents: "none",
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

export function Parentesco({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <input type="hidden" value={value} required />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="">
          <Button
            role="combobox"
            className={` pl-5 max-w-[480px] text-[16px] w-full border rounded-[15px] h-[50px] border-gray-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
          >
            <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">
              {value ? (
                (parentesco.find((framework) => framework.value === value)
                  ?.label as string)
              ) : (
                <span className="text-[#9CA3AF]">Escolha o parentesco</span>
              )}

              <input
                type="text"
                name="parentesco"
                value={value}
                required
                onChange={() => {}}
                style={{
                  opacity: 0,
                  position: "absolute",
                  pointerEvents: "none",
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
                {parentesco.map((framework) => (
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

export function Responsavel({
  value,
  checked,
  onChange,
  enabled,
}: ComboboxDemoProps2Check) {
  const [responsaveis, setResponsaveis] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    console.log(checked, "CHECKED FROM INSIDE");
    const Responsaveis = async () => {
      const tok = await fetch("/api/token", { credentials: "include" });
      const data = await tok.json();
      if (!data.token) return;
      const token = data.token;

      const Matricula = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/matriculas/recente`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const matricula = await Matricula.json();

      const matriculaID = matricula.id;
      const Responsavel = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cadastro/responsaveis/${matriculaID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataResponsavel = await Responsavel.json();

      const array: ResponsavelData[] = Array.isArray(dataResponsavel)
        ? dataResponsavel
        : [dataResponsavel];

      const Res = array.map((item, index) => ({
        value: `Responsavel ${index + 1}`,
        label: item.nome,
      }));
      setResponsaveis(Res);
    };
    Responsaveis();
  }, [checked]);

  const [open, setOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(checked || false);
    console.log(isEnabled, "checked", checked);
  }, [checked, isEnabled]);

  useEffect(() => {
    enabled?.(isEnabled); // call on mount with the initial checked value
  }, [checked, enabled, isEnabled]);

  return (
    <>
      <motion.label
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="inline-flex items-center cursor-pointer mt-2 w-full"
      >
        {/* Hidden native checkbox */}
        <input
          defaultChecked={isEnabled}
          onChange={() => {
            setIsEnabled(!isEnabled);
            if (enabled) enabled(!isEnabled);
            if (!isEnabled) {
              onChange("");
            }
          }}
          type="checkbox"
          className="sr-only peer"
        />

        {/* Custom checkbox */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center peer-checked:bg-yellow-400 peer-checked:border-yellow-400"
        >
          {/* Checkmark */}
          <svg
            className="w-3 h-3 text-white hidden peer-checked:block"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        {/* Label text */}
        <span className="ml-2 select-none w-full">
          Mora junto com algum dos seus responsáveis?
        </span>
      </motion.label>
      <input type="hidden" value={value} />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="">
          <Button
            role="combobox"
            disabled={!isEnabled}
            className={`${
              !isEnabled
                ? "bg-gray-700 opacity-[0.15] text-gray-400 cursor-not-allowed "
                : "focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-transparent text-white"
            } pl-5 text-[16px] w-full border rounded-[15px] h-[50px] border-gray-400 hover:border-yellow-400 ${
              value ? "border-yellow-400" : ""
            } max-w-[480px] hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
          >
            <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">
              {value ? (
                value
              ) : (
                <span className="text-[#9CA3AF]">Reponsáveis</span>
              )}

              <input
                type="text"
                name="responsavel"
                value={value}
                onChange={() => {}}
                style={{
                  opacity: 0,
                  position: "absolute",
                  pointerEvents: "none",
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
                      const selected = responsaveis.find(
                        (r) => r.value === currentValue
                      );
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

interface LocalidadeProps {
  value?: string;
  exists?: boolean;
  disabled?: boolean;
  onChange?: (value: string, exists: boolean) => void;
}

export function Localidade({ disabled, onChange }: LocalidadeProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [cidade, setCidade] = useState("");
  const [cidadeList, setCidadeList] = useState<
    { nome: string; id: number; estado: string }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // 🟡 track focus

  useEffect(() => {
    try {
      const fetchToken = async () => {
        const tok = await fetch("/api/token");
        const data = await tok.json();
        if (!data.token) return;
        const token = data.token;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matriculas/recente`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataRes = await res.json();

        const idAtualRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matriculas/atual-id`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const IDpreset = await idAtualRes.json();

        const PresetFetch = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matriculas/${IDpreset.matriculaId}/detalhe`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const preset = await PresetFetch.json();

        const etapas = [
          { value: 1, label: "1", pagina: "dados_do_responsavel_financeiro" },
          {
            value: 2,
            label: "2",
            pagina: "endereco_e_comunicacao_responsavel_financeiro",
          },
          { value: 3, label: "1b", pagina: "dados_do_responsavel" },
          {
            value: 4,
            label: "2b",
            pagina: "endereco_e_comunicacao_responsavel",
          },
          { value: 5, label: "3", pagina: "dados_do_aluno" },
          { value: 6, label: "3b", pagina: "endereco_e_comunicacao_aluno" },
        ];

        const AtualValor = etapas.filter(
          (item) =>
            item.pagina === pathname.split("/")[pathname.split("/").length - 1]
        )[0].value;
        const PresetValor = etapas.filter(
          (item) => item.label === preset.etapaAtualLabel
        )[0].value;

        if (!preset.completo && PresetValor > AtualValor) {
          console.log(preset.aluno?.cidadeNatal);

          if (pathname.endsWith("/endereco_e_comunicacao_responsavel")) {
            setCidade(preset.segundoResponsavel?.endereco?.cidade || "");
          } else if (
            pathname.endsWith("/endereco_e_comunicacao_responsavel_financeiro")
          ) {
            setCidade(preset.responsavelPrincipal?.endereco?.cidade || "");
          } else if (pathname.endsWith("/dados_do_aluno")) {
            console.log(preset.aluno?.endereco?.cidadeNatal, "CIDADE NATAL");
            setCidade(preset.aluno?.cidadeNatal || "");
          } else if (pathname.endsWith("/endereco_e_comunicacao_aluno")) {
            setCidade(preset.aluno?.cidade || "");
          }
        }

        console.log(dataRes);
      };
      fetchToken();
    } catch {
    } finally {
      setOpen(false);
    }
  }, [pathname]);

  // Fetch cidades
  useEffect(() => {
    if (cidade.length > 1) {
      fetch(`https://brasilapi.com.br/api/cptec/v1/cidade/${cidade}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCidadeList(data);
            if (document.activeElement === inputRef.current) {
              // ✅ only open if this input is focused
              setOpen(true);
            }
            onChange?.(cidade, true);
          } else {
            onChange?.(cidade, false);
            setCidadeList([]);
            setOpen(false);
          }
        })
        .catch(() => {
          setCidadeList([]);
          setOpen(false);
          onChange?.(cidade, false);
        });
    } else {
      setCidadeList([]);
      setOpen(false);
      onChange?.(cidade, false);
    }
  }, [cidade, onChange]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <input
        ref={inputRef} // 🟡 attach ref here
        type="text"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        onFocus={() => {
          if (cidadeList.length > 0) setOpen(true);
        }}
        placeholder="Digite sua cidade"
        disabled={disabled}
        className={`w-full bg-[rgba(12,12,14,1)] h-[50px] border-1 border-gray-400 rounded-[15px] px-4 py-2 text-white placeholder-gray-400 focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] focus:ring-yellow-400 transition-all duration-300 outline-none ${
          disabled
            ? "bg-gray-700 opacity-[0.15] text-gray-400 cursor-not-allowed "
            : ""
        }`}
      />

      <AnimatePresence>
        {open && cidadeList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute mt-2 w-full min-w-[220px] max-h-[200px] overflow-y-auto border border-gray-400 bg-[rgba(12,12,14,1)] rounded-[15px] shadow-lg z-[1100] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
          >
            {cidadeList.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setCidade(item.nome);
                  setOpen(false);
                }}
                className="flex items-center justify-between px-4 py-2 text-[15px] text-gray-200 cursor-pointer hover:bg-[rgba(255,215,0,0.1)] transition-colors duration-200"
              >
                <span>
                  {item.nome}{" "}
                  <span className="text-gray-500 text-sm">({item.estado})</span>
                </span>
                {cidade.toLowerCase() === item.nome.toLowerCase() && (
                  <Check className="text-yellow-400 h-4 w-4" />
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const civil = [
  { value: "SOLTEIRO", label: "Solteiro" },
  { value: "CASADO", label: "Casado" },
  { value: "DIVORCIADO", label: "Divorciado" },
  { value: "SEPARADO", label: "Separado" },
  { value: "VIUVO", label: "Viúvo" },
  { value: "UNIAO_ESTAVEL", label: "União estável" },
];

export function Civil({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="">
          <Button
            role="combobox"
            className={`pl-5 max-w-[480px] text-[16px] w-full border rounded-[15px] h-[50px] border-gray-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
          >
            <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">
              {value ? (
                <div className="">
                  {
                    civil.find((framework) => framework.value === value)
                      ?.label as string
                  }
                </div>
              ) : (
                <div className="text-[#9CA3AF]">Escolha o estado civíl</div>
              )}

              <input
                type="text"
                name="genero"
                value={value}
                required
                onChange={() => {}}
                style={{
                  opacity: 0,
                  position: "absolute",
                  pointerEvents: "none",
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
  const [matricula, setMatricula] = useState<
    { value: string; label: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  // const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const tok = await fetch("/api/token");
      const data = await tok.json();
      if (!data.token) {
        return;
      }
      const token = data.token;

      const usuarioID = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/matriculas/usuario-id`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const usuarioIDRetorno = await usuarioID.json();
      const usuarioId = usuarioIDRetorno.usuarioId;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/matriculas/usuario/${usuarioId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataRes = await res.json();

      const array: MatriculasData[] = Array.isArray(dataRes.items)
        ? dataRes.items
        : [dataRes.items];

      const Res = array.map((item, index) => ({
        value: item.id !== undefined ? String(item.id) : "",
        label: `Matrícula ${index + 1}`,
      }));

      setMatricula(Res);
      setLoading(false);
    };
    fetchToken();
  }, []);

  if (loading)
    return (
      <div className="w-[120px] border rounded-[15px] h-[45px] border-gray-400 ">
        <LoadingSmaller />
      </div>
    );

  return (
    <>
      <input type="hidden" value={value} required />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="">
          <Button
            role="combobox"
            className={` text-[15px] px-3 w-fit max-w-[110px] border rounded-[15px] h-[45px] border-gray-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
          >
            <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">
              {value ? (
                (matricula.find((framework) => framework.value === value)
                  ?.label as string)
              ) : (
                <span className="text-[#9CA3AF]">Matriculas </span>
              )}

              <input
                type="text"
                name="genero"
                value={value}
                required
                onChange={() => {}}
                style={{
                  opacity: 0,
                  position: "absolute",
                  pointerEvents: "none",
                }}
              />
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[150px] text-[15px] border border-gray-400 bg-transparent p-0 rounded-[15px] z-[1100] cursor-pointer ">
          <Command className="rounded-[15px] bg-transparent">
            <CommandList className="rounded-[10px] cursor-pointer bg-[rgba(12,12,14,1)]">
              <CommandEmpty className="text-white mx-auto text-center py-2 my-auto bg-[rgba(12,12,14,1)]">
                Nenhuma matrícula encontrada
              </CommandEmpty>
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

// export function CidadeSearch({ value }: ComboboxDemoProps) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   // const router = useRouter();

//   useEffect(() => {
//     if (value.length > 2) {
//       async function fetchCidades() {
//         setLoading(true);
//         try {
//           const res = await fetch(`https://brasilapi.com.br/api/cptec/v1/cidade/${value}`);
//           const data = await res.json();
//           console.log(data, "Data");
//           // setTodasCidades(data);

//         } catch (err) {
//           console.error("Erro ao buscar cidades:", err);
//         } finally {
//           setLoading(false);
//         }

//       } fetchCidades();
//     }

//   }, [value]);

//   if (loading) return <div className="w-[120px] border rounded-[15px] h-[45px] border-gray-400 "><LoadingSmaller /></div>

//   return (
//     <>
//       <input type="hidden" value={value} required />

//         <Popover open={open} onOpenChange={setOpen} >
//           <PopoverTrigger asChild className="">
//             <Button
//               className={` text-[15px] px-3 w-fit max-w-[110px] border rounded-[15px] h-[45px] border-gray-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
//             >
//               <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">

//                 {/* {value
//                   ? matricula.find((framework) => framework.value === value)?.label as string
//                   : <span className="text-[#9CA3AF]">Matriculas </span>
//                 } */}

//                 <input
//                   type="text"
//                   name="genero"
//                   value={value}
//                   required
//                   onChange={() => {}}
//                   style={{
//                     opacity: 0,
//                     position: 'absolute',
//                     pointerEvents: 'none',
//                   }}
//                 />
//               </span>
//             </Button>

//           </PopoverTrigger>

//           <PopoverContent className="w-[150px] text-[15px] border border-gray-400 bg-transparent p-0 rounded-[15px] z-[1100] cursor-pointer ">

//             <Command className="rounded-[15px] bg-transparent">
//               <CommandList className="rounded-[10px] cursor-pointer bg-[rgba(12,12,14,1)]">
//                 <CommandGroup className="cursor-pointer  bg-[rgba(12,12,14,1)] relative">

//                   {/* {matricula.map((framework) => (
//                     <CommandItem
//                       key={framework.value}
//                       value={framework.value}
//                       className="text-[15px] transition-all ease-in-out duration-300 data-[selected=true]:text-yellow-400 data-[selected=true]:bg-[rgba(8,8,10,1)] text-white cursor-pointer bg-transparent"
//                       onSelect={(currentValue) => {
//                         onChange(currentValue);
//                         setOpen(false);
//                       }}
//                     >
//                       {framework.label}
//                       <Check
//                         className={cn(
//                           "ml-auto transition-all ease-in-out duration-300",
//                           value === framework.value ? "opacity-100" : "opacity-0"
//                         )}
//                       />
//                     </CommandItem>
//                   ))} */}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>

//         </Popover>

//     </>
//   );
// }

// export function Cidade({ value, onChange }: ComboboxDemoProps) {
//   const [open, setOpen] = useState(false);
//   const [ matricula, setMatricula] = useState<{ value: string; label: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   // const router = useRouter();

//   if (loading) return <div className="w-[120px] border rounded-[15px] h-[45px] border-gray-400 "><LoadingSmaller /></div>

//   return (
//     <>
//       <input type="hidden" value={value} required />

//       <Popover open={open} onOpenChange={setOpen} >
//         <PopoverTrigger asChild className="">
//           <Button
//             role="combobox"
//             className={` text-[15px] px-3 w-fit max-w-[110px] border rounded-[15px] h-[45px] border-gray-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
//           >
//             <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">
//               {value
//                 ? matricula.find((framework) => framework.value === value)?.label as string
//                 : <span className="text-[#9CA3AF]">Matriculas </span>
//               }

//               <input
//                 type="text"
//                 name="genero"
//                 value={value}
//                 required
//                 onChange={() => {}}
//                 style={{
//                   opacity: 0,
//                   position: 'absolute',
//                   pointerEvents: 'none',
//                 }}
//               />
//             </span>
//           </Button>

//         </PopoverTrigger>

//         <PopoverContent className="w-[150px] text-[15px] border border-gray-400 bg-transparent p-0 rounded-[15px] z-[1100] cursor-pointer ">

//           <Command className="rounded-[15px] bg-transparent">
//             <CommandList className="rounded-[10px] cursor-pointer bg-[rgba(12,12,14,1)]">
//               <CommandEmpty className="text-white mx-auto text-center py-2 my-auto bg-[rgba(12,12,14,1)]">Nenhuma matrícula encontrada</CommandEmpty>
//               <CommandGroup className="cursor-pointer  bg-[rgba(12,12,14,1)] relative">

//                 {matricula.map((framework) => (
//                   <CommandItem
//                     key={framework.value}
//                     value={framework.value}
//                     className="text-[15px] transition-all ease-in-out duration-300 data-[selected=true]:text-yellow-400 data-[selected=true]:bg-[rgba(8,8,10,1)] text-white cursor-pointer bg-transparent"
//                     onSelect={(currentValue) => {
//                       onChange(currentValue);
//                       setOpen(false);
//                     }}
//                   >
//                     {framework.label}
//                     <Check
//                       className={cn(
//                         "ml-auto transition-all ease-in-out duration-300",
//                         value === framework.value ? "opacity-100" : "opacity-0"
//                       )}
//                     />
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>

//       </Popover>

//     </>
//   );
// }

export function Dados({ value, onChange }: ComboboxDemoProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [atual, setAtual] = useState("");
  const id = pathname.split("/")[3];

  const Dados = useMemo(
    () => [
      { value: "dados_do_responsavel", label: "Dados do responsável" },
      {
        value: "endereco_e_comunicacao_responsavel",
        label: "Endereço/Comunicação do responsável",
      },
      { value: "dados_do_aluno", label: "Dados do aluno" },
      {
        value: "endereco_e_comunicacao_aluno",
        label: "Endereço/Comunicação do aluno",
      },
    ],
    []
  ); // <- empty array: only created once

  useEffect(() => {
    const found = Dados.find((item) => item.value === id);
    if (found) {
      setAtual(found.label);
    } else {
      setAtual(""); // ou um texto padrão, tipo "Selecione"
    }
  }, [Dados, id]); // now Dados is stable, effect runs only when id changes

  return (
    <>
      <input type="hidden" value={value} required />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="">
          <Button
            role="combobox"
            className={`dadosBox xl:hidden text-[15px] px-3 w-fit max-w-[100px] border rounded-[15px] h-[45px] border-gray-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
          >
            <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap text-nowrap">
              {value
                ? (Dados.find((framework) => framework.value === value)
                    ?.label as string)
                : atual}

              <input
                type="text"
                name="genero"
                value={value}
                required
                onChange={() => {}}
                style={{
                  opacity: 0,
                  position: "absolute",
                  pointerEvents: "none",
                }}
              />
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] text-[15px] border border-gray-400 bg-transparent p-0 rounded-[15px] z-[1100] cursor-pointer ">
          <Command className="rounded-[15px] bg-transparent">
            <CommandList className="rounded-[10px] cursor-pointer bg-[rgba(12,12,14,1)]">
              <CommandEmpty className="text-white mx-auto text-center py-2 my-auto bg-[rgba(12,12,14,1)]">
                Nenhum dado
              </CommandEmpty>
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

type CpfInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  cnpj?: boolean;
};

export function CpfInput({
  value = "",
  onChange,
  placeholder,
  disabled,
  cnpj = false,
}: CpfInputProps) {
  const maskCPF = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  const maskCNPJ = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 14)
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");

  const maskedValue = cnpj ? maskCNPJ(value) : maskCPF(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const next = cnpj ? maskCNPJ(raw) : maskCPF(raw);
    onChange?.(next);
  };

  return (
    <motion.input
      value={maskedValue}
      onChange={handleChange}
      placeholder={
        placeholder || (cnpj ? "00.000.000/0000-00" : "000.000.000-00")
      }
      disabled={disabled}
      type="text"
      className={`w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    />
  );
}

export function NumeroRG({
  value = "",
  onChange,
  placeholder = "00.000.000-0",
  ...props
}: CpfInputProps) {
  const [numeroRG, setNumeroRG] = useState(value);
  useEffect(() => {
    setNumeroRG(value || "");
  }, [value]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (v.length > 9) v = v.slice(0, 9); // limit to 11 digits

    // apply mask
    v = v
      .replace(/(\d{2})(\d)/, "$1.$2")
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
      type="text"
      className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}
    />
  );
}

export function CEP({
  value = "",
  onChange,
  placeholder = "00000-000",
  disabled,
}: CpfInputProps) {
  const [CEP, setCEP] = useState("");

  // Helper to format CEP
  const formatCEP = (v: string) => {
    let val = v.replace(/\D/g, "");
    if (val.length > 8) val = val.slice(0, 8);
    return val.replace(/(\d{5})(\d{3})$/, "$1-$2");
  };

  // Keep formatted value in sync when prop changes
  useEffect(() => {
    setCEP(formatCEP(value || ""));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value);
    setCEP(formatted);
    onChange?.(formatted);
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
      className={`${
        disabled
          ? inputClass
          : "w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
      }`}
    />
  );
}

export function Numero({
  value = "",
  onChange,
  placeholder = "000",
  disabled,
  ...props
}: CpfInputProps) {
  const [numero, setNumero] = useState("");

  // Keep state updated when prop changes
  useEffect(() => {
    setNumero(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (v.length > 3) v = v.slice(0, 3); // limit to 3 digits
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
      className={`${
        disabled
          ? inputClass
          : "w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
      }`}
    />
  );
}

export function Celular({
  value = "",
  onChange,
  placeholder = "(00) 00000-0000",
  disabled,
  ...props
}: CpfInputProps) {
  const [numero, setNumero] = useState("");

  // ✅ Masking function (returns empty string if no digits)
  const maskPhone = (input: string) => {
    let digits = input.replace(/\D/g, "");
    if (!digits) return ""; // <- avoid showing "(" when empty

    if (digits.length > 11) digits = digits.slice(0, 11);

    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  // 🧩 Apply mask instantly when the value prop changes
  useEffect(() => {
    if (value) {
      const masked = maskPhone(value);
      setNumero(masked);
    } else {
      setNumero("");
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskPhone(e.target.value);
    setNumero(masked);
    onChange?.(masked);
  };

  return (
    <motion.input
      required
      inputMode="numeric"
      value={numero}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      {...props}
      className={`${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
      }`}
    />
  );
}

export function CelularVariation({
  value = "",
  onChange,
  placeholder = "(00) 00000-0000",
  disabled,
  ...props
}: CpfInputProps) {
  const [numero, setNumero] = useState(value);
  const [prevRaw, setPrevRaw] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const isDeleting = input.length < prevRaw.length;
    setPrevRaw(input);

    let digits = input.replace(/\D/g, "");
    if (digits.length > 11) digits = digits.slice(0, 11);

    // 🧠 don't rebuild the mask while user is deleting the ")" or space
    if (
      isDeleting &&
      prevRaw.endsWith(") ") &&
      input.length === prevRaw.length - 2
    ) {
      // User just tried to backspace past ") ", allow it to remove both
      setNumero(input);
      onChange?.(input);
      return;
    }

    let masked = digits;

    if (digits.length > 2) {
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length > 0) {
      masked = `(${digits}`;
    }

    if (digits.length > 6) {
      masked = masked.replace(/(\d{5})(\d)/, "$1-$2");
    }

    setNumero(masked);
    onChange?.(masked);
  };

  return (
    <motion.input
      required
      inputMode="numeric"
      value={`(${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(
        7,
        11
      )}`}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      {...props}
      className={`${
        disabled
          ? "pointer-events-auto w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
          : "w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
      }`}
    />
  );
}

export function CelularNotRequired({
  value = "",
  onChange,
  placeholder = "(00) 00000-0000",
  disabled,
  ...props
}: CpfInputProps) {
  const [numero, setNumero] = useState(value);
  const [prevRaw, setPrevRaw] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const isDeleting = input.length < prevRaw.length;
    setPrevRaw(input);

    let digits = input.replace(/\D/g, "");
    if (digits.length > 11) digits = digits.slice(0, 11);

    // 🧠 don't rebuild the mask while user is deleting the ")" or space
    if (
      isDeleting &&
      prevRaw.endsWith(") ") &&
      input.length === prevRaw.length - 2
    ) {
      // User just tried to backspace past ") ", allow it to remove both
      setNumero(input);
      onChange?.(input);
      return;
    }

    let masked = digits;

    if (digits.length > 2) {
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length > 0) {
      masked = `(${digits}`;
    }

    if (digits.length > 6) {
      masked = masked.replace(/(\d{5})(\d)/, "$1-$2");
    }

    setNumero(masked);
    onChange?.(masked);
  };

  return (
    <motion.input
      inputMode="numeric"
      value={numero}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      {...props}
      className={`${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
      }`}
    />
  );
}

interface ComboboxDemoPropsCursos {
  value: string;
  onChange: (value: string) => void;
  onListChange?: (list: string[]) => void;
  onListChangeID?: (list: string[]) => void;
  cursos?: { value: string; label: string }[];
}

export function Cursos({
  value,
  onChange,
  onListChange,
  onListChangeID,
}: ComboboxDemoPropsCursos) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number[]>([]);
  const [selectedName, setSelectedName] = useState<string[]>([]);
  const [cursoID, setCursoID] = useState<string[]>([]);
  const [cursos, setCursos] = useState<{ value: string; label: string }[]>([]);
  const [cursos2, setCursos2] = useState<
    { value: string; label: string; tipoCurso: string; cursoID: string }[]
  >([]);

  useEffect(() => {
    const Turmas = async () => {
      const tok = await fetch("/api/token");
      const data = await tok.json();
      if (!data.token) {
        return;
      }
      const token = data.token;

      const Turma = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/integracoes/sponte/cursos?sParametrosBusca=AnoLetivo=${
          new Date().getFullYear() + 1
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const turmaXML = await Turma.text();

      // Wrap in a root tag in case the response contains multiple <wsCurso> siblings
      const wrapped = `<?xml version="1.0" encoding="UTF-8"?><root>${turmaXML}</root>`;

      // parse
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(wrapped, "application/xml");

      // now get all wsCurso elements
      const wsCursos = Array.from(xmlDoc.getElementsByTagName("wsCurso"));

      // extract course names (first <Nome> inside each wsCurso)
      const Curso = wsCursos.map(
        (curso) =>
          curso.getElementsByTagName("TipoCurso")[0]?.textContent?.trim() ?? ""
      );
      const uniqueCurso = Array.from(new Set(Curso));

      const Res = [
        { value: "", label: "Nenhum" }, // <- this will clear the selection
        ...uniqueCurso.map((item) => ({
          value: item,
          label: item,
        })),
      ];

      const Res2 = wsCursos.map((curso) => ({
        value: curso.getElementsByTagName("Nome")[0]?.textContent?.trim() ?? "",
        label: curso.getElementsByTagName("Nome")[0]?.textContent?.trim() ?? "",
        tipoCurso:
          curso.getElementsByTagName("TipoCurso")[0]?.textContent?.trim() ?? "",
        cursoID:
          curso.getElementsByTagName("CursoID")[0]?.textContent?.trim() ?? "",
      }));

      setCursos(Res);
      setCursos2(Res2);

      setLoading(false);
    };
    Turmas();
  }, []);

  const handleSelect = (index: number) => {
    setSelected((prev) => {
      const isSelected = prev.includes(index);
      const newSelected = isSelected
        ? prev.filter((i) => i !== index)
        : [...prev, index];

      return newSelected;
    });

    setSelectedName((prev) => {
      const isSelected = prev.includes(cursos2[index]?.label);
      const newSelected = isSelected
        ? prev.filter((i) => i !== cursos2[index]?.label)
        : [...prev, cursos2[index]?.label];

      return newSelected;
    });

    setCursoID((prev) => {
      const isSelected = prev.includes(cursos2[index]?.cursoID);
      const newSelected = isSelected
        ? prev.filter((i) => i !== cursos2[index]?.cursoID)
        : [...prev, cursos2[index]?.cursoID];

      return newSelected;
    });
  };

  useEffect(() => {
    if (onListChange) {
      onListChange(selectedName);
    }

    if (onListChangeID) {
      onListChangeID(cursoID);
    }
  }, [selectedName, onListChange, cursoID, onListChangeID]);

  if (loading) return <Loading />;

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex gap-10">
          <div className="flex flex-col gap-2 w-fit">
            <motion.label className="cursor-text w-fit">
              Turma de interesse
            </motion.label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="">
                <Button
                  role="combobox"
                  className={`pl-5 text-[16px] w-full border rounded-[15px] h-[50px] border-gray-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:bg-transparent transition-all ease-in-out duration-300 bg-transparent cursor-pointer `}
                >
                  <span className="font-normal w-full block text-left rounded-[15px] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap ">
                    {value ? (
                      <div className="">
                        {
                          cursos.find((framework) => framework.value === value)
                            ?.label as string
                        }
                      </div>
                    ) : (
                      <div className="text-[#9CA3AF]">
                        Escolha a turma de interesse
                      </div>
                    )}

                    <input
                      type="text"
                      name="genero"
                      value={value}
                      required
                      onChange={() => {}}
                      style={{
                        opacity: 0,
                        position: "absolute",
                        pointerEvents: "none",
                      }}
                    />
                  </span>
                </Button>
              </PopoverTrigger>

              <PopoverContent className="min-w-[200px] border border-gray-400 bg-transparent p-0 rounded-[15px] z-[1100] cursor-pointer ">
                <Command className="rounded-[15px] bg-transparent">
                  <CommandList className="rounded-[10px] bg-[rgba(12,12,14,1)] cursor-pointer ">
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup className="cursor-pointer  bg-[rgba(12,12,14,1)] ">
                      {cursos.map((framework, index) => (
                        <CommandItem
                          key={index}
                          value={framework.value}
                          className="text-[16px] transition-all ease-in-out duration-300 data-[selected=true]:text-yellow-400 data-[selected=true]:bg-[rgba(8,8,10,1)] text-white cursor-pointer bg-transparent"
                          onSelect={(currentValue) => {
                            onChange(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {framework.label}
                          <Check
                            className={cn(
                              "ml-auto transition-all ease-in-out duration-300",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="w-full h-[350px] overflow-y-auto border border-gray-400 rounded-[20px] pt-3 px-3 flex flex-col gap-3 ">
          {!value
            ? cursos2.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    index === cursos2.length - 1 && "pb-3"
                  } flex gap-2 items-center `}
                >
                  {/* Box */}
                  <motion.button
                    onClick={() => {
                      handleSelect(index);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-6 h-6  rounded-[8px] cursor-pointer ${
                      selected.includes(index)
                        ? "bg-yellow-400"
                        : "border border-gray-400"
                    }`}
                  ></motion.button>
                  <span>{item.label}</span>
                </div>
              ))
            : cursos2
                .filter((framework) => framework.tipoCurso === value)
                .map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      index === cursos2.length - 1 && "pb-3"
                    } flex gap-2 items-center `}
                  >
                    {/* Box */}
                    <motion.button
                      onClick={() => {
                        handleSelect(index);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-6 h-6  rounded-[8px] cursor-pointer ${
                        selected.includes(index)
                          ? "bg-yellow-400"
                          : "border border-gray-400"
                      }`}
                    ></motion.button>
                    <span>{item.label}</span>
                  </div>
                ))}
        </div>
      </motion.div>

      <input type="hidden" name="genero" value={value} required />
    </>
  );
}
