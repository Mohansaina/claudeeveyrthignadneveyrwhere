import React from 'react';
import { cn } from '../../lib/utils';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors focus:bg-white resize-y font-mono",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});

Textarea.displayName = "Textarea";

export { Textarea };
