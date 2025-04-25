'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { FormInput } from "./form-template/form-input"

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import { useSession, signIn } from 'next-auth/react'
import { Container } from "./container"
import { formLoginSchema, TFormLoginValues } from "@/constants/zod-schemas"
import toast from "react-hot-toast"

interface Props {
    className?: string
}

export const LoginForm: React.FC<Props> = ({className}) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false, //! редиректить или не редиректить на главную после успешного входа. Т.к. мы и так на главной, то вроде необязательно
            })
            if (!resp?.ok) {
                throw Error() //вызывает catch
            }
            toast.success('Вы успешно вошли в аккаунт', {
                icon: '✅',
            })
        } catch (error) {
            console.error('Error [LOGIN}',error)
            toast.error('Не удалось войти в аккаунт', {
                icon: '❌',
            })
        }
    }
    return (
        <Container>
            <div className={cn("flex flex-col gap-6", className)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Войти</CardTitle>
                        <CardDescription>
                            Введите ваши Email и пароль
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6">
                                    <FormInput label='Email' name='email' required type="email" />
                                    <FormInput label='Пароль' name='password' required type="password" />
                                    <div className="flex items-center">
                                        <a href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"> <s>Забыли пароль?</s> </a>
                                        {/* // TODO: Добавить сброс пароля */}
                                    </div>
                                    <Button type="submit" loading={form.formState.isSubmitting} className="w-full">
                                        Войти
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Нет аккаунта?{" "}
                                    <a href="/signup" className="underline underline-offset-4">Создать аккаунт</a>
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}
