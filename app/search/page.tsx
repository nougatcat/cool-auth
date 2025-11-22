// import { cn } from '@/lib/utils'
'use client'
import { Api } from '@/services/api-client'
import createIMG from '../../public/images/create.svg'
import profileIMG from '../../public/images/profile.svg'
import { FancyButton, FancyContainer, FancySearch, FancyTable } from '@/components/ui/docsui/'
import React from 'react'

export default function Search() {
    const [rows, setRows] = React.useState<[]>([]);
    const [user, setUser] = React.useState<{name?: string, id?: number, role?: 'ADMIN' | 'USER'}>({});
    React.useEffect(() => {
        const fetchData = async () => {
            const data = await Api.allDoc.getAllDocuments();
            const user = await Api.auth.getMe();
            setRows(data);
            setUser(user);
        };
        fetchData();
    }, [])
    // console.log(rows)
    // console.log(user)

    return (
        <FancyContainer>
            <div className="flex justify-between mb-5">
                <FancyButton className='bg-[#BCFFB8]' image={createIMG} text='Создать' dist='/create' />
                <FancySearch />
                <FancyButton className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' image={profileIMG} text='Профиль' dist='/profile' />
            </div>

            <FancyTable rows={rows} user={user} titles={['Название', 'Владелец', 'Права доступа']} />
        </FancyContainer>
    )
}


// TODO добавить прелоадер
// TODO добавить редирект на страницу логина если не авторизован
// TODO добавить переход к документу при нажатии
// TODO поправить ошибки типов (в последнюю очередь)