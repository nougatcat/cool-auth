import React from 'react';


export const FancyContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className='m-auto min-w-[800px] max-w-[1200px] '>
            <div className="m-5">
                {children}
            </div>
        </div>
    );
};