import React from 'react';

interface Props {
    code: string,
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => {
    return (
        <div>
            <p>Код подтверждения: <h2>{code}</h2></p>

            <p><a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a></p>
        </div>
    );
};

///// 2fa неважно TODO поменять потом адрес на сайт вместо локалхоста (важно если я буду 2фа делать в этом проекте, а я не буду)