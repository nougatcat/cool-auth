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
import { redirect } from "next/navigation"
import React from "react"
import HCaptcha from "@hcaptcha/react-hcaptcha"

interface Props {
    className?: string
}

export const RegistrationForm: React.FC<Props> = ({ className }) => {
    const captchaRef = React.useRef(null) //необходимо для работы капчи
    const [buttonDisabled, setbuttonDisabled] = React.useState(true)

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
        try {
            await registerUser({
                email: user.email,
                name: user.name,
                password: user.password,
            });

            toast.success('Регистрация успешна 📝. Вам отправлено письмо для подтверждения аккаунта', {
                icon: '✅',
            });
            redirect('/') //чтобы перезагрузить страницу и показало окно что вход успешен
        } catch (error) {
            console.log('Error [REGISTER]', error)
            return toast.error('Пользователь с такой почтой уже существует', {
                icon: '❌',
            });
        }
        // finally {
        //     redirect('/') //чтобы перезагрузить страницу и показало окно что вход успешен
        // } // TODO вместо этого сюда можно вставить перекидывание на страницу с вводом кода из почты вручную, логику для которой нужно написать
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
                                        onVerify={() => setbuttonDisabled(false)}
                                        ref={captchaRef}
                                    />
                                    <Button disabled={buttonDisabled} type="submit" className="w-full">Зарегистрироваться</Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Есть аккаунт?{" "}
                                    <a href="/" className="underline underline-offset-4">Войти</a>
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}
