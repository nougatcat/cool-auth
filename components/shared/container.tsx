import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string;
}

/**
 * Оберточная компонента, которая делает центрирование и задает макс ширину
 */
export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    return (
        <div className={cn("flex min-h-svh w-full items-center justify-center p-6 md:p-10", className)}>
            <div className="w-full max-w-sm">
                {children}
            </div>
        </div>
    )
};

