import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },

    reducers: {
        addToCart: (state, data) => {
            let cartItem = data.payload;
            console.log('CartItem in slice', cartItem)
            state.cart.push(cartItem)
        },
        removeFromCart: (state, data) => {
            console.log("cart Index", data.payload)
            state.cart.filter((item) => {
                if (item.id === data.payload.id) {
                    state.cart.splice(data.payload.id, 1)
                }
            })
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice
