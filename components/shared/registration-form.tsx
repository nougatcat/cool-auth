import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { FormInput } from "./form-template/form-input"


export function RegistrationForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Зарегистрироваться</CardTitle>
                    <CardDescription>
                        Введите данные для регистрации
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <FormInput label='Имя' name='name' required type="text" />
                            <FormInput label='Email' name='email' required type="email" />
                            <FormInput label='Пароль' name='password' required type="password" />

                            <Button type="submit" className="w-full">Зарегистрироваться</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
