// import { cn } from '@/lib/utils'
'use client'
import { Api } from '@/services/api-client'
import createIMG from '../../public/images/create.svg'
import profileIMG from '../../public/images/profile.svg'
import { FancyLink, FancyButton, FancyContainer, SearchTable } from '@/components/ui/docsui/'
import React from 'react'
import { Spinner } from '@/components/ui/spinner'
import toast from 'react-hot-toast'
import { createDocument } from '../server-actions'
import { useRouter } from 'next/navigation'
import { DocumentApi } from '@/services/all-doc'
// import Image from 'next/image'
// import searchIMG from '../../public/images/search.svg';
import { useDebounce } from 'react-use';

export default function SearchPage() {

    const [query, setQuery] = React.useState<string>('')
    const router = useRouter()
    // const handleSearch = async () => {
    //     if (!query.trim()) {
    //         return toast.error('Пустой поисковой запрос', {
    //             icon: '❌',
    //         });
    //     }
    //     router.push(`/search?q=${query}`)
    // } //? LEGACY

    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [rows, setRows] = React.useState<DocumentApi[] | null>(null);
    const [user, setUser] = React.useState<{ name: string, id: number, role: 'ADMIN' | 'USER' }>({ name: '', id: -1, role: 'USER' });
    useDebounce(
        async () => {
            try {
                let data = {}
                if (query) { data = await Api.allDoc.getAllDocuments(query) }
                else { data = await Api.allDoc.getAllDocuments() }
                const user = await Api.auth.getMe();
                setRows(data as any); //не понимаю, как иначе решить эту проблему
                setUser(user);
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
                    {/* <button
                        onClick={handleSearch}>
                        <Image src={searchIMG} alt='button' className='w-[43px]' />
                    </button> //? LEGACY нет необходимости в кнопке, т.к. отслеживание query идет по поисковому инпуту */}
                </div>

                <FancyLink className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' image={profileIMG} text='Профиль' dist='/profile' />
            </div>
            {
                (rows && rows.length > 0)
                    ? (<SearchTable rows={rows} user={user} titles={['Название', 'Владелец', 'Права доступа']} />)
                    : (<b>Ничего не найдено</b>)
            }
        </FancyContainer>
    )
}


//// СДЕЛАНО добавить прелоадер и ответ что ничего не найдено
//// СДЕЛАНО добавить редирект на страницу логина если не авторизован
//// неважно TODO поправить ошибки типов (в последнюю очередь)