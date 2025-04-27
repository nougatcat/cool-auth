'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput } from "./form-template/form-input"
import { Container } from "./container"
import { FormProvider, useForm } from "react-hook-form"
import { formRegisterSchema, TFormRegisterValues } from "@/constants/zod-schemas"
import { zodResolver } from "@hookform/resolvers/zod"

interface Props {
    className?: string
}

export const RegistrationForm: React.FC<Props> = ({ className }) => {
        const form = useForm<TFormRegisterValues>({
            resolver: zodResolver(formRegisterSchema),
            defaultValues: {
                email: '',
                password: '',
                name: '',
                confirmPassword: '',
            }
        })
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
                            <form>
                                <div className="flex flex-col gap-6">
                                    <FormInput label='Имя' name='name' required type="text" />
                                    <FormInput label='Email' name='email' required type="email" />
                                    <FormInput label='Пароль' name='password' required type="password"
                                        placeholder="Минимум 6 символов" />
                                    <FormInput label='Пароль повторно' name='confirmPassword' required type="password"
                                        placeholder="Минимум 6 символов" />
                                    <Button type="submit" className="w-full">Зарегистрироваться</Button>
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}
