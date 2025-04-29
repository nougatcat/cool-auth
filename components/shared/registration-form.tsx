'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput } from "./form-template/form-input"
import { Container } from "./container"
import { FormProvider, useForm } from "react-hook-form"
import { formRegisterSchema, TFormRegisterValues } from "@/constants/zod-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerUser } from "@/app/server-actions"
import toast from "react-hot-toast"
import React from "react"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import Link from "next/link"

interface Props {
    className?: string
}

export const RegistrationForm: React.FC<Props> = ({ className }) => {
    const captchaRef = React.useRef(null) //необходимо для работы капчи
    const [captchaFailed, setCaptchaFailed] = React.useState(true)

    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
        }
    })

    const onSubmit = async (user: TFormRegisterValues) => {
        if (captchaFailed) {
            return toast.error('Капча не пройдена', {
                icon: '❌',
            })
        }
        try {
            await registerUser({
                email: user.email,
                name: user.name,
                password: user.password,
            });
            toast.success('Регистрация успешна 📝.', {
                icon: '✅',
            });
        } catch (error) {
            console.log('Error [REGISTER]', error)
            return toast.error('Пользователь с такой почтой уже существует', {
                icon: '❌',
            })
        }
    }

    return (
        <Container>
            <div className={cn("flex flex-col gap-6", className)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Зарегистрироваться</CardTitle>
                        <CardDescription>
                            Введите данные для регистрации
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6">
                                    <FormInput label='Имя' name='name' required type="text" />
                                    <FormInput label='Email' name='email' required type="email" />
                                    <FormInput label='Пароль' name='password' required type="password"
                                        placeholder="Минимум 8 символов" />
                                    <FormInput label='Пароль повторно' name='confirmPassword' required type="password"
                                        placeholder="Минимум  символов" />
                                    <HCaptcha
                                        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
                                        onVerify={() => setCaptchaFailed(false)}
                                        onExpire={() => setCaptchaFailed(true)}
                                        ref={captchaRef}
                                    />
                                    <Button type="submit" className="w-full">Зарегистрироваться</Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Есть аккаунт?{" "}
                                    <Link href="/" className="underline underline-offset-4">Войти</Link>
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}
