import { ErrorRequestHandler, Request, Response } from "express";
import prismaClient from "../../PrismaClient";

export const createCoupon = async (req: Request, res: Response) => {
    try {
        const { discount, code, expiryDate, maxUses } = req.body;

        const coupon = await prismaClient.promoCode.create({
            data: {
                discount,
                code,
                expiryDate,
                maxUses: maxUses && maxUses,
            }
        })
        res.status(200).json({ success: true, coupon })
    } catch (e) {
        console.log(e);
    }
}

export const getCoupons = async (req: Request, res: Response) => {
    try {
        const coupons = await prismaClient.promoCode.findMany();
        res.status(200).json({ success: true, coupons })
    } catch (e) {
        res.status(500).json({ success: false, message: "Something went wrong" })
        console.log(e);
    }

}

export const deleteCoupon = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const coupon = await prismaClient.promoCode.delete({
            where: {
                id: Number(id),
            }
        })
        res.status(200).json({ success: true, coupon })
    } catch (e) {
        res.status(500).json({ success: false, message: "Something went wrong" })
        console.log(e);
    }
}

export const updateCoupon = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { discount, code, expiryDate, maxUses } = req.body;
        const coupon = await prismaClient.promoCode.update({
            where: {
                id: Number(id),
            },
            data: {
                discount,
                code,
                expiryDate,
                maxUses: maxUses && maxUses,
            }
        })
        res.status(200).json({ success: true, coupon })
    } catch (e) {
        res.status(500).json({ success: false, message: "Something went wrong" })
        console.log(e);
    }
}


export const applyCoupon = async (req: Request, res: Response) => {
    try {
        const { code } = req.body;
        const coupon = await prismaClient.promoCode.findFirst({
            where: {
                code,
            }
        })

        if (!coupon) {
            res.status(404).json({ success: false, message: "Coupon not found" })
            return;
        }

        if (coupon && coupon.expiryDate && coupon?.expiryDate < new Date()) {
            res.status(400).json({ success: false, message: "Coupon has expired" })
            return;
        }
        res.status(200).json({ success: true, coupon })
    } catch (e) {
        res.status(500).json({ success: false, message: "Something went wrong" })
        console.log(e);
    }
}
