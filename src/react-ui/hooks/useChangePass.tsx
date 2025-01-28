import { userService } from '@/modules/user/application/user.service';
import { createUserRepository } from '@/modules/user/infrastucture/user.repository';
import { useState } from 'react';
import { useAuth } from './useAuth';
import { useTranslation } from 'react-i18next';

export default function useChangePass() {
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { accessToken } = useAuth();
    const { t } = useTranslation();

    const changePassword = async () => {
        try {
            setLoading(true);
            setError(null);
            if (accessToken) {
                const userServiceImpl = userService(createUserRepository())
                userServiceImpl.changePassword(accessToken, oldPass, newPass).then(() => {
                    setOldPass("")
                    setNewPass("")
                }).catch(() => {
                    setError(t('ERRORS.CHANGE_PASSWORD'))
                }).finally(() => {
                    setLoading(false);
                })
            } else {
                setLoading(false);
                throw new Error('No access token found')
            }
        } catch (error) {
            console.error('Change password failed:', error);
            throw error;
        }
    };

    return { changePassword, newPass, setNewPass, oldPass, setOldPass, error, loading };
}
