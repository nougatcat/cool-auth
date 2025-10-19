// import { cn } from '@/lib/utils'
import profileIMG from '../../public/images/profile.svg'
import backIMG from '../../public/images/back.svg'
import saveIMG from '../../public/images/save.svg'
import binIMG from '../../public/images/bin.svg'
import { FancyButton, FancyContainer, FancyEditor, FancySearch, FancyTable } from '@/components/ui/docsui/'

export default function Search() {
    return (
        <FancyContainer>
            <div className="flex justify-between mb-5">
                <FancyButton className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' backwards image={backIMG} text='К поиску' dist='/search' />
                <FancyButton className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' image={profileIMG} text='Профиль' dist='/profile' />
            </div>

            <FancyEditor author='Олег' />

            <div className="flex justify-between mb-5 mt-5">
                <FancyButton className='bg-[#FF5050]' image={binIMG} text='Удалить' dist='/create' />
                <div className='flex'>
                    <div className='rounded-[5px] p-[10px] bg-[#E7E7E7] text-[#515151] min-w-[410px] text-center cursor-pointer'>Настроить права доступа к документу</div>
                </div>
                <FancyButton className='bg-[#BCFFB8]' image={saveIMG} text='Сохранить' dist='/create' />
            </div>

        </FancyContainer>
    )
}
