import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function VerificationForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Код подтверждения</CardTitle>
                    <CardDescription>
                        Введите код подтверждения, который был отправлен вам на почту
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Код</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Отправить
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
