import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  required?: boolean;
}

export function InputWithLabel({
  label,
  type,
  id,
  placeholder = "",
  required = false,
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-md items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input 
        type={type} 
        id={id} 
        name={id}
        placeholder={placeholder} 
        required={required} 
      />
    </div>
  );
}
