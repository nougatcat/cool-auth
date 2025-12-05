// тут должен быть GET запрос на вывод всех документов, которые создал этот пользователь 
import { prisma } from "@/prisma/prisma-client"
import { getUserSession } from "@/lib/get-user-session"
import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"

export const dynamic = 'force-dynamic' //! есть баг с асинхронным контекстом на уровне next-js, поэтому билд может не работать в этом месте

export async function GET() {
    try {
        const user = await getUserSession()
        if (!user) {
            return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 })
        }
        const data = await prisma.document.findMany({
            where: {
                authorId: Number(user.id)
            },
        })
        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 })
    }
}

interface DocumentAndId extends Prisma.DocumentUpdateInput {
    id_doc: number
}
export async function PATCH(request: Request) {
    try {
        const user = await getUserSession()
        if (!user) {
            return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 })
        }
        const data = (await request.json()) as DocumentAndId
        const id_user = Number(user.id)
        const document = await prisma.document.findFirst({
            where: {
                id: data.id_doc
            }
        })
        if (!document) {
            return NextResponse.json({ message: 'Документ не найден' }, { status: 404 })
        }
        if (document.authorId === id_user) {
            if ((data.userPerms === 'READ' && data.adminPerms === 'NONE') || (data.userPerms === 'RW' && data.adminPerms === 'READ')) {
                await prisma.document.update({
                    where: {
                        id: data.id_doc
                    },
                    data: {
                        adminPerms: data.userPerms,
                        userPerms: data.userPerms,
                    }
                })
                return NextResponse.json({ message: 'Успешно обновлено' }, { status: 200 })
            } else {
                await prisma.document.update({
                    where: {
                        id: data.id_doc
                    },
                    data: {
                        adminPerms: data.adminPerms,
                        userPerms: data.userPerms,
                    }
                })
                return NextResponse.json({ message: 'Успешно обновлено' }, { status: 200 })
            }
        } else return NextResponse.json({ message: 'Нет доступа к редактированию документа' }, { status: 403 })
    } catch (err) {
        console.log('[UPDATE_PERMS_DOCUMENT] Server error', err);
        return NextResponse.json({ message: 'Не удалось обновить права документа' }, { status: 500 })
    }

}