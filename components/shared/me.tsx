'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Container } from "./container"

import { signOut } from 'next-auth/react';
import { User } from "@prisma/client"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formRegisterSchema, TFormRegisterValues } from "@/constants/zod-schemas"
import toast from "react-hot-toast"
import { FormInput } from "./form-template/form-input"
import { updateUserInfo } from "@/app/server-actions"
import Link from "next/link"
import { ThemeToggle } from "./themetoggler"

interface Props {
    className?: string
    user: User
}

export const Me: React.FC<Props> = ({ user, className }) => {
    const onClickSignOut = () => {
        signOut({
            callbackUrl: '/'
        })
    }
    const form = useForm({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            password: '',
            confirmPassword: '',
        }
    })
    const onSubmit = async (user: TFormRegisterValues) => {
        try {
            await updateUserInfo({
                email: user.email,
                name: user.name,
                password: user.password,
            });

            toast.error('Данные обновлены 📝', {
                icon: '✅',
            });
        } catch (error) {
            console.log('Error [ME]', error)
            return toast.error('Ошибка при обновлении данных', {
                icon: '❌',
            });
        }
    };
    return (
        <Container>
            <div className={cn("flex flex-col gap-6", className)}>
                <ThemeToggle/>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Вход успешен!</CardTitle>
                        <CardDescription>
                            {user.name}, добро пожаловать!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6">
                                    <FormInput name="name" label="Имя" required />
                                    <FormInput name="email" label="EMail" required />

                                    <FormInput type="password" name="password" label="Новый пароль" required />
                                    <FormInput type="password" name="confirmPassword" label="Повторите новый пароль" required />

                                    <Button type="submit" loading={form.formState.isSubmitting} className="w-full">
                                        Обновить данные
                                    </Button>
                                    <Button
                                        onClick={onClickSignOut}
                                        type="button"
                                        variant="secondary"
                                        className="w-full">
                                        Выйти
                                    </Button>
                                    <Link href={'/search'}>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            className="w-full bg-[var(--fancygreen)]">
                                            Перейти к документам
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}
