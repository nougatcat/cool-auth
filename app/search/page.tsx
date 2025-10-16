// import { cn } from '@/lib/utils'
import css from './page.module.css'

export default function Search() {
    return (
        <div className={css.container}>
            <div className="m-5">
                <div className="flex justify-between mb-5">
                    <div className={css.button_create}>Создать</div>
                    <div><input className={css.button_search} type="text" placeholder='Введите поисковой запрос' /></div>
                    <div className={css.button_profile}>Профиль</div>
                </div>
                <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]'>
                    <div className={css.row_head}>
                        <div className='w-[60%]'>Название</div>
                        {/* <div className='w-[60%] p-[10px] box-border'>Название</div> */}
                         {/* border-box; /* чтобы padding не увеличивал ширину. ВНЕЗАПНО паддинг теперь работает у родителя и смещения дочернего блока нет. ККААААККК */}
                        <div className='w-[20%]'>Владелец</div>
                        <div className='w-[20%]'>Права доступа</div>
                    </div>
                    <div className={css.row}>
                        <div className='w-[60%]'>документ очень важный</div>
                        <div className='w-[20%]'>Олег</div>
                        <div className='w-[20%]'>Чтение</div>
                    </div>
                    <div className={css.row + ' ' + css.row_green}>
                        <div className='w-[60%]'>документ очень важный ывывы ы вывывыфвфыв фыв фв фыафы афыа фы афы фы фы вы вфв фыфы вфы вфы</div>
                        <div className='w-[20%]'>Олег олег олег олег олег</div>
                        <div className='w-[20%]'>Чтение/Запись</div>
                    </div>
                    <div className={css.row_foot}></div>
                </div>
            </div>
        </div>
    )
}
