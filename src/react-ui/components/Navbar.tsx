import { useTranslation } from 'react-i18next';
import { Button } from './button';

interface NavbarProps {
    title?: string;
}

function NavBar({ title }: NavbarProps) {
    const { t } = useTranslation();


    return (
        <div className='flex gap-4 bg-slate-700 py-4 px-8 justify-between rounded-lg bg-opacity-45'>
            {title && <h1>{title}</h1>}
            <Button>{t('BUTTONS.LOGOUT')}</Button>
        </div>
    );
}

export default NavBar;
