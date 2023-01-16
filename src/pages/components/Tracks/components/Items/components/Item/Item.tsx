import { useCallback } from "react";
import { useNavigate } from "react-router";
import { ButtonVariants } from "enums/Button";
import { sections } from "enums/SectionType";
import { ITrack } from "interfaces/store";
import { getImageForTrack } from "store/store";
import Button from "components/Button/Button";
import style from './item.module.css'

interface IItem {
    product: ITrack;
}

export default function Item(props: IItem) {
    const { product } = props;
    const navigate = useNavigate();
    const image = getImageForTrack(product);

    const openItem = useCallback(() => {
        navigate(`${sections.TRACKS}${sections.TRACK}/${product.id}`);
    }, [product, navigate]);

    return (
        <div className={style.item} onClick={openItem}>
            <img src={image} alt={product.id.toString()} className={style['item__image-section']} />
            <div className={style.item__content}>
                <p className={style['item__composer-name']}>{product.composer}</p>
                <p className={style['item__track-name']}>
                    {product.composition}<br />
                    {product.movement}
                </p>
                {/* <p className={style['item__product-price']}>{product.price} zł</p> */}
                <Button variant={ButtonVariants.OUTLINED} color='#2A78DE'>
                    <>Otwórz</>
                </Button>
            </div>
        </div>
    );
}