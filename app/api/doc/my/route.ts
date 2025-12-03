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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const id_doc = Number(id)
        const user = await getUserSession()
        if (!user) {
            return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 })
        }
        const data = (await request.json()) as Prisma.DocumentUpdateInput
        const id_user = Number(user.id)
        const document = await prisma.document.findFirst({
            where: {
                id: id_doc
            }
        })
        if (!document) {
            return NextResponse.json({ message: 'Документ не найден' }, {status: 404})
        }
        if (document.authorId === id_user) {
            await prisma.document.update({
                where: {
                    id: id_doc
                },
                data: {
                    adminPerms: data.adminPerms,
                    userPerms: data.userPerms,
                }
            })
            return NextResponse.json({ message: 'Успешно обновлено' }, { status: 200 })
        } else return NextResponse.json({ message: 'Нет доступа к редактированию документа' }, { status: 403 })
    } catch (err) {
        console.log('[UPDATE_PERMS_DOCUMENT] Server error', err);
        return NextResponse.json({ message: 'Не удалось обновить права документа' }, { status: 500 })
    }

}