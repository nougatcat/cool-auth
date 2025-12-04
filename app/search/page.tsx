// import { cn } from '@/lib/utils'
'use client'
import { Api } from '@/services/api-client'
import createIMG from '../../public/images/create.svg'
import profileIMG from '../../public/images/profile.svg'
import { FancyLink, FancyButton, FancyContainer, FancySearch, SearchTable } from '@/components/ui/docsui/'
import React from 'react'
import { Spinner } from '@/components/ui/spinner'
import toast from 'react-hot-toast'
import { createDocument } from '../server-actions'
import { useRouter } from 'next/navigation'

export default function Search() {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [rows, setRows] = React.useState<[]>([]);
    const [user, setUser] = React.useState<{ name?: string, id?: number, role?: 'ADMIN' | 'USER' }>({});
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Api.allDoc.getAllDocuments();
                const user = await Api.auth.getMe();
                setRows(data);
                setUser(user);
            } catch (e) {
                console.log("Ошибка загрузки документа:", e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [])

    const router = useRouter();
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
                <FancyButton className='bg-[#BCFFB8]' image={createIMG} text='Создать' onClick={onCreate} />
                <FancySearch />
                <FancyLink className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' image={profileIMG} text='Профиль' dist='/profile' />
            </div>

            <SearchTable rows={rows} user={user} titles={['Название', 'Владелец', 'Права доступа']} />
        </FancyContainer>
    )
}


// TODO добавить прелоадер
// TODO добавить редирект на страницу логина если не авторизован
// TODO добавить переход к документу при нажатии
// TODO поправить ошибки типов (в последнюю очередь)