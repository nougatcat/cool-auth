import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { FormInput } from "./form-template/form-input"

interface Props {
    className?: string
}

export const RegistrationForm: React.FC<Props> = ({className}) => {
    return (
        <div className={cn("flex flex-col gap-6", className)}>
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
                            <FormInput label='Пароль' name='password' required type="password"
                                placeholder="Минимум 6 символов"/>

                            <Button type="submit" className="w-full">Зарегистрироваться</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
