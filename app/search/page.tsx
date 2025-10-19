// import { cn } from '@/lib/utils'
import createIMG from '../../public/images/create.svg'
import profileIMG from '../../public/images/profile.svg'
import { FancyButton, FancyContainer, FancySearch, FancyTable } from '@/components/ui/docsui/'

export default function Search() {
    return (
        <FancyContainer>
            <div className="flex justify-between mb-5">
                <FancyButton className='bg-[#BCFFB8]' image={createIMG} text='Создать' dist='/create' />
                <FancySearch />
                <FancyButton className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' image={profileIMG} text='Профиль' dist='/profile' />
            </div>

            <FancyTable greenRow='bg-[#DDFFDB]' titles={['Название', 'Владелец', 'Права доступа']} />
        </FancyContainer>
    )
}
