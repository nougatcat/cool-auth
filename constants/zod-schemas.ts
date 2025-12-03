//? схемы для zod
import { z } from 'zod'

const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const passwordSchema = z.string().min(8, { message: 'Пароль должен содержать не менее 8 символов' }).refine((val) => passwordValidationRegex.test(val), {
    message: "Пароль должен содержать минимум одну цифру, одну заглавную и одну строчную букву",
})


/**
 * @param email
 * @param password
 */
export const formLoginSchema = z.object({
    email: z.string().email({ message: 'Введите корректную почту' }),
    password: z.string()
})

/**
 * @param name
 * @param email
 * @param password
 * @param confirmPassword
 */
export const formRegisterSchema = z.object({
    name: z.string().min(2, { message: 'Введите свое имя' }),
    email: z.string().email({ message: 'Введите корректную почту' }),
    password: passwordSchema,
    confirmPassword: passwordSchema, // подтверждение пароля (второй ввод)
}).refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают', // если не совпало
    path: ['confirmPassword'] // с чем сравнивать
})

export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>

////////////////////////////////////////////////////////////
//? Часть, связанаая с документами

/**
 * @param title
 * @param content
 */
export const formDocumentSchema = z.object({
    title: z.string(),
    content: z.string()
})
export type TFormDocumentValues = z.infer<typeof formDocumentSchema>

/**
 * @param adminPerms
 * @param userPerms
 */
export const formPermsSchema = z.object({
    adminPerms: z.string(),
    userPerms: z.string()
})
export type TFormPermsValues = z.infer<typeof formPermsSchema>





// refine - уточнить
// infer - вывести