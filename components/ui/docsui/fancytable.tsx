
import { cn } from '@/lib/utils'
import { DocumentApi } from '@/services/all-doc';
import { Document } from '@prisma/client';

interface Props {
    className?: string;
    titles: [String, String, String];
    rows: Array<DocumentApi>
    user: {name: string, id: number, role: 'ADMIN' | 'USER'}
    users: {name: string, id: number}
}

export const FancyTable: React.FC<Props> = ({ className, titles, rows, user}) => {
    const greenRow = 'bg-[#DDFFDB]' //стилизовка строки
    return (
        <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]'>
            <div className='bg-[#515151] text-[#E7E7E7] rounded-[5px_5px_0_0] font-semibold flex justify-between min-h-[30px] w-[100%] p-[10px_20px_10px_20px]'>
                <div className='w-[60%]'>{titles[0]}</div>
                <div className='w-[20%]'>{titles[1]}</div>
                <div className='w-[20%]'>{titles[2]}</div>
            </div>
            {
                rows.map((item: DocumentApi, index: number) => {
                    return (
                        <div key={index} className={cn('border-b border-black flex justify-between min-h-[30px] w-[100%] p-[10px_20px_10px_20px] cursor-pointer', greenRow)}>
                            <div className='w-[60%]'>{item.title}</div>
                            <div className='w-[20%]'>{item.author.name}</div>
                            <div className='w-[20%]'>
                                {
                                    user.id === item.authorId
                                        ? <p className='text-green-600'>RW Автор</p>
                                        : user.role === 'ADMIN'
                                            ? item.adminPerms
                                            : item.userPerms
                                }
                                </div>
                        </div>
                    )
                })
            }

            {/* <div className={cn('border-b border-black flex justify-between min-h-[30px] w-[100%] p-[10px_20px_10px_20px] cursor-pointer')}>
                <div className='w-[60%]'>документ очень важный</div>
                <div className='w-[20%]'>Олег</div>
                <div className='w-[20%]'>Чтение</div>
            </div>
            <div className={cn('border-b border-black flex justify-between min-h-[30px] w-[100%] p-[10px_20px_10px_20px] cursor-pointer', greenRow)}>
                <div className='w-[60%]'>документ очень важный ывывы ы вывывыфвфыв фыв фв фыафы афыа фы афы фы фы вы вфв фыфы вфы вфы</div>
                <div className='w-[20%]'>Олег олег олег олег олег</div>
                <div className='w-[20%]'>Чтение/Запись</div>
            </div> */}


            <div className='bg-[#515151] rounded-[0_0_5px_5px] h-[43px]' />
        </div>
    );
};