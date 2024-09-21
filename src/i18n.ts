import i18n, { ResourceKey } from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

await i18n
    .use(
        resourcesToBackend((language, namespace, callback) => {
            import(`./locales/${language}/${namespace}.json`)
                .then((resources: boolean | ResourceKey | null | undefined) => {
                    callback(null, resources);
                })
                .catch((error: Error) => {
                    callback(error, null);
                });
        })
    )
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        lng: 'es',
        fallbackLng: 'es',
        debug: false,
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
