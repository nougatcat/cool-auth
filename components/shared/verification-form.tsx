import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { FormInput } from "./form-template/form-input"
import { Container } from "./container";

interface Props {
    whichCode: 'verification' | 'twoFactor';
    className?: string
}

export const VerificationForm: React.FC<Props> = ({ className, whichCode, ...props }) => {
    return (
        <Container>
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
                                <FormInput label='Код' name={whichCode} required type="text" />
                                <Button type="submit" className="w-full">Отправить</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}
