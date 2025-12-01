import React from 'react';

interface Props {
    className?: string;
    author: string;
    title: string;
    content: string;
}

export const FancyEditor: React.FC<Props> = ({ className, author, title, content }) => {
    return (
        <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]'>
            <div className='bg-[#515151] text-[#E7E7E7] rounded-[5px_5px_0_0] font-semibold flex justify-between min-h-[30px] w-[100%] p-[10px_20px_10px_20px]'>
                <div className='w-[60%]'><input className='bg-[#515151] text-[#E7E7E7] h-[20px]' placeholder={title} name="" id=""></input></div>
                <div className='w-[20%]'>Автор:</div>
                <div className='w-[20%]'>{author}</div>
            </div>
            <textarea name="" id="" className='w-full p-[20px]' placeholder='контент должен подгружаться также как в поле обновления данных аккаунта'></textarea>
            <div className='bg-[#515151] rounded-[0_0_5px_5px] h-[43px]' />
        </div>
    );
};

//TODO переделать это в форму