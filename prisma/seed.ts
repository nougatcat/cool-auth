// как и зачем -  https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
// seeding нужен для создания тестовых данных для призмы

import { prisma } from "./prisma-client"
import { hashSync } from "bcrypt"

async function up() {
    await prisma.user.createMany({
        data: [
            {
                name: "User Test",
                email: "u@u.com",
                verified: new Date(),
                password: hashSync('111111', 10),
                role: 'USER'
            },
            {
                name: "Admin Test",
                email: "a@a.com",
                verified: new Date(),
                password: hashSync('111111', 10),
                role: 'ADMIN'
            },
        ]
    });
    await prisma.document.createMany({
        data: [
            {
                authorId: 2,
                content: 'Блаблаблаблаблаблаблаблаблаблаблабла ьалаб лаба ла лааб ал аб а',
                title: 'Мой документ RW',
                adminPerms: 'RW',
                userPerms: 'READ',
            },
            {
                authorId: 2,
                content: 'aaa aa aa aa Блаблаблаблаблаблаблаблаблаблаблабла ьалаб лаба ла лааб ал аб а',
                title: 'Мой документ R',
                adminPerms: 'READ',
                userPerms: 'READ',
            },
        ]
    });
    await prisma.docHistory.createMany({
        data: [
            {
                documentId: 1,
                editorId: 2,
            },
            {
                documentId: 1,
                editorId: 1,
            },
            {
                documentId: 2,
                editorId: 2,
            },
        ]
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Document" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "DocHistory" RESTART IDENTITY CASCADE`
    // TRUNCATE TABLE Удаляет все строки из таблицы, но структура таблицы и ее столбцы, ограничения, индексы и т. д. остаются. 
    // RESTART IDENTITY значит очищаем сам id, т.е. другой юзер сможет получить этот id
    // удалить все данные пользователя и удалить данные в других таблицах связанные с ним (CASCADE) 
}

async function main() {
    try {
        await down()
        await up()
    } catch (e) {
        console.error(e)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
        process.exit(0); //! без этой строки сид может зависнуть
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })