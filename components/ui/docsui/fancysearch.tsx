import searchIMG from '../../../public/images/search.svg';
import Image from 'next/image';
import React from 'react';

interface Props {
    className?: string;
}

export const FancySearch: React.FC<Props> = ({ className }) => {
    return (
        <div className='flex'>
            <input className='rounded-[5px_0_0_5px] p-[10px] bg-[#E7E7E7] text-[#515151] min-w-[400px] text-center' type="text" placeholder='Введите поисковой запрос' />
            <button><Image src={searchIMG} alt='button' className='w-[43px]' /></button>
        </div>
    );
};