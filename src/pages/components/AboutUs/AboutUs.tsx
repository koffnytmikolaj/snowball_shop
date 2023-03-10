import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { contactSections } from './constants';
import img from 'assets/AboutUs/jpg/guitar.jpg';
import ContactSection from './ContactSection';
import style from './aboutUs.module.css';

export default function AboutUs() {
    const [show, setShow] = useState<boolean>(false);
    const contactHeaderClassNames = clsx(
        style['about-us__header'], 
        show && style['about-us__header--shown'],
    );
    const imgClassNames = clsx(
        style['about-us__image'],
        show && style['about-us__image--shown'],
    )

    useEffect(() => setShow(true), []);
    
    return (
        <div className={style['about-us']}>
            <div className={style['about-us__contact']}>
                <h1 className={contactHeaderClassNames}>Kontakt</h1>
                <div className={style['about-us__sections']}>
                    {contactSections.map(contactSectionProps => {
                        return (
                            <ContactSection 
                                key={contactSectionProps.id}
                                id={contactSectionProps.id}
                                headerText={contactSectionProps.headerText}
                                email={contactSectionProps.email}
                                phoneNumber={contactSectionProps.phoneNumber}
                                show={show}
                            />
                        );
                    })}
                </div>
            </div>
            <img src={img} className={imgClassNames} alt='contact' />
        </div>
    );
}