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
import { redirect } from "next/navigation";
import { User } from "@prisma/client"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formRegisterSchema, TFormRegisterValues } from "@/constants/zod-schemas"
import toast from "react-hot-toast"
import { FormInput } from "./form-template/form-input"
import { updateUserInfo } from "@/app/server-actions"

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
            return toast.error('Ошибка при обновлении данных', {
                icon: '❌',
            });
        }
    };
    return (
        <Container>
            <div className={cn("flex flex-col gap-6", className)}>
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

                                    <Button disabled={form.formState.isSubmitting} type="submit">
                                        Обновить данные
                                    </Button>
                                    <Button
                                        onClick={onClickSignOut}
                                        type="button"
                                        variant="secondary"
                                        className="w-full">
                                        Выйти
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}
