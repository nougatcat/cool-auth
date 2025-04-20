'use client'
// TODO import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { ClearButton, ErrorText, RequiredSymbol } from "@/components/ui/validation";

interface Props {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    type?: string;
}

/**
 * Шаблон для инпутов с валидацией
 * @param name - Название инпута, по которому он ищется валидатором
 * @param label? - Надпись над инпутом
 * @param required? - Обязательное поле или нет
 */
export const FormInput: React.FC<Props> = ({ className, name, label, required, ...props }) => {
    // TODO const {} = useFormContext()
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
                <Input {...props} />

                {/* //TODO {value && <ClearButton onClick={onClickClear} />} */}
            </div>

            <ErrorText text='Поле обязательное' className="mt-2" />
            {/* //TODO {errorText && <ErrorText text={errorText} className="mt-2" />} */}
        </div>
    )
}