'use client'
import { useCartStore } from '../../store/cartStore'
import toast from 'react-hot-toast'

export default function AddToCard({
                                    product,
                                    className,
                                  }: {
  product: any
  className?: string
}) {
  const addToCart = useCartStore(s => s.addToCart)

  return (
    <button
      className={className}
      onClick={() => {
        addToCart({
          _id: product._id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        })
        toast.success(`Added to cart`)
      }
      }
    >
      Add to Cart
    </button>
  )
}
