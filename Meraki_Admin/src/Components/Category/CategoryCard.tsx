import { Dialog } from "@mui/material";
import { FC, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";

interface ICategoryCard {
    title: string;
    image: string;
    id: string | number;
    numeberOfProducts: number;
}

interface DialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    id: string | number;
    image: string;
}


export const CategoryCard: FC<ICategoryCard> = (props) => {
    const { title, image, id, numeberOfProducts } = props;
    const [open, setOpen] = useState<boolean>(false);


    return (
        <div className="flex flex-row rounded-lg shadow-xl justify-center items-center gap-2 p-3 w-[350px]">
            <h1>{id}</h1>
            <div className="flex justify-center items-center h-20 w-20 rounded-full">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-start items-start w-full">
                <h1>
                    {title}
                </h1>
                <h1 className="text-sm text-slate-300">
                    {numeberOfProducts}
                </h1>
            </div>
            <button onClick={() => setOpen(true)} className=" text-textHighlight px-4 py-2 rounded-md">
                <MdModeEditOutline />
            </button>

            <UpdateProductDialog
                open={open}
                onClose={() => setOpen(false)}
                title={title}
                id={id}
                image={image}
            />

        </div>
    )
}

const UpdateProductDialog: FC<DialogProps> = (props) => {
    const { open, onClose, title, id, image } = props;


    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="flex flex-col justify-center items-center"
            maxWidth="md"
        >
            <div className="flex flex-row justify-center items-center">
                <div className="w-full"></div>
                <div className="w-full">

                </div>
            </div>
        </Dialog>
    )
}
