import { IProduct } from "../../../../../interfaces/ProductInterface";
import style from './item.module.css'
import Button from "../../../../../components/Button/Button";
import { ButtonVariants } from "../../../../../types/ButtonType";
import { useNavigate } from "react-router";

interface IItem {
    product: IProduct;
}

export function Item(props: IItem) {
    const { product } = props;
    const navigate = useNavigate();
    const name = product.name.length <= 28 ? product.name : `${product.name.substring(0, 25)}...`;

    const openItem = () => {
        navigate(`/store/product/${product.id}`);
    }

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