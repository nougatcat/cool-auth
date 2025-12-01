// тут должен быть GET запрос на вывод всех доступных документов
import { prisma } from "@/prisma/prisma-client"
import { getUserSession } from "@/lib/get-user-session"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic' //! есть баг с асинхронным контекстом на уровне next-js, поэтому билд может не работать в этом месте

export async function GET() {
    try {
        const user = await getUserSession()
        if (!user) {
            return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 })
        }
        let data = {}
        if (user.role === 'ADMIN') {
            data = await prisma.document.findMany({
                where: {
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
            data = await prisma.document.findMany({
                where: {
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

// TODO title и content документа лучше шифровать, чтобы при сливе бд нельзя было слить документы. Делать это нужно в post и patch запросах. На данном этапе разработки необязательно