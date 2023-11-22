import { Request, Response } from "express";
import prismaClient from "../../PrismaClient";


export const createAddress = async (req: Request, res: Response) => {
    try {
        const { province, district, municipal, ward, landmark, phone, name } = req.body;
        const user = res.locals.user;
        const address = await prismaClient.address.create({
            data: {
                province,
                district,
                municipal,
                ward,
                landmark,
                phone,
                name,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
        res.status(200).json({ message: "address created successfully", address });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getAddresses = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        const addresses = await prismaClient.address.findMany({
            where: {
                userId: user.id,
            },
        });
        res.status(200).json({ addresses });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getAddress = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = res.locals.user;
        const address = await prismaClient.address.findFirst({
            where: {
                id: Number(id),
                userId: user.id,
            },
        });
        res.status(200).json({ address });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const updateAddress = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { province, district, municipal, ward, landmark, phone, name } = req.body;
        const user = res.locals.user;
        const address = await prismaClient.address.update({
            where: {
                id: Number(id),
            },
            data: {
                province,
                district,
                municipal,
                ward,
                landmark,
                phone,
                name,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
        res.status(200).json({ message: "address updated successfully", address });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const address = await prismaClient.address.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({ message: "address deleted successfully", address });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}