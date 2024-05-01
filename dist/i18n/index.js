import english from './en.json';
import spanish from './es.json';
const Languages = {
    ENGLISH: 'en',
    SPANISH: 'es'
};
export const getI18N = ({ currentLocale = 'es' }) => {
    if (currentLocale === Languages.ENGLISH)
        return english;
    else if (currentLocale === Languages.SPANISH)
        return spanish;
    else
        return spanish;
};
//# sourceMappingURL=index.js.map