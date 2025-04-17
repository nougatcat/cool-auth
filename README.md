### НИР
## Запуск

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
# update db - выполнять после каждого изменения схемы
npm run prisma:push
# prisma studio
npm run prisma:studio
# prisma generate - обновить типизацию без обновления бд
# ПРИ ДЕПЛОЕ ОБЯЗАТЕЛЬНО ВПИСАТЬ npx prisma generate && next build
npm run prisma:generate
# prisma seed - для тестовых данных
npm run prisma:seed
```