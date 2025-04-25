'use client'
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

import { signOut } from 'next-auth/react';
import { redirect } from "next/navigation";

interface Props {
    className?: string
    user: string
}

export const Me: React.FC<Props> = ({user, className}) => {
    const onClickSignOut = () => {
        signOut({
            callbackUrl: '/'
        })
    }
    return (
        <Container>
            <div className={cn("flex flex-col gap-6", className)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Вход успешен!</CardTitle>
                        <CardDescription>
                            {user}, добро пожаловать!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <Button 
                                onClick={onClickSignOut}
                                type="button"
                                className="w-full"> 
                                Выйти 
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}
