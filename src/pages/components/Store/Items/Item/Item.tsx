import { useCallback } from "react";
import { useNavigate } from "react-router";
import { ButtonVariants } from "enums/Button";
import { sections } from "enums/SectionType";
import { IProduct } from "interfaces/ProductInterface";
import Button from "components/Button/Button";
import style from './item.module.css'

interface IItem {
    product: IProduct;
}

export default function Item(props: IItem) {
    const { product } = props;
    const navigate = useNavigate();
    const name = product.name.length <= 28 ? product.name : `${product.name.substring(0, 25)}...`;

    const openItem = useCallback(() => {
        navigate(`${sections.STORE}/product/${product.id}`);
    }, [product, navigate]);

    return (
        <div className={style.item} onClick={openItem}>
            <img src={product.image} alt={product.id} className={style['item__image-section']} />
            <div className={style.item__content}>
                <p className={style['item__product-name']}>{name}</p>
                <p className={style['item__product-price']}>{product.price} zł</p>
                <Button variant={ButtonVariants.OUTLINED} color='#2A78DE'>
                    <>Otwórz</>
                </Button>
            </div>
        </div>
    );
}