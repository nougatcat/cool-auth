// import { cn } from '@/lib/utils'
'use client'
import profileIMG from '../../../public/images/profile.svg'
import backIMG from '../../../public/images/back.svg'
import saveIMG from '../../../public/images/save.svg'
import binIMG from '../../../public/images/bin.svg'
import { FancyButton, FancyContainer, FancyEditor } from '@/components/ui/docsui/'
import { notFound } from "next/navigation"
import { Api } from '@/services/api-client'
import React from 'react'
import { Spinner } from '@/components/ui/spinner'
import { DocumentApi } from '@/services/all-doc'

export default function DocumentPage({ params }) {
    const { id } = React.use(params)
    
    const id_number = Number(id)
    if (isNaN(id_number)) {
        return notFound()
    }

    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [doc, setDoc] = React.useState<DocumentApi>([]);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Api.idDoc.getDocByIdFromUrl(id_number)
                setDoc(data);
            } catch(e) {
                console.log("Ошибка загрузки документа:", e);
            } finally {
                setIsLoading(false);
            }

        };
        fetchData();
    }, [])


    if (isLoading) return <Spinner  />

    if (doc === null) return notFound()


    return (
            <FancyContainer>
                <div className="flex justify-between mb-5">
                    <FancyButton className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' backwards image={backIMG} text='К поиску' dist='/search' />
                    <FancyButton className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' image={profileIMG} text='Профиль' dist='/profile' />
                </div>
                <FancyEditor author={doc.author.name} content={doc.content} title={doc.title} />
                <div className="flex justify-between mb-5 mt-5">
                    <FancyButton className='bg-[#FF5050]' image={binIMG} text='Удалить' dist='/create' />
                    <div className='flex'>
                        <div className='rounded-[5px] p-[10px] bg-[#E7E7E7] text-[#515151] min-w-[410px] text-center cursor-pointer'>Посмотреть историю редактирования</div>
                    </div>
                    <FancyButton className='bg-[#BCFFB8]' image={saveIMG} text='Сохранить' dist='/create' />
                </div>
            </FancyContainer>
    )
}
