// import { cn } from '@/lib/utils'
'use client'
import { Api } from '@/services/api-client'
import createIMG from '../../public/images/create.svg'
import settingsIMG from '../../public/images/settings.svg'
import backIMG from '../../public/images/back.svg'
import { FancyButton, FancyContainer, FancySearch, ProfileTable } from '@/components/ui/docsui/'
import React from 'react'
import { Spinner } from '@/components/ui/spinner'

export default function Search() {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [rows, setRows] = React.useState<[]>([]);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Api.myDoc.getMyDocuments();
                setRows(data);
            } catch (e) {
                console.log("Ошибка загрузки документа:", e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [])

    if (isLoading) return <Spinner />

    return (
        <FancyContainer>
            <div className="flex justify-between mb-5">
                <FancyButton className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' backwards image={backIMG} text='К поиску' dist='/search' />
                <FancyButton className='bg-[#BCFFB8]' image={createIMG} text='Создать' dist='/create' />
                <FancySearch />
                <FancyButton className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' image={settingsIMG} text='Настройки' dist='/' />
            </div>

            <ProfileTable rows={rows} titles={['Название', 'Кому доступно', 'Права доступа']} />
        </FancyContainer>
    )
}


// TODO добавить прелоадер
// TODO добавить редирект на страницу логина если не авторизован
// TODO добавить переход к документу при нажатии
// TODO поправить ошибки типов (в последнюю очередь)