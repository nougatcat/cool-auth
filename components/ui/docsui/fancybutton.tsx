import { cn } from '@/lib/utils'
import Image from 'next/image'


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    image: string;
    text: string;
}

// TODO вместо Link должно быть другое действие, иначе кнопка бесполезна для отправки запросов на сервер

export const FancyButton: React.FC<Props> = ({ className, image, text, ...props }) => {
    return (
        <button className='flex' {...props}>
            <div className={cn('rounded-[5px_0_0_5px] p-[10px] min-w-[100px] flex', className)}>
                <span>{text}</span>
            </div>
            <Image src={image} alt='button' className='w-[43px]' />
        </button>
    );
};