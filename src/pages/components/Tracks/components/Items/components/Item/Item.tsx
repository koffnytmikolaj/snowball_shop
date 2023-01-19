import { useCallback } from "react";
import { useNavigate } from "react-router";
import { ButtonVariants } from "enums/ButtonEnums";
import { Sections } from "enums/SectionType";
import { getImageForTrack } from "store/store";
import { ItemProps } from "./interface";
import Button from "components/Button/Button";
import style from './item.module.css'

export default function Item(props: ItemProps) {
    const { product } = props;
    const navigate = useNavigate();
    const image = getImageForTrack(product);

    const openItem = useCallback(() => {
        navigate(`${Sections.TRACKS}${Sections.TRACK}/${product.id}`);
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