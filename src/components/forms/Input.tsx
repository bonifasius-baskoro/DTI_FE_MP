interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
  }
  
  export const Input = ({ label, error, ...props }: InputProps) => (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input 
        {...props} 
        className="w-full rounded-md border p-2 focus:ring-2"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
