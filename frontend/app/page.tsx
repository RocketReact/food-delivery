import Image from 'next/image'
import css from './page.module.css'
import Link from 'next/link'

export default async function Home({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ category?: string }>
}) {
    const {category} = await searchParams
    const url = category
        ? `${process.env.URL_SERVER}/products?category=${category}`
        : `${process.env.URL_SERVER}/products`
    const products = await fetch(url).then(r => r.json())

    const categories = [
        'Burgers',
        'Drinks',
        'Desserts',
        'Sushi',
        'Rolls',
        'Soups',
        'Smoke Meat',
    ]

    return (
        <>
            <div className={css.mobileCategories}>
                {categories.map(cat => (
                    <Link key={cat} href={`?category=${cat}`} className={css.mobileCategoryLink}>
                        {cat}
                    </Link>
                ))}
            </div>
            <div className={css.mainHomeContainer}>
                <div className={css.sideCategory}>
                    <ul className={css.categorySideTextWrap}>
                        <Link href="?category=Burgers">
                            <li>Burgers</li>
                        </Link>
                        <Link href="?category=Drinks">
                            <li>Drinks</li>
                        </Link>
                        <Link href="?category=Desserts">
                            <li>Desserts</li>
                        </Link>

                        <li>Sushi</li>
                        <li>Rolls</li>
                        <li>Soups</li>
                        <li>Smoke Meat</li>
                    </ul>
                </div>
                <div className={css.grid}>
                    {products.map((product: any) => (
                        <div key={product._id} className={css.product}>
                            <div className={css.imageWrapper}>
                                <Image
                                    src={product.image}
                                    fill
                                    sizes="(min-width: 768px) 50vw"
                                    alt={product.name}
                                    style={{objectFit: 'cover', borderRadius: '8px'}}
                                />
                            </div>
                            <p>{product.name}</p>
                            <p>{product.price}$</p>
                            <button className={css.buyBtn}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
