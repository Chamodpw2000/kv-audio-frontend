import './productCard.css';

export default function ProductCard( {name, price, img, description} ) {
    return (
        <div className="product-card">
            <img
                className="product-image"
                src={img}
                alt="product"
            />
            <span className="product-name">{name}</span>
            <span className="product-price">LKR. {price}/-</span>
            <p>
                
                {description}
            </p>
        </div>
    )
}
