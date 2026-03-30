import Image from 'next/image'
import css from './page.module.css'

async function getProducts() {
  const res = await fetch('http://localhost:5001/products')
  return res.json()
}

export default async function Home() {
  const products = await getProducts()
  return (
    <>
      <div className={css.grid}>
        {products.map((product: any) => (
          <div key={product._id} className={css.product}>
            <div className={css.imageWrapper}>
              <Image
                src={product.image}
                fill
                sizes="(min-width: 768px) 50vw"
                alt={product.name}
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
            <p>{product.name}</p>
            <p>{product.price}$</p>
            <button className={css.buyBtn}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
