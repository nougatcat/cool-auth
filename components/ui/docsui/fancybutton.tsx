import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'


interface Props {
    className?: string;
    image: string;
    text: string;
    dist: string;
}

export const FancyButton: React.FC<Props> = ({ className, image, text, dist }) => {
    return (
        <Link href={dist} className='flex'>
            <div className={cn( 'rounded-[5px_0_0_5px] p-[10px] min-w-[100px] flex', className)}>
                <span>{text}</span>
            </div>
            <Image src={image} alt='button' className='w-[43px]' />
        </Link>
    );
};