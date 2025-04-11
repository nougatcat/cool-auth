import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export function Congrats({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Вход успешен!</CardTitle>
                    <CardDescription>
                        Ваше имя - "имя пришедшее из пропсов, которое должен видеть только владелец аккаунта"
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <Button type="submit" className="w-full">
                                Выйти
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
