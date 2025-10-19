import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'


interface Props {
    className?: string;
    image: string;
    text: string;
    dist: string;
    backwards?: boolean;
}

// TODO вместо Link должно быть другое действие, иначе кнопка бесполезна для отправки запросов на сервер

export const FancyButton: React.FC<Props> = ({ className, image, text, dist, backwards }) => {
    return (
        !backwards 
            ?
            <Link href={dist} className='flex'>
                <div className={cn('rounded-[5px_0_0_5px] p-[10px] min-w-[100px] flex', className)}>
                    <span>{text}</span>
                </div>
                <Image src={image} alt='button' className='w-[43px]' />
            </Link>
            :
            <Link href={dist} className='flex'>
                <Image src={image} alt='button' className='w-[43px]' />
                <div className={cn('rounded-[0_5px_5px_0] p-[10px] min-w-[100px] flex', className)}>
                    <span>{text}</span>
                </div>
            </Link>
    );
};