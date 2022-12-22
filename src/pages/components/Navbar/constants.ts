import { sections } from "../../../enums/SectionType";

const menu = '/';
const store = '/store';
const services = '/services';
const accessories = '/accessories';
const support = '/support';

export const theme = {
    style: {backgroundColor: '#fff'}
}

export const sectionsProps = [
    {key: sections.MAIN_PAGE, label: ""},
    {key: sections.STORE, label: "Sklep"},
    {key: sections.SERVICES, label: "Tylko w SnowBall"},
    {key: sections.ACCESSORIES, label: "Akcesoria"},
    {key: sections.SUPPORT, label: "Wsparcie"},
];

export interface INavigationNames {
    [menu]: number;
    [store]: number;
    [services]: number;
    [accessories]: number;
    [support]: number;
}

export const navigation = {
    [sections.MAIN_PAGE]: menu,
    [sections.STORE]: store,
    [sections.SERVICES]: services,
    [sections.ACCESSORIES]: accessories,
    [sections.SUPPORT]: support,
}

export const navigationNames = {
    [menu]: sections.MAIN_PAGE,
    [store]: sections.STORE,
    [services]: sections.SERVICES,
    [accessories]: sections.ACCESSORIES,
    [support]: sections.SUPPORT,
}