import { useEffect, useState } from "react";
import { X, Save, Upload, Image as ImageIcon, Edit } from "lucide-react";
import PageTitle from "../../shared/components/PageTitle";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError } from "#components/ui/field";
import useAddDiploma from "../api/quireisDiploma/use-add-diploma";
import { useUploadImage } from "../api/quireisDiploma/use-upload-image";
import { Link, useNavigate, useParams } from "react-router";
import { useDiplomaSpecificData } from "../api/quireisDiploma/use-specificDiploma-details";
// import { useUpdateDiploma } from "../api/quireisDiploma/use-update-diploma";
import { adminUpdateDiploma } from "../api/diploma.api";
import { useUpdateDiploma } from "../api/quireisDiploma/use-update-diploma";

const uploadDiplomaSchema = z.object({
    title: z.string().nonempty("Entry Diploma Title"),
    description: z.string().nonempty("Entry Diploma Description"),
    image: z.instanceof(FileList).optional(),
});

export type addDiplomaType = z.infer<typeof uploadDiplomaSchema>;

export default function AdminUpdateDiploma() {

    const {id: diplomaParam} = useParams();

    const { data } = useDiplomaSpecificData(diplomaParam);

    const navigation = useNavigate();

    const { register, formState, handleSubmit, reset, watch , setValue} = useForm<addDiplomaType>({
        defaultValues: {
            title: "",
            description: "",
            image: undefined,
        },
        resolver: zodResolver(uploadDiplomaSchema),
    });

    const imageRegister = register("image");

    const [uploadedImage,setUploadedImage] = useState< File | undefined>();

    const { mutateAsync: uploadImage} = useUploadImage();

    const { mutate: adminUpdateDiploma } = useUpdateDiploma();

    const [image, setImage] = useState<File | null>(null);

    const [titleText,setTitleText] = useState<string>();
    
    const [descriptionText,setDescriptionText] = useState<string>();



    const onSubmit: SubmitHandler<addDiplomaType> = async (value) => {

      if (!diplomaParam) return;

      let theImage;

      if (uploadedImage) {
        theImage = await uploadImage({
          image: uploadedImage,
        });
      }

      adminUpdateDiploma({
        id: diplomaParam,
        value: {
          title: value.title,
          description: value.description,
          ...(theImage && { image: theImage }),
        },
      });
      navigation("/exams/adminDiploma")
    };

  useEffect(() => {
  if (diplomaParam && data?.payload.diploma) {
    const diploma = data.payload.diploma;
    reset({
      title: diploma.title,
      description: diploma.description ?? "",
      image: undefined,
    });
  }
}, [diplomaParam, data, reset]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[12px] text-gray-600">
      {/* Top breadcrumb / actions */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
          <div className="flex items-center gap-2 text-[11px]">
            <PageTitle>
              {" "}
              Diploma /{" "}
              <span className="text-blue-600">{diplomaParam === undefined ? "Add New Diploma": "Edit Diploma"} </span>{" "}
            </PageTitle>
          </div>
          <div className="flex gap-4">
            <Link
              to={"/exams/adminDiploma"}
              type="button"
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 text-[11px] font-medium text-gray-600 transition hover:bg-gray-200"
            >
              <X size={13} strokeWidth={2} />
              Cancel
            </Link>

            {diplomaParam === undefined ? 
            <button
              type="submit"
              className="flex items-center cursor-pointer gap-2 rounded-sm bg-emerald-500 px-4 py-2 text-[11px] font-medium text-white transition hover:bg-emerald-600"
            >
              <Save size={13} strokeWidth={2} />
              Save
            </button>
            : 
            <button
              type="submit"
              className="flex items-center cursor-pointer gap-2 rounded-sm bg-blue-500 px-4 py-2 text-[11px] font-medium text-white transition hover:bg-blue-600"
            >
              <Edit size={13} strokeWidth={2} />
              Edit
            </button>
            }

          </div>
        </div>

        <main className="p-2">
          <div className="border border-gray-200 bg-white">
            {/* Section title */}
            <div className="bg-[#2463eb] px-3 py-2">
              <h2 className="font-mono text-[11px] font-semibold text-white">
                Diploma Information
              </h2>
            </div>

            <div className="space-y-4 p-2">
              {/* Image */}
              <div>
                <label className="mb-2 block font-mono text-[10px] font-semibold text-gray-600">
                  Image
                </label>

                <label
                  htmlFor="image-upload"
                  className="flex h-[44px] cursor-pointer items-center justify-center border border-gray-200 bg-white hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2 text-[9px] text-gray-400">
                    <ImageIcon
                      size={20}
                      strokeWidth={1}
                      className="text-gray-300"
                    />

                    <Upload
                      size={13}
                      strokeWidth={1.5}
                      className="text-gray-400"
                    />

                    <span>
                      Drop an image here or{" "}
                      <span className="text-blue-500 hover:underline">
                        select from your computer
                      </span>
                    </span>
                  </div>
                </label>

                {/* Real file input */}
                <input
                    {...imageRegister}
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const files = e.target.files?.[0];
                        setUploadedImage(files);
                        if (files) {
                            setImage(files);
                        }
                    }}
                />

                {/* Selected file name */}
                    {(image || (diplomaParam && data?.payload.diploma.image)) && (
                      <div className="w-50">
                        <p className="mt-2 text-[10px] text-gray-500">
                            Selected: {image?.name}
                        </p>

                        <img
                          src={
                            image
                              ? URL.createObjectURL(image)
                              : data?.payload.diploma.image
                          }
                          alt="Diploma"
                          className="w-100 h-32 object-cover rounded-lg mt-2"
                        />
                        
                      </div>
                    )} 
              </div>
              <FieldError>{formState.errors.image?.message}</FieldError>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block font-mono text-[10px] font-semibold text-gray-600"
                >
                  Title
                </label>

                <input
                    {...register("title")}
                    id="title"
                    type="text"
                    className="h-6 w-full border border-gray-200 bg-white px-2 outline-none transition focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                    onChange={(e)=>{
                        setValue("title", e.target.value, {
                          shouldValidate: true, // Triggers validation rules instantly
                          shouldDirty: true,    // Marks the field/form as modified
                          shouldTouch: true     // Marks the field as visited
                        });
                    }}
                />
              </div>
              <FieldError>{formState.errors.title?.message}</FieldError>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block font-mono text-[10px] font-semibold text-gray-600"
                >
                  Description
                </label>

                <textarea
                    {...register("description")}
                    id="description"
                    rows={5}
                    className="w-full resize-none border border-gray-200 bg-white p-2 outline-none transition focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                    onChange={(e)=>{
                        setValue("description", e.target.value, {
                          shouldValidate: true, // Triggers validation rules instantly
                          shouldDirty: true,    // Marks the field/form as modified
                          shouldTouch: true     // Marks the field as visited
                        });
                    }}
                />
              </div>
              <FieldError>{formState.errors.description?.message}</FieldError>
            </div>
          </div>
        </main>
      </form>

      {/* Main content */}
    </div>
  );
}
