import { cn } from '@/lib/utils'
import Image from 'next/image'


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    image: string;
    text: string;
    backwards?: boolean;
}

export const FancyButton: React.FC<Props> = ({ className, image, text, backwards, ...props }) => {
    return (
        !backwards
            ?
            <button className='flex' {...props}>
                <div className={cn('rounded-[5px_0_0_5px] p-[10px] min-w-[100px] flex', className)}>
                    <span>{text}</span>
                </div>
                <Image src={image} alt='button' className='w-[43px]' />
            </button>
            :
            <button className='flex' {...props}>
                <Image src={image} alt='button' className='w-[43px]' />
                <div className={cn('rounded-[0_5px_5px_0] p-[10px] min-w-[100px] flex', className)}>
                    <span>{text}</span>
                </div>
            </button>
    );
};