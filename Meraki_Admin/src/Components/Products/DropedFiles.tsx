import { FC } from "react";

export const DroppedFiles: FC<{ files?: File[], urls?: any }> = ({ urls }) => {
    return (
        <div>
            <div className="flex flex-wrap justify-center gap-2">
                {
                    urls?.map((data: any, index: number) => (
                        <img key={index} src={data.url} className="w-1/4 inline object-contain" alt="Uploaded file" />
                    ))
                }
                {/* {
                    files.length > 0 && files?.map((file, index: number) => (
                        <img key={index} src={URL.createObjectURL(file)} className="w-1/4 inline object-contain" alt="Uploaded file" />
                    ))
                } */}
            </div>
        </div>
    );
};