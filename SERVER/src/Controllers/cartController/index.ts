import { Request, Response } from "express";
import prismaClient from "../../PrismaClient"

export const addtoCart = async (req: Request, res: Response) => {
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

        const existingCart = await prismaClient.cartItem.findMany({
            where: {
                userId: user.id,
            },
            include: {
                product: true
            }
        })


        if (existingCart) {
            // const existingCartItem = existingCart?.[0]?.cartItems?.find((cartItem: any) => cartItem.productId === productId);
            const existingCartItem = existingCart.find((cartItem: any) => cartItem.productId === productId);
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


        const cart = await prismaClient.cartItem.create({
            data: {
                userId: user.id,
                productId: productId,
                quantity: 1
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
        const cart = await prismaClient.cartItem.findMany({
            where: {
                userId: user.id
            },
            include: {
                product: {
                    include: {
                        images: true
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
                id: cartItemId,
                userId: user.id
            }
        })

        if (!cartItem) {
            return res.status(400).send({
                success: false,
                message: "cartItem not found",
            });
        }

        await prismaClient.cartItem.delete({
            where: {
                id: cartItemId,
                userId: user.id
            }
        })

        res.status(200).json({ msg: 'cart item deleted ' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
}


export const updateCartItem = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        const { cartItemId, quantity } = req.body;

        if (!cartItemId) {
            return res.status(400).send({
                success: false,
                message: "cartItemId is required",
            });
        }

        if (!quantity) {
            return res.status(400).send({
                success: false,
                message: "quantity is required",
            });
        }

        //handle out of stock 


        const cartItem = await prismaClient.cartItem.findUnique({
            where: {
                id: cartItemId,
                userId: user.id
            }
        })

        if (!cartItem) {
            return res.status(400).send({
                success: false,
                message: "cartItem not found",
            });
        }

        await prismaClient.cartItem.update({
            where: {
                id: cartItemId
            },
            data: {
                quantity: quantity
            }
        });
        res.status(200).json({ msg: 'item updated' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
}