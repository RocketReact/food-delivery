import Image from 'next/image'
import css from './page.module.css'
import Link from 'next/link'

type Product = {
    _id: string
    name: string
    price: number
    image?: string
}

export default async function Home({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ storeName?: string; category?: string }>
}) {
    const {storeName, category} = await searchParams

    const params = new URLSearchParams()
    if (storeName) params.set('storeName', storeName)
    if (category) params.set('category', category)

    const query = params.toString()
    const url = `${process.env.URL_SERVER}/products${query ? `?${query}` : ''}`

    let products: Product[] = []

    try {
        const res = await fetch(url, {cache: 'no-store'})
        if (res.ok) {
            products = await res.json()
        }
    } catch (error) {
        console.error('Fetch error:', error)
    }
    const shops = [
        'Burger Factory',
        'Pizza Palace',
        'Sweet Corner',
        'Chill and Sip',
        'Ocean Grill',
    ]
    const categories = [
        'Burgers',
        'Drinks',
        'Desserts',
        'Pizza',
        'Pasta',
        'Salads',
        'Seafood',
    ]
    return (
        <>
            {/* <div className={css.mobileCategories}> */}
            {/*     {categories.map(cat => ( */}
            {/*         <Link key={cat} href={`?category=${cat}`} className={css.mobileCategoryLink}> */}
            {/*             {cat} */}
            {/*         </Link> */}
            {/*     ))} */}
            {/* </div> */}
            <div className={css.mainHomeContainer}>
                <div className={css.sideShops}>
                    <p className={css.titleShops}>Shops:</p>
                    <ul className={css.shopsSideTextWrap}>
                        {shops.map(shop => (
                            <li key={shop}>
                                <Link
                                    href={{
                                        pathname: '/',
                                        query: {storeName: shop},
                                    }}
                                >
                                    {' '}
                                    {shop}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={css.grid}>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={product._id} className={css.product}>
                                <div className={css.imageWrapper}>
                                    <Image
                                        src={product.image || '/placeholder.png'}
                                        fill
                                        sizes='(min-width: 768px) 50vw'
                                        alt={product.name}
                                        priority={index < 3}
                                        style={{objectFit: 'cover', borderRadius: '8px'}}
                                    />
                                </div>
                                <p>{product.name}</p>
                                <p>{product.price}$</p>
                                <button className={css.buyBtn}>Add to Cart</button>
                            </div>
                        ))
                    ) : (
                        <p>Products not found</p>
                    )}
                </div>
            </div>
        </>
    )
}
