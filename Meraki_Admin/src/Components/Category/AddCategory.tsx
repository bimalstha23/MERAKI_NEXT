import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addCategory } from "../../ApiHandle/categoryApi";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from "@hookform/error-message"
import { CiCircleRemove } from 'react-icons/ci'
import { enqueueSnackbar } from "notistack";
import { Backdrop, CircularProgress } from "@mui/material";

export const AddCategory = () => {

    const schema = yup.object().shape({
        title: yup.string().required('Category Name Can not be Empty').min(3),
        images: yup.array()
    })

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<{
        title: string,
        images: File[]
    }>({
        defaultValues: {
            title: '',
            images: []
        },
        resolver: yupResolver(schema) as any,
        mode: 'onSubmit'
    });

    const { mutate, isLoading } = useMutation({
        mutationKey: ['categories'],
        mutationFn: addCategory,
        onSuccess: () => {
            setValue('title', '')
            setValue('images', [])
            setDroppedFiles([])
            enqueueSnackbar('Category Added Successfully', {
                variant: 'success'
            })
        },
        onError: () => {
            enqueueSnackbar('Error Adding Category', {
                variant: 'error'
            })
        }
    })
    const [isDragging, setIsDragging] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState<File[]>([]);


    useEffect(() => {
        setValue('images', droppedFiles);
    }, [droppedFiles, setValue]);


    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };


    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        const droppedFile = files[0];
        if (droppedFile) {
            setDroppedFiles([droppedFile]);
        }
    };


    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        // Ensure only the first file is selected
        const selectedFile = files[0];
        if (selectedFile) {
            setDroppedFiles([selectedFile]);
        }
    };


    const submit = (data: any) => {
        const form = new FormData()
        form.append('name', data.title)
        form.append('image', data.images[0])
        mutate(form)
    }


    return (
        <div className="flex justify-center items-center shadow-xl w-full rounded-xl">
            <form className="w-full" onSubmit={
                handleSubmit((data, _event) => submit(data))}>
                <div className="flex flex-row justify-center items-center w-full p-8 gap-10">
                    <div className="w-full">
                        {droppedFiles.length > 0 ? <div className="w-full flex flex-col gap-5">
                            <div className="relative w-full">
                                <img className="object-cover w-full" src={
                                    URL.createObjectURL(droppedFiles[0])
                                } alt="" />
                                <div className="absolute top-0 right-0">
                                    <button onClick={() => setDroppedFiles([])
                                    } className="bg-red-500 text-white px-2 py-1 rounded-md">
                                        <CiCircleRemove size={30} />
                                    </button>
                                </div>
                            </div>
                        </div> :
                            <div
                                onDragEnter={handleDragEnter}
                                onDragOver={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`w-full cursor-pointer h-[500px] flex bg-slate-300  justify-center items-center ${isDragging ? 'bg-gray-100' : ''
                                    } ${errors.images ? 'border-2 border-red-500' : 'border-2 border-slate-300'
                                    }`}>
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        {/* SVG path code */}
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md  font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input onChange={handleFileSelect} multiple name="images" id="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>}
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
                            disabled={isLoading}
                            className="bg-success text-white px-4 py-2 mx-20 rounded-md"
                        >
                            Create Category
                        </button>
                    </div>
                </div>
            </form>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>

    )
}
