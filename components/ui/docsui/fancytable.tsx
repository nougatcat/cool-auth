import { cn } from '@/lib/utils'

interface Props { 
    className?: string;
    greenRow: 'bg-[#DDFFDB]' | '';
    titles: [String, String, String];
}
// TODO сделать нормальный компонент, а не тестовую заглушку
export const FancyTable: React.FC<Props> = ({ className, titles, greenRow }) => {
    return (
        <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]'>
            <div className='bg-[#515151] text-[#E7E7E7] rounded-[5px_5px_0_0] font-semibold flex justify-between min-h-[30px] w-[100%] p-[10px_20px_10px_20px]'>
                <div className='w-[60%]'>{titles[0]}</div>
                <div className='w-[20%]'>{titles[1]}</div>
                <div className='w-[20%]'>{titles[2]}</div>
            </div>
            <div className={cn('border-b border-black flex justify-between min-h-[30px] w-[100%] p-[10px_20px_10px_20px] cursor-pointer')}>
                <div className='w-[60%]'>документ очень важный</div>
                <div className='w-[20%]'>Олег</div>
                <div className='w-[20%]'>Чтение</div>
            </div>
            <div className={cn('border-b border-black flex justify-between min-h-[30px] w-[100%] p-[10px_20px_10px_20px] cursor-pointer', greenRow)}>
                <div className='w-[60%]'>документ очень важный ывывы ы вывывыфвфыв фыв фв фыафы афыа фы афы фы фы вы вфв фыфы вфы вфы</div>
                <div className='w-[20%]'>Олег олег олег олег олег</div>
                <div className='w-[20%]'>Чтение/Запись</div>
            </div>
            <div className='bg-[#515151] rounded-[0_0_5px_5px] h-[43px]' />
        </div>
    );
};