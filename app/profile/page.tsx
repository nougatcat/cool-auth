// import { cn } from '@/lib/utils'
'use client'
import { Api } from '@/services/api-client'
import createIMG from '../../public/images/create.svg'
import settingsIMG from '../../public/images/settings.svg'
import backIMG from '../../public/images/back.svg'
import { FancyLink, FancyContainer, ProfileTable, FancyButton } from '@/components/ui/docsui/'
import React from 'react'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { createDocument } from '../server-actions'
import { Document } from '@prisma/client'
import { useDebounce } from 'react-use'

export default function ProfilePage() {
    const [query, setQuery] = React.useState<string>('')
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [rows, setRows] = React.useState<Document[] | null>(null);
    useDebounce(
        async () => {
            try {
                let data = {}
                if (query) { data = await Api.myDoc.getMyDocuments(query) }
                else { data = await Api.myDoc.getMyDocuments() }
                setRows(data as any);
            } catch (e) {
                console.log("Ошибка загрузки документа:", e);
                router.push('/')
            }
        }, 250, [query]
    )

    // если setIsLoading добавить в finally из useDebounce, то метод сработает до асинхронного router.push
    React.useEffect(() => {
        if (rows) {
            setIsLoading(false);
        }
    }, [rows]);

    const onCreate = async () => {
        try {
            const documentId = await createDocument()
            const id = documentId.toString()
            toast.success('Документ создан 📝', {
                icon: '✅',
            });
            router.push('/document/' + id)

        } catch (error) {
            console.log('Error [CREATE_DOCUMENT]', error)
            return toast.error('Ошибка при создании документа', {
                icon: '❌',
            });
        }
    };

    if (isLoading) return <Spinner />


    return (
        <FancyContainer>
            <div className="flex justify-between mb-5">
                <FancyLink className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' backwards image={backIMG} text='К поиску' dist='/search' />
                <FancyButton className='bg-[var(--fancygreen)]' image={createIMG} text='Создать' onClick={onCreate} />

                {/* ПОИСК */}
                <div className='flex'>
                    <input
                        className='rounded-[5px] p-[10px] bg-[#E7E7E7] text-[#515151] min-w-[280px] text-center'
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Введите поисковой запрос'
                    />
                </div>

                <FancyLink className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' image={settingsIMG} text='Настройки' dist='/' />
            </div>

            {
                (rows && rows.length > 0)
                    ? (<ProfileTable rows={rows} titles={['Название', 'Кому доступно', 'Права доступа']} />)
                    : (<b>Ничего не найдено</b>)
            }
        </FancyContainer>
    )
}


//// СДЕЛАНО добавить прелоадер и ответ что ничего не найдено
//// СДЕЛАНО добавить редирект на страницу логина если не авторизован
//// неважно TODO поправить ошибки типов (в последнюю очередь)