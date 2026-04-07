'use client'
import css from '../cart/page.module.css'
import styles from './page.module.css'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useCartStore} from '../../store/cartStore'
import {getOrders, OrdersResProps} from '../../services/getOrders'
import {useState} from 'react'
import Image from 'next/image'

const orderFindSchema = z
    .object({
        _id: z.string().min(10).or(z.literal('')),
        email: z.union([z.email({error: 'Invalid email'}), z.literal('')]),
        phone: z.string().min(7, {error: 'Invalid phone'}).or(z.literal('')),
    })
    .refine(({_id, email, phone}) => _id || email || phone, {
        message: 'Fill at least one field',
    })

export type OrderFind = z.infer<typeof orderFindSchema>
//
export default function OrdersHistory() {
    const [orders, setOrders] = useState<OrdersResProps[]>([])
    const [loading, setLoading] = useState(false)
    const saved = useCartStore(s => s.items)
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<OrderFind>({
        resolver: zodResolver(orderFindSchema),
    })
    const formValues = watch()

    const onSubmit = async (data: OrderFind) => {
        setLoading(true)
        const result = await getOrders(data)
        setOrders(result)
        setLoading(false)
    }

    return (
        <div className={styles.mainContainerHistory}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`${css.formCol} ${styles.formReorder}`}
            >
                <p>Find your order by one of fields below</p>
                <div>
                    <input placeholder='Email' {...register('email')} />
                    {errors.email && (
                        <p className={css.error}>{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <input placeholder='Phone' {...register('phone')} />
                    {errors.phone && (
                        <p className={css.error}>{errors.phone.message}</p>
                    )}
                </div>

                <div>
                    <input placeholder='Order ID' {...register('_id')} />
                    {errors._id && <p className={css.error}>{errors._id.message}</p>}
                </div>
                <button
                    type='submit'
                    className={`${css.clearAndSubmitBtn} ${styles.submitHistoryBtn}`}
                >
                    Submit
                </button>
            </form>

            <div className={styles.mainContItemInCartHistory}>
                {orders.map(order => (
                    <div
                        key={order._id}
                        className={`${css.itemInCart} ${styles.itemInCartHistory}`}
                    >
                        <p>
                            Order ID: &nbsp;
                            <span className={styles.paragraphHistoryItems}>{order._id}</span>
                        </p>
                        <p>
                            Created at:&nbsp;
                            <span className={styles.paragraphHistoryItems}>
                  {order.created_at.slice(0, 10)}
                </span>
                        </p>
                        {order.items.map((i, index) => (
                            <div key={i._id} className={css.itemInCard}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={i.image || '/placeholder.png'}
                                        fill
                                        sizes='(min-width: 768px) 50vw'
                                        alt={i.name}
                                        priority={index < 3}
                                        style={{objectFit: 'cover', borderRadius: '8px'}}
                                    />
                                </div>
                                <div className={styles.p}>
                                    <p className={styles.paragraphHistoryItems}>{i.name}</p>
                                    <p className={styles.paragraphHistoryItems}>Quantity: {i.quantity}</p>
                                    <p className={styles.paragraphHistoryItems}>{i.price}$</p>
                                </div>
                            </div>
                        ))}
                        <p className={styles.totalOrderPrice}>
                            Total order price:&nbsp;
                            <span className={styles.paragraphHistoryItems}>
                  {order.totalPrice} ${' '}
                </span>
                        </p>
                        <span className={styles.bottomLineHistory}></span>
                    </div>
                ))}
            </div>
        </div>
    )
}
