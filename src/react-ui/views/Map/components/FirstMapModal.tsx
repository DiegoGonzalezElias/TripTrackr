import { Button } from '@/react-ui/components/button'
import Modal from '@/react-ui/components/Modal'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function FirstMapModal() {
    const [map, setMap] = useState('');
    const { t } = useTranslation();

    return (
        <Modal title={t('CARD_TITLE.CREATE_FIRST_MAP')} onClose={() => { }}>
            <form className='text-start'>
                <div className="grid w-full items-center gap-4 mb-4">
                    <div className="flex flex-col space-y-1.5">
                        <label className=" text-gray-600 text-sm">{t('LABELS.MAP')}</label>
                        <input
                            type="text"
                            value={map}
                            onChange={(e) => setMap(e.target.value)}
                            placeholder={t('PLACEHOLDERS.ADD_MAP_NAME')}
                            className="border border-gray-300 rounded-md p-2 w-full mt-2"
                        />
                    </div>
                </div>
                <Button type='button' size={'lg'} className='mt-4 w-full bg-chart-2' onClick={() => { }}>{t('BUTTONS.CREATE_MAP')}</Button>
            </form>
        </Modal>
    )
}

export default FirstMapModal