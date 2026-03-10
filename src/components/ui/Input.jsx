import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors bg-slate-50 focus:bg-white",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = "Input";

export { Input };
