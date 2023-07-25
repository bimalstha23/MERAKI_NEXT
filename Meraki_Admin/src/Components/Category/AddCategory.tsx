import { useForm } from "react-hook-form";

export const AddCategory = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();


    return (
        <div className="flex justify-center items-center shadow-xl">
            <div className="flex flex-row justify-center items-center w-full p-8">
                <div className="w-full">

                </div>
                <form action="">
                    <div className="w-full flex flex-col gap-11">
                        <div className="flex flex-col">
                            <label htmlFor="name">
                                Category Name
                            </label>
                            <input {...register('title')} type="text" id="name" placeholder="type name here"
                                className="bg-slate-300 w-full rounded-md p-2" />
                        </div>
                        <button
                            className="bg-success text-white px-4 py-2 mx-20 rounded-md"
                        >
                            Create Category
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}
