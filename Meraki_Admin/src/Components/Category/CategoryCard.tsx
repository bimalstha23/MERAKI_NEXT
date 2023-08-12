import { ErrorMessage } from "@hookform/error-message";
import { Dialog, DialogTitle } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { MdModeEditOutline } from "react-icons/md";
import { updateCategory } from "../../services/categoryApi";
import queryClient from "../../API/ReactQuery";
import { enqueueSnackbar } from "notistack";

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

            <UpdateCategoryDialog
                open={open}
                onClose={() => setOpen(false)}
                title={title}
                id={id}
                image={image}
            />
        </div>
    )
}

const UpdateCategoryDialog: FC<DialogProps> = (props) => {
    const { open, onClose, title, image } = props;

    const { register, handleSubmit, formState: { errors } } = useForm<{
        title: string,
    }>({
        defaultValues: {
            title: title,
        },
        mode: 'onSubmit'
    });

    const { mutate } = useMutation({
        mutationKey: ['categories', props.id],
        mutationFn: updateCategory,
        onSuccess: () => {
            enqueueSnackbar('Category Updated Successfully', {
                variant: 'success'
            })
            queryClient.invalidateQueries(['categories'])
        },
        onError: () => {
            enqueueSnackbar('Error Updating Category', {
                variant: 'error'
            })
        }
    })


    const submit = (data: any) => {
        mutate({
            id: props.id,
            name: data.title,
        })
    }




    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth={true}
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.6)"
                }
            }}
        >
            <DialogTitle>Update Category</DialogTitle>

            <form className="w-full" onSubmit={
                handleSubmit((data, _event) => submit(data))}>
                <div className="flex flex-row justify-center items-center w-full p-8 gap-10">
                    <div className="w-full">
                        <img src={image} className="w-full" alt="" />
                    </div>
                    <div className="w-full flex flex-col gap-11">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">
                                Category Name
                            </label>
                            <input accept=".png, .jpg, .jpeg, .gif" {...register('title')} type="text" id="name" placeholder="type name here"
                                className={`bg-slate-300 w-full rounded-md p-2 ${errors.title ? 'border-2 border-red-500' : 'border-2 border-slate-300'
                                    }`
                                } />
                            <ErrorMessage name="title" errors={errors}
                                render={({ message }) => <p className="text-red-500 text-sm">{message}</p>}

                            />
                        </div>
                        <button
                            disabled={false}
                            className="bg-success text-white px-4 py-2 mx-20 rounded-md"
                        >
                            update Category
                        </button>
                    </div>
                </div>
            </form>
        </Dialog>
    )
}
