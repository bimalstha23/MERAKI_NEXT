import { Request, Response } from "express";
import prismaClient from "../../PrismaClient"

export const addtoCard = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).send({
                success: false,
                message: "productId is required",
            });
        }

        const product = await prismaClient.product.findUnique({
            where: {
                id: productId
            }
        })

        if (!product) {
            return res.status(400).send({
                success: false,
                message: "product not found",
            });
        }

        if (product.quantity === 0) {
            return res.status(400).send({
                success: false,
                message: "product is out of stock",
            });
        }

        const existingCart = await prismaClient.cart.findFirst({
            where: {
                userId: user.id
            },
            include: {
                cartItems: true
            }
        })

        if (existingCart) {
            const existingCartItem = existingCart.cartItems.find(cartItem => cartItem.productId === productId)
            if (existingCartItem) {
                await prismaClient.cartItem.update({
                    where: {
                        id: existingCartItem.id
                    },
                    data: {
                        quantity: existingCartItem.quantity + 1
                    }
                })
                return res.status(201).json({ cart: existingCart });
            }
        }


        const cart = await prismaClient.cart.create({
            data: {
                userId: user.id,
                cartItems: {
                    create: {
                        productId: product.id,
                        quantity: 1
                    }
                }
            }
        })

        res.status(201).json({ cart });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }

}


export const getCart = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;

        const cart = await prismaClient.cart.findFirst({
            where: {
                userId: user.id
            },
            include: {
                cartItems: {
                    include: {
                        product: true
                    }
                }
            }
        })
        res.status(200).json({ cart });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
}



export const deleteCartItem = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        const { cartItemId } = req.body;
        
        if (!cartItemId) {
            return res.status(400).send({
                success: false,
                message: "cartItemId is required",
            });
        }

        const cartItem = await prismaClient.cartItem.findUnique({
            where: {
                id: cartItemId
            }
        })

        if (!cartItem) {
            return res.status(400).send({
                success: false,
                message: "cartItem not found",
            });
        }

        const cart = await prismaClient.cart.findFirst({
            where: {
                userId: user.id
            },
            include: {
                cartItems: true
            }
        })

        if (!cart) {
            return res.status(400).send({
                success: false,
                message: "cart not found",
            });
        }

        const existingCartItem = cart.cartItems.find(cartItem => cartItem.id === cartItemId)

        if (!existingCartItem) {
            return res.status(400).send({
                success: false,
                message: "cartItem not found in cart",
            });
        }

        await prismaClient.cartItem.delete({
            where: {
                id: cartItemId
            }
        })

        res.status(200).json({ cart });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
}