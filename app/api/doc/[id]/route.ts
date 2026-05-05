// Тут должен быть DELETE запрос и PATCH запрос, если я не пропишу его в сервер экшен

// тут должен быть GET запрос на вывод всех доступных документов
import { prisma } from "@/prisma/prisma-client"
import { getUserSession } from "@/lib/get-user-session"
import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"

export const dynamic = 'force-dynamic' //! есть баг с асинхронным контекстом на уровне next-js, поэтому билд может не работать в этом месте

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) { //! Начиная с версии next js 15 нужно оборачивать тип в промис и прописывать request: Request
    try {
        const { id } = await params //!буквально фикс который предлагает next js при переходе на 15 версию, на 14 было не нужно. В api нужно еще request: Request писать, в page компонентах не нужно
        const id_number = Number(id)
        const user = await getUserSession()
        if (!user) {
            return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 })
        }
        let data = null
        if (user.role === 'ADMIN') {
            data = await prisma.document.findFirst({
                where: {
                    id: id_number,
                    OR: [
                        {
                            adminPerms: {
                                in: ["READ", "RW"]
                            }
                        },
                        {
                            adminPerms: "NONE",
                            authorId: Number(user.id)
                        }
                    ]
                },
                include: {
                    author: {
                        select: {
                            name: true
                        }
                    }
                }
            })
        } else if (user.role = 'USER') {
            data = await prisma.document.findFirst({
                where: {
                    id: id_number,
                    OR: [
                        {
                            userPerms: {
                                in: ["READ", "RW"]
                            }
                        },
                        {
                            userPerms: "NONE",
                            authorId: Number(user.id)
                        }
                    ]
                },
                include: {
                    author: {
                        select: {
                            name: true
                        }
                    }
                }
            })
        }
        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 })
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const id_doc = Number(id)
        const user = await getUserSession()
        if (!user) {
            return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 })
        }
        const id_user = Number(user.id)
        const data = (await request.json()) as Prisma.DocumentUpdateInput
        const document = await prisma.document.findFirst({
            where: {
                id: id_doc
            }
        })
        if (!document) {
            return NextResponse.json({ message: 'Документ не найден' }, { status: 404 })
        }
        if ((document.adminPerms === 'RW' && user.role === 'ADMIN') || (document.userPerms === 'RW') || (document.authorId === id_user)) {
            await prisma.document.update({
                where: {
                    id: id_doc
                },
                data: {
                    title: data.title,
                    content: data.content,
                }
            })
            return NextResponse.json({ message: 'Успешно обновлено' }, { status: 200 })
        } else return NextResponse.json({ message: 'Нет доступа к редактированию документа' }, { status: 403 })
    } catch (err) {
        console.log('[UPDATE_DOCUMENT] Server error', err);
        return NextResponse.json({ message: 'Не удалось обновить документ' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const id_doc = Number(id)
        const user = await getUserSession()
        if (!user) {
            return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 })
        }
        const id_user = Number(user.id)
        const document = await prisma.document.findFirst({
            where: {
                id: id_doc
            }
        })
        if (!document) {
            return NextResponse.json({ message: 'Документ не найден' }, { status: 404 })
        }
        if ((document.adminPerms === 'RW' && user.role === 'ADMIN') || (document.userPerms === 'RW') || (document.authorId === id_user)) {
            await prisma.docHistory.deleteMany({
                where: {
                    documentId: id_doc,
                }
            })
            await prisma.document.delete({
                where: {
                    id: id_doc
                },
            })
            return NextResponse.json({ message: 'Успешно удалено' }, { status: 200 })
        } else return NextResponse.json({ message: 'Нет доступа к редактированию документа' }, { status: 403 })
    } catch (err) {
        console.log('[DELETE_DOCUMENT] Server error', err);
        return NextResponse.json({ message: 'Не удалось удалить документ' }, { status: 500 })
    }
}











////неважно TODO title и content документа лучше шифровать, чтобы при сливе бд нельзя было слить документы. Делать это нужно в post и patch запросах. На данном этапе разработки необязательно