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