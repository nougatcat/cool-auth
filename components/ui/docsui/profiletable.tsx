
import { DocumentApi } from '@/services/all-doc';
import Link from 'next/link';

interface Props {
    className?: string;
    titles: [String, String, String];
    rows: Array<DocumentApi>
}

export const ProfileTable: React.FC<Props> = ({ className, titles, rows, }) => {
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
                        <Link href={'/document/' + item.id}>
                            <div key={index} className={'border-b border-black flex justify-between min-h-[30px] w-[100%] p-[10px_20px_10px_20px] cursor-pointer bg-[#DDFFDB]'}>
                                <div className='w-[60%]'>{item.title}</div>
                                <div className='w-[20%]'>
                                    {
                                        item.adminPerms === 'NONE'
                                            ? 'Только мне'
                                            : item.userPerms === 'NONE'
                                                ? 'Админам'
                                                : 'Всем'
                                    }
                                </div>
                                <div className='w-[20%]'>
                                    {
                                        item.adminPerms === 'NONE' && item.userPerms === 'NONE'
                                            ? 'Только мне'
                                            : item.adminPerms === 'READ' && item.userPerms === 'NONE'
                                                ? 'А: R, П: нет'
                                                : item.adminPerms === 'RW' && item.userPerms === 'NONE'
                                                    ? 'А: RW, П: нет'
                                                    : item.adminPerms === 'READ' && item.userPerms === 'READ'
                                                        ? 'А: R, П: R'
                                                        : item.adminPerms === 'RW' && item.userPerms === 'READ'
                                                            ? 'А: RW, П: R'
                                                            : 'А: RW, П: RW'
                                    }
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
            <div className='bg-[#515151] rounded-[0_0_5px_5px] h-[43px]' />
        </div>
    );
};