import { clsx } from 'clsx';
import { ContactSectionProps } from './interface';
import style from './contactSection.module.css';

export default function ContactSection(props: ContactSectionProps) {
    const { id, headerText, email, phoneNumber, show } = props;
    const sectionClassNames = clsx(
        style['contact-section'], 
        show && style['contact-section--shown'],
    );
    const animationDelay = id * 0.2 + 1;

    const theme = {
        section: {
            transitionDelay: `${animationDelay}s`,
        },
    };

    return (
        <div className={sectionClassNames} style={theme.section}>
            <p className={style['contact-section__title']}>{headerText}</p>
            <div className={style['contact-section__paragraph']}>
                <span className={style['contact-section__paragraph__e-mail']}>
                    {email}
                </span>
                <span className={style['contact-section__paragraph__phone']}>
                    {phoneNumber}
                </span>
            </div>
        </div>
    );
}
