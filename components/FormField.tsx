
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormFiledProps<T extends FieldValues>{
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'file';
    showPasswordToggle?: boolean;
}

const FormField = <T extends FieldValues>({control, name ,label, placeholder, type = "text", showPasswordToggle}: FormFiledProps<T>) => {
    const [show, setShow] = useState(false);
    const isPassword = type === 'password';
    return (
        <Controller name={name} control={control} render={({ field }) => (
            <FormItem>
                <FormLabel className='label'>{label}</FormLabel>
                <FormControl>
                    <div className="relative">
                        <Input className="input" type={isPassword && show ? 'text' : type} placeholder={placeholder} {...field} />
                        {isPassword && showPasswordToggle && (
                            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShow(s => !s)} tabIndex={-1}>
                                {show ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        )}
                    </div>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}/>
    );
};

export default FormField
