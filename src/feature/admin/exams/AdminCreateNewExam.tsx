import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronDown,
  CloudUpload,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { uploadImage } from "../../api/diploma.api";
import notFoundImage from "../../../assets/notFoundImages.png"
import { FieldError } from "#components/ui/field";
import { useAllDiplomasData } from "../../api/quireisDiploma/use-quiry-diploma";
import { useCreateNewExam } from "../../api/quireisDiploma/use-create-new-exam";
import { Link, useNavigate, useNavigation } from "react-router";



const uploadDiplomaSchema = z.object({
    title: z.string().nonempty("Entry Exam Title"),
    description: z.string().nonempty("Entry Exam Description"),
    duration: z.union([z.string(), z.number()]),
    diplomaId: z.string(),
    image: z.instanceof(FileList).refine((files) => files.length > 0, {
        message: "Submit a Diploma Photo",
    }),
});

export type addExamType = z.infer<typeof uploadDiplomaSchema>;

export default function AdminCreateNewExam() {

    const { register, formState, handleSubmit } = useForm<addExamType>({
        defaultValues: {
            title: "",
            description: "",
            duration: "",
            diplomaId: "",
            image: undefined,
        },
        resolver: zodResolver(uploadDiplomaSchema),
    });


    const {data: diplomasTitle} = useAllDiplomasData()

    const {mutate: createNewExam} = useCreateNewExam()

    const [newImage, setNewImage] = useState<File|undefined>()

    const navigation = useNavigate()

    const imageRegister = register("image");

    const onSubmit: SubmitHandler<addExamType> = async (value) => {
        const theImage = await uploadImage({image: value.image[0]});
        createNewExam({
            title: value.title,
            description: value.description,
            duration: Number(value.duration),
            diplomaId: value.diplomaId,
            image: theImage,
        })

        navigation("/exams/adminExams");
    }

return (
  <div className="min-h-screen bg-white p-4 text-[13px] text-slate-700">

    {/* Main Form */}
    <form onSubmit={handleSubmit(onSubmit)} className="border border-slate-200 bg-white p-3">
        <div>
            {/* Breadcrumb */}
            <div className="mb-5 flex items-center gap-1.5 text-[10px] text-slate-400">
            <span>Exams</span>
            <span>/</span>
            <span>Final Full Stack Development Certification Exam</span>
            <span>/</span>
            <span className="text-blue-500">Edit</span>
            </div>

            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
                <div>
                <h1 className="text-[15px] font-bold text-slate-800">
                Final Full Stack Development Certification Exam
                </h1>

                <p className="mt-0.5 text-[10px] text-slate-400">
                Diploma:{" "}
                <span className="text-slate-500">
                    Full Stack Development
                </span>
                </p>
                </div>

                <div className="flex gap-2.5">
                {/* Cancel */}
                <Link
                    to={`/exams/adminExams`}
                    type="button"
                    className="
                        flex h-9 items-center gap-2
                        cursor-pointer
                        rounded-sm border border-slate-200
                        bg-white px-4
                        text-[11px] font-medium text-slate-600
                        transition-colors
                        hover:bg-slate-50
                    "
                >
                <X size={14} strokeWidth={2} />
                Cancel
                </Link>

                {/* Save */}
                <button
                    type="submit"
                    className="
                    flex h-9 items-center gap-2
                    cursor-pointer
                    rounded-sm bg-emerald-500
                    px-4
                    text-[11px] font-medium text-white
                    transition-colors
                    hover:bg-emerald-600
                "
                >
                    <Check size={14} strokeWidth={2} />
                    Save
                </button>
                </div>
            </div>
        </div>

        <div>
            {/* Blue Section Header */}
            <div className="mb-4 flex h-7 items-center bg-blue-600 px-3">
            <h2 className="text-[11px] font-semibold text-white">
            Exam Information
            </h2>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">

                {/* Title */}
                <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-slate-700">
                        Title
                    </label>

                    <input
                        {...register("title")}
                type="text"
                className="
                h-10 w-full
                rounded-sm border border-slate-200
                bg-white px-3
                text-[11px] text-slate-600
                outline-none
                transition-colors
                focus:border-blue-500
                "
                    />
                    <FieldError>{formState.errors.title?.message}</FieldError>
                </div>

                {/* Diploma */}
                <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-slate-700">
                        Diploma
                    </label>
        
                    <div className="relative">
                    <select
                        {...register("diplomaId")}
                        className="
                        h-10 w-full appearance-none
                        rounded-sm border border-slate-200
                        bg-white px-3 pr-9
                        text-[11px] text-slate-600
                        outline-none
                        transition-colors
                        focus:border-blue-500
                        overflow-y-auto
                        "
                    >
                        {diplomasTitle?.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.title}
                        </option>
                        ))}


                    </select>
        
                    <ChevronDown
                        size={15}
                        className="
                            pointer-events-none
                            absolute right-3 top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                    />
                    </div>
            
                </div>

                {/* Image */}
                <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-slate-700">
                    Image
                </label>

                <div
                    className="
                    flex h-[78px] items-center
                    gap-3 rounded-sm
                    border border-slate-200
                    bg-slate-50 px-3
                    "
                >
                    {/* Image Preview */}
                    <div
                    className="
                        h-[58px] w-[58px]
                        shrink-0 overflow-hidden
                        border border-slate-200
                        bg-white
                    "
                    >
                    <img
                        src={`${newImage !== undefined ? URL.createObjectURL(newImage) : notFoundImage}`}
                        alt="Exam"
                        className="h-full w-full object-cover"
                    />
                    </div>

                    {/* File Info */}
                    <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] text-slate-600">
                        Image_wl9j8wlmbj9wlmb9.jpg
                    </p>

                    <p className="mt-1 text-[9px] text-slate-400">
                        1.42 MB
                    </p>
                    </div>

                    {/* Upload */}
                    <label htmlFor="image-upload" className="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer">
                        <CloudUpload size={15} />
                    </label>

                    <input
                    {...imageRegister}
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    title="Upload"
                    onChange={(e) => {
                        imageRegister.onChange(e)
                        setNewImage(e.target.files?.[0])
                    }}
                    />



                    {/* Delete */}
                    <button
                        type="button"
                        className="
                            text-red-400
                            transition-colors
                            hover:text-red-500
                            cursor-pointer"
                            title="Delete"
                            onClick={()=>{
                                setNewImage(undefined)
                            }}
                        >
                        <Trash2 size={15} />
                    </button>
                </div>
                <FieldError>{formState.errors.image?.message}</FieldError>
                </div>

                {/* Description */}
                <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-slate-700">
                        Description
                    </label>

                    <textarea
                        {...register("description")}
                        className="
                        h-[78px] w-full
                        resize-none
                        rounded-sm border border-slate-200
                        bg-white p-3
                        text-[10px] leading-4
                        text-slate-600
                        outline-none
                        transition-colors
                        focus:border-blue-500
                        "
                    />
                    <FieldError>{formState.errors.description?.message}</FieldError>
                </div>

                {/* Duration */}
                <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-slate-700">
                        Duration (min)
                    </label>

                    <input
                        {...register("duration")}
                        type="number"
                        min={20}
                        className="
                        h-10 w-full
                        rounded-sm border border-slate-200
                        bg-white px-3
                        text-[11px] text-slate-600
                        outline-none
                        transition-colors
                        focus:border-blue-500
                        "
                    />
                    <FieldError>{formState.errors.duration?.message}</FieldError>
                </div>
            </div>
        </div>
    </form>
  </div>
);
}
