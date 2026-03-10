import React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button";

    // Base styles
    const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none ring-offset-white";

    // Variants
    const variants = {
        default: "bg-purple-600 text-white hover:bg-purple-700 shadow-sm",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        outline: "border border-slate-200 hover:bg-slate-100 hover:text-slate-900",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "hover:bg-slate-100 hover:text-slate-900 text-slate-600",
        link: "underline-offset-4 hover:underline text-purple-600",
        gradient: "bg-gradient-to-r from-purple-600 to-blue-600 focus:ring-offset-2 focus:ring-purple-500 shadow-sm text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-md",
    };

    // Sizes
    const sizes = {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
    };

    const selectedVariant = variants[variant] || variants.default;
    const selectedSize = sizes[size] || sizes.default;

    return (
        <Comp
            className={cn(baseStyles, selectedVariant, selectedSize, className)}
            ref={ref}
            {...props}
        />
    );
});

Button.displayName = "Button";

export { Button };
