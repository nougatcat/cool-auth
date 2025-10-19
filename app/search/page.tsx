// import { cn } from '@/lib/utils'
import css from './page.module.css'
import createIMG from '../../public/images/create.svg'
import profileIMG from '../../public/images/profile.svg'
import searchIMG from '../../public/images/search.svg'
import { FancyButton } from '@/components/ui/docsui/'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'


interface Props {
    className?: string;
    image: string;
    text: string;
    dist: string;
}

export const FancyButtona: React.FC<Props> = ({ className, image, text, dist }) => {
    return (
        <Link href={dist} className='flex'>
            <div className={cn( 'rounded-[5px_0_0_5px] p-[10px] min-w-[100px] flex', className)}>
                <span>{text}</span>
            </div>
            <Image src={image} alt='button' className='w-[43px]' />
        </Link>
    );
};


export default function Search() {
    return (
        <div className={css.container}>
            <div className="m-5">
                <div className="flex justify-between mb-5">
                    <FancyButton className='bg-[#BCFFB8]' image={createIMG} text='Создать' dist='/create' />
                    <div className='flex'>
                        <input className='rounded-[5px_0_0_5px] p-[10px] bg-[#E7E7E7] text-[#515151] min-w-[400px] text-center' type="text" placeholder='Введите поисковой запрос' />
                        <button><Image src={searchIMG} alt='button' className='w-[43px]' /></button>
                    </div>
                    <FancyButton className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' image={profileIMG} text='Профиль' dist='/profile' />
                </div>
                
                <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]'>
                    <div className={css.row_head}>
                        <div className='w-[60%]'>Название</div>
                        <div className='w-[20%]'>Владелец</div>
                        <div className='w-[20%]'>Права доступа</div>
                    </div>
                    <div className={css.row}>
                        <div className='w-[60%]'>документ очень важный</div>
                        <div className='w-[20%]'>Олег</div>
                        <div className='w-[20%]'>Чтение</div>
                    </div>
                    <div className={css.row + ' ' + css.row_green}>
                        <div className='w-[60%]'>документ очень важный ывывы ы вывывыфвфыв фыв фв фыафы афыа фы афы фы фы вы вфв фыфы вфы вфы</div>
                        <div className='w-[20%]'>Олег олег олег олег олег</div>
                        <div className='w-[20%]'>Чтение/Запись</div>
                    </div>
                    <div className={css.row_foot}></div>
                </div>
            </div>
        </div>
    )
}
