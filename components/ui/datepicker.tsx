'use client';
import { useEffect, useState, useRef } from 'react';
import { format, parse, isValid, startOfMonth, endOfMonth, startOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import React from 'react';
import ErrorModal from './ErrorModal';

type DatePickerProps = {
  onChange: (date: string) => void; // formato "YYYY-MM-DD"
};

export function DatePicker({ onChange }: DatePickerProps ) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [focused, setFocused] = useState(false);
  const [focused2, setFocused2] = useState(false);
  const [focused3, setFocused3] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const ValueRef = useRef<HTMLInputElement | null>(null);
  const ValueRef2 = useRef<HTMLInputElement | null>(null);
  const ValueRef3 = useRef<HTMLInputElement | null>(null);
  
  const handleKeyUp = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (index === 3 && ValueRef3.current?.value === "") {
        ValueRef2.current?.focus();
      } else if (index === 2 && ValueRef2.current?.value === "") {
        ValueRef.current?.focus();
      }
    }
  };
  
  useEffect(() => {
    if (isNaN(parseInt(inputValue.slice(-1)))){
        setInputValue(inputValue.slice(0,-1))
    ;}
    else if (inputValue === "00"){
      setInputValue("01");
    }
    else if (parseInt(inputValue) > 31){
      setInputValue("31");
    } else if (inputValue2 === "1" || inputValue2 === "3" || inputValue2 === "5" || inputValue2 === "7" || inputValue2 === "8" || inputValue2 === "10" || inputValue2 === "12"){
      console.log(inputValue2)
      if (parseInt(inputValue) > 31) {
        setInputValue("31");
      }
    } else if (inputValue2 === "4" || inputValue2 === "6" || inputValue2 === "9" || inputValue2 === "11" ) {
      console.log(inputValue2)

      if (parseInt(inputValue) > 30) {
        setInputValue("30");
      }
    } else if (inputValue2 === "2"){
      console.log(inputValue2)

      if (parseInt(inputValue) > 28) {
        setInputValue("28");
      }
    } else {
      if (inputValue.length === 2){
        ValueRef2.current?.focus();    
        setInputValue(inputValue.slice(0,2))
      };

    };

  }, [inputValue,inputValue2]);

  useEffect(() => {
    if (isNaN(parseInt(inputValue2.slice(-1)))){
        setInputValue2(inputValue2.slice(0,-1))
    ;}
    else if (inputValue2 === "00"){
      setInputValue2("01");
    } else if (parseInt(inputValue2) > 12) {
      setInputValue2("12");
    } else {
      if (inputValue2.length === 2){
        ValueRef3.current?.focus();    
        setInputValue2(inputValue2.slice(0,2))
      }
    };

  }, [inputValue2]);
  
  useEffect(() => {
    if (parseInt(inputValue3) > new Date().getFullYear()) {
      if (new Date().getFullYear() !== undefined) {
        setInputValue3(new Date().getFullYear().toString());
      }
    } else {
      if (inputValue3.length === 4){
        ValueRef3.current?.blur();    
        setInputValue3(inputValue3.slice(0,4))
        if(parseInt(inputValue3) < 1901){
          setInputValue3("1900");
        }
      } 
    }

  }, [inputValue3]);
  
  
  useEffect(() => {
    if (isNaN(parseInt(inputValue3.slice(-1)))){
        setInputValue3(inputValue3.slice(0,-1))
    ;}

  }, [inputValue3]);

  const currentYear = new Date().getFullYear();

  const handleDateSelect = (date: Date) => {
    if (date.getFullYear() < 1900 || date.getFullYear() > currentYear) return;
    // console.log(date);
    const formatted = format(date, "dd/MM/yyyy");
    setSelectedDate(date);
    setInputValue(formatted.slice(0,2));
    setInputValue2(formatted.slice(3,5));
    setInputValue3(formatted.slice(6,10));
    setCalendarMonth(date);
    setShowPicker(false);
    onChange(date.toISOString().split("T")[0]); // mantém "YYYY-MM-DD"
  };

  const generateCalendar = () => {
    const start = startOfWeek(startOfMonth(calendarMonth), { weekStartsOn: 0 });
    const end = endOfMonth(calendarMonth);
    const days: Date[] = [];

    let current = start;
    while (current <= end || days.length % 7 !== 0) {
      days.push(current);
      current = addDays(current, 1);
    }

    return days;
  };
  
  useEffect(() => {
    if (inputValue.length === 2 && inputValue2.length === 2 && inputValue3.length === 4) {
      const typedDate = parse(`${inputValue3}-${inputValue2}-${inputValue}`, "yyyy-MM-dd", new Date());
      if (isValid(typedDate)) {
        setCalendarMonth(typedDate);
        setSelectedDate(typedDate);
        onChange(typedDate.toISOString().split("T")[0]);
      }
    }
  }, [inputValue, inputValue2, inputValue3, onChange]);

  return (
    <div className="relative max-w-[480px]">
      <div className="relative ">

        <div className={`${focused || focused2 || focused3 ? "border-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.2)]" : "border-gray-400"}  relative cursor-text py-[14px] px-3 pr-8 h-[54px] gap-1 text-[16px] flex w-full rounded-[15px] border `}>
          <div className="relative text-gray-400 block w-[31px]">
            {!focused && !inputValue && <div className='w-full rounded-[5px] absolute text-center'>dd</div>}
            <input required ref={ValueRef} value={inputValue} onBlur={() => {
              setFocused(false);
              if (inputValue && inputValue.length === 1) {
                setInputValue(inputValue.padStart(2, "0")); // "2" → "02"
              }
              else if(parseInt(inputValue) < 1){
                setInputValue("1");
              };
            }} type="number" onFocus={() => setFocused(true)} onChange={(e) => setInputValue(e.target.value)} className={`${focused  ? "bg-[rgba(255,238,88,0.1)]" : "bg-transparent" } text-center text-white absolute w-full rounded-[5px] border-none outline-none transition-all ease-in-out duration-100 `}/>
          </div>  

          <div className="text-gray-400 ">/</div>

          <div className="relative text-gray-400 block w-[31px]">
            {!focused2 && !inputValue2 && <div className='w-full rounded-[5px] absolute text-center'>mm</div>}

            <input required ref={ValueRef2} onKeyUp={(e) => handleKeyUp(2,e)} value={inputValue2} type="number" onFocus={() => setFocused2(true)} onBlur={() => {
              setFocused2(false);
              if (inputValue2 && inputValue2.length === 1) {
                setInputValue2(inputValue2.padStart(2, "0")); // "2" → "02"
              }
            }} onChange={(e) => setInputValue2(e.target.value)} className={`${focused2  ? "bg-[rgba(255,238,88,0.1)]" : "bg-transparent" } text-center  absolute w-full rounded-[5px] text-white border-none outline-none transition-all ease-in-out duration-100 `}/>
          </div>

          <div className="text-gray-400 ">/</div>

          <div className="relative text-gray-400 block w-[42px]">
            {!focused3 && !inputValue3 && <div className='w-full rounded-[5px] absolute text-center'>aaaa</div>}

            <input required ref={ValueRef3} value={inputValue3} onKeyUp={(e) => handleKeyUp(3,e)} type="number" onFocus={() => setFocused3(true)} onBlur={() => {setFocused3(false); 
              
            }} onChange={(e) => setInputValue3(e.target.value)} className={`${focused3  ? "bg-[rgba(255,238,88,0.1)]" : "bg-transparent" } text-center  absolute w-full rounded-[5px] text-white border-none outline-none transition-all ease-in-out duration-100 `}/>
          </div>

        </div>

        <motion.button
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all ease-in-out duration-100 hover:text-yellow-400 cursor-pointer"
        >
          <CalendarDays size={18} />
        </motion.button>
      </div>
      
      <AnimatePresence>
        {showPicker && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, transition:{ duration: 0.15, ease: "easeInOut"} }}
            id='date-box'
            className="absolute right-0 z-10 mt-2  min-w-[210px] rounded-[25px] border border-gray-400 bg-[rgba(12,12,14,0.985)] p-4 shadow-xl origin-top-right"
          >
            {/* Calendar Header */}
            <div className="mb-3 flex items-center justify-between px-2 text-white">
              <button type='button' onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}>
                <ChevronLeft size={20} className='cursor-pointer'/>
              </button>
              <span className="text-[20px] font-medium">
                {format(calendarMonth, 'MMMM yyyy')}
              </span>
              <button type='button' onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}>
                <ChevronRight size={20} className='cursor-pointer' />
              </button>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-1 text-[20px] px-1 pb-1 text-white">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center ">{day}</div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1  text-sm text-[#ffffffc7]">
              {generateCalendar().map((day, i) => {
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const inCurrentMonth = isSameMonth(day, calendarMonth);
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleDateSelect(day)}
                    className={`rounded-md p-1 cursor-pointer text-center transition text-[18px] ${
                      isSelected
                        ? 'bg-yellow-400 text-black font-medium'
                        : inCurrentMonth
                        ? 'hover:bg-[rgba(255,238,88,0.1)]'
                        : 'text-zinc-500 p-1 cursor-pointer'
                    }`}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


interface DataEditarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
}

export function DataEditar({
  value = "",
  onChange,
  disabled,
  placeholder = "dd / mm / aaaa",
  ...props
}: DataEditarProps) {
  // displayed masked value
  const [inputValue, setInputValue] = useState(value);
  const [isValid, setIsValid] = useState(true);
  const [ message, setMessage ] = useState<string | null>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, ""); // remove non-numeric
    if (raw.length > 8) raw = raw.slice(0, 8);

    // format to dd / mm / yyyy
    let masked = raw
      .replace(/^(\d{2})(\d)/, "$1 / $2")
      .replace(/^(\d{2}) \/ (\d{2})(\d)/, "$1 / $2 / $3");

    setInputValue(masked);

    if (raw.length === 8) {
      const day = parseInt(raw.slice(0, 2));
      const month = parseInt(raw.slice(2, 4));
      const year = parseInt(raw.slice(4, 8));
      const valid = validateDate(day, month, year);
      setIsValid(valid);

      if (valid) {
        const formatted = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        onChange?.(formatted);
      }
    } else {
      // incomplete → no validation, neutral state
      setIsValid(true);
    }
  };

  // validate actual date values
  const validateDate = (day: number, month: number, year: number) => {
    const now = new Date();
    const currentYear = now.getFullYear();

    if (month < 1 || month > 12) return false;
    if (year < 1900 || year > currentYear) return false;

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) return false;

    // optional: disallow future dates
    const inputDate = new Date(year, month - 1, day);
    if (inputDate > now) return false;

    return true;
  };

  // helper to show prefilled yyyy-mm-dd as dd / mm / yyyy
  function formatDisplay(val: string): string {
    if (!val || !/^\d{4}-\d{2}-\d{2}$/.test(val)) return "";
    const [y, m, d] = val.split("-");
    return `${d} / ${m} / ${y}`;
  }

  useEffect(() =>{
    if (!isValid){
      setMessage("Data inválida. Verifique o dia, mês e ano.")
    }
  },[isValid])
  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}

      <motion.div className="w-full max-w-[480px]">
        <input
          inputMode="numeric"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
          className={`w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] 
          }`}
        />
        {!isValid && (

          <p className="text-red-500 text-sm mt-1"></p>
        )}
      </motion.div>
    </>
  );
}