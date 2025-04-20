import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { FormInput } from "./form-template/form-input"

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Войти</CardTitle>
                    <CardDescription>
                        Введите ваши Email и пароль
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <FormInput label='Email' name='email' required type="email" />
                            <FormInput label='Пароль' name='password' required type="password" />
                            <div className="flex items-center">
                                <a href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"> Забыли пароль? </a>
                                {/* // TODO: Добавить сброс пароля */}
                            </div>

                            <Button type="submit" className="w-full">Войти</Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Нет аккаунта?{" "}
                            <a href="/register" className="underline underline-offset-4">Создать аккаунт</a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
