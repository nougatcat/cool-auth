'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput } from "./form-template/form-input"

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import { signIn } from 'next-auth/react'
import { Container } from "./container"
import { formLoginSchema, TFormLoginValues } from "@/constants/zod-schemas"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"

import HCaptcha from '@hcaptcha/react-hcaptcha'
import React from "react"
import Link from "next/link"

interface Props {
    className?: string
}

export const LoginForm: React.FC<Props> = ({ className }) => {

    const captchaRef = React.useRef(null) //необходимо для работы капчи
    const [captchaFailed, setCaptchaFailed] = React.useState(true)

    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const onSubmit = async (data: TFormLoginValues) => {
        if (captchaFailed) {
            return toast.error('Капча не пройдена', {
                icon: '❌',
            })
        }
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false, // редиректить или не редиректить на главную после успешного входа. В случае не успешного перекидывает на дефолтную форму некст аут
            })
            if (!resp?.ok) {
                throw Error() //вызывает catch
            }
            toast.success('Вы успешно вошли в аккаунт', {
                icon: '✅',
            })
        } catch (error) {
            console.log('Error [LOGIN]', error)
            toast.error('Неправильная почта или пароль', {
                icon: '❌',
            })
        } finally {
            redirect('/') //чтобы перезагрузить страницу и показало окно что вход успешен
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
                                    {/* // TODO: Добавить сброс пароля. Для этого нужен Resend, к которому у меня нет домена  <div className="flex items-center"> <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline"> <s>Забыли пароль?</s> </a> </div>*/}
                                    <HCaptcha
                                        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
                                        // onVerify={(token) => console.log(token)}
                                        onVerify={() => setCaptchaFailed(false)}
                                        onExpire={() => setCaptchaFailed(true)}
                                        size="compact"
                                        ref={captchaRef}
                                    />
                                    <Button type="submit" loading={form.formState.isSubmitting} className="w-full">
                                        Войти
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Нет аккаунта?{" "}
                                    <Link href="/signup" className="underline underline-offset-4">Создать аккаунт</Link>
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}
