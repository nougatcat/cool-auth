// import { cn } from '@/lib/utils'
'use client'
import profileIMG from '../../../public/images/profile.svg'
import backIMG from '../../../public/images/back.svg'
import saveIMG from '../../../public/images/save.svg'
import binIMG from '../../../public/images/bin.svg'
import { FancyLink, FancyContainer, FancyButton } from '@/components/ui/docsui/'
import { notFound } from "next/navigation"
import { Api } from '@/services/api-client'
import React from 'react'
import { Spinner } from '@/components/ui/spinner'
import { DocumentApi } from '@/services/all-doc'

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formDocumentSchema, TFormDocumentValues } from "@/constants/zod-schemas"
import toast from "react-hot-toast"
import { deleteDocument, updateDocument } from '@/services/id_doc'
import { useRouter } from 'next/navigation'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function DocumentPage({ params }: { params: { id: string } }) {

    const router = useRouter();

    //Получение id документа из url
    const { id } = React.use(params)
    const id_doc = Number(id)
    if (isNaN(id_doc)) return notFound()


    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    //Работа с формой. //!Если не вынести в начало, то хук будет вызываться не всегда и это приведет к ошибке реакта Rendered more hooks than during the previous render
    const form = useForm({
        resolver: zodResolver(formDocumentSchema),
        defaultValues: {
            content: 'Загрузка',
            title: 'Загрузка'
        }
    })

    // Подгрузка документа
    const [doc, setDoc] = React.useState<DocumentApi | null>(null);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Api.idDoc.getDocByIdFromUrl(id_doc)
                setDoc(data);
                // Обновляем defaultValues формы после загрузки данных
                form.reset({
                    content: data.content,
                    title: data.title
                })
            } catch (e) {
                console.log("Ошибка загрузки документа:", e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [])
    if (isLoading) return <Spinner />
    if (doc === null) return notFound()


    const onSubmit = async (doc: TFormDocumentValues) => {
        try {
            await updateDocument(id_doc, doc.title, doc.content)

            toast.success('Данные обновлены 📝', {
                icon: '✅',
            });
        } catch (error) {
            console.log('Error [UPDATE_DOCUMENT]', error)
            return toast.error('Ошибка при обновлении данных или у вас нет прав на запись', {
                icon: '❌',
            });
        }
    };
    const onDelete = async () => {
        try {
            await deleteDocument(id_doc)
            toast.success('Данные удалены 📝', {
                icon: '✅',
            });
            router.push('/search')

        } catch (error) {
            console.log('Error [DELETE_DOCUMENT]', error)
            return toast.error('Ошибка при удалении данных или у вас нет прав на запись', {
                icon: '❌',
            });
        }
    };


    return (
        <FancyContainer>
            <div className="flex justify-between mb-5">
                <FancyLink className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' backwards image={backIMG} text='К поиску' dist='/search' />
                <FancyLink className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' image={profileIMG} text='Профиль' dist='/profile' />
            </div>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Окно редактора */}
                    {/* <FancyEditor author={doc.author.name} content={doc.content} title={doc.title} /> логика перенесена напрямую сюда без прослойки в виде компоненты */}
                    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]'>
                        <div className='bg-[#515151] text-[#E7E7E7] rounded-[5px_5px_0_0] font-semibold flex justify-between min-h-[30px] w-[100%] p-[10px_20px_10px_20px]'>
                            <div className='w-[60%]'>
                                <input className='bg-[#515151] text-[#E7E7E7] h-[20px]' {...form.register("title")}></input>
                            </div>
                            <div className='w-[20%]'>Автор:</div>
                            <div className='w-[20%]'>{doc.author.name}</div>
                        </div>
                        <textarea className='w-full p-[20px]' {...form.register("content")}></textarea>
                        <div className='bg-[#515151] rounded-[0_0_5px_5px] h-[43px]' />
                    </div>
                    {/* /Окно редактора */}


                    <div className="flex justify-between mb-5 mt-5">
                        <FancyButton
                            className='bg-[#FF5050]'
                            image={binIMG}
                            text='Удалить'
                            onClick={onDelete}
                            type="button" //если не указать, то при нажатии этой кнопки сработает и другая
                        />

                        <Dialog>
                            {/* asChild исправляет ошибку гидрации кнопки */}
                            <DialogTrigger asChild>
                                <button type="button" className='rounded-[5px] p-[10px] bg-[#E7E7E7] text-[#515151] min-w-[410px] text-center cursor-pointer'>История редактирования и права доступа</button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className='text-center'>Права доступа к документу</DialogTitle>
                                    <DialogDescription>
                                        1. Права доступа может менять только владелец документа
                                        <br />
                                        2. Права пользователя не могут быть больше прав админа
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <FancyButton
                                            backwards
                                            image={backIMG}
                                            text='Назад'
                                            type="button"
                                        />
                                    </DialogClose>
                                    <FancyButton
                                        className='bg-[#BCFFB8]'
                                        image={saveIMG}
                                        text='Сохранить'
                                        type="submit"
                                    />
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <FancyButton
                            className='bg-[#BCFFB8]'
                            image={saveIMG}
                            text='Сохранить'
                            type="submit"
                        />
                    </div>
                </form>
            </FormProvider>

        </FancyContainer>
    )
}
