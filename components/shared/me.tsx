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

interface Props {
    className?: string
}

export const Me: React.FC<Props> = ({className}) => {
    return (
        <Container>
            <div className={cn("flex flex-col gap-6", className)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Вход успешен!</CardTitle>
                        <CardDescription>
                            Ваше имя - "имя пришедшее из пропсов, которое должен видеть только владелец аккаунта". Имя является секретной информацией, и видеть его должны только вы.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <Button type="submit" className="w-full"> Выйти </Button>
                            {/* // TODO: Добавить удаление куков (выход) */}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}
