'use client'
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { ClearButton, ErrorText, RequiredSymbol } from "@/components/ui/validation";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

/**
 * Шаблон для инпутов с валидацией
 * @param name - Название инпута, по которому он ищется валидатором
 * @param label? - Надпись над инпутом
 * @param required? - Обязательное поле или нет
 */
export const FormInput: React.FC<Props> = ({ className, name, label, required, ...props }) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue
    } = useFormContext()
    const value = watch(name);
    const errorText = errors[name]?.message as string
    const onClickClear = () => {
        setValue(name, '', { shouldValidate: true })
    }
    return (
        <div className={className}>
            {/* заголовок */}
            {label && (
                <p className="font-medium mb-2">
                    {label}
                    {required && <RequiredSymbol />}
                </p>
            )}

            {/* инпут поле */}
            <div className="relative ">
                <Input {...props} {...register(name)} />

                {value && <ClearButton onClick={onClickClear} />}
            </div>

            {errorText && <ErrorText text={errorText} className="mt-2" />}
        </div>
    )
}