import { GraduationCap } from "lucide-react";
import PageTitle from "../../../shared/components/PageTitle";
import SectionsTitle from "../../../shared/components/SectionsTitle";
import { useAllDiplomas } from "../../api/quireisDiploma/use-quiry-diploma";
import { Link, Outlet } from "react-router";
import { cn } from "../../../shared/lib/utils";
import { useState } from "react";

export default function Diplomas() {
    const [pageNumber, setPageNumber] = useState(1);
    const {data: payload} = useAllDiplomas(pageNumber);
    const diplomas = payload?.data ?? [];
    const totalPages = payload?.metadata?.totalPages ?? 1;
return (
    <div className="w-full sm:w-3xl md:w-4xl lg:w-5xl">
        <div>

            <PageTitle>Diploma</PageTitle>
            <SectionsTitle> 
                <>
                    <GraduationCap className="w-10 h-10" />
                    <p className="">Diplomas</p>
                </>
            </SectionsTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {payload?.data && payload?.data.map((e) => (
                    <Link
                        className="group relative w-full"
                        key={e.id}
                        to={`/exams/${e.id}`}
                    >
                        <img
                            src={e.image}
                            alt=""
                            className="w-full h-auto aspect-[3/4] object-co"
                        />
            
                        <div className="text-white p-2 sm:p-3 absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 bg-[#155DFCBF]">
                            <p className="font-geist-mono font-semibold text-[16px] sm:text-[18px] lg:text-[20px] leading-none tracking-normal align-middle">
                                {e.title}
                            </p>
                
                            <p
                                className={cn(
                                    "font-geist-mono font-normal text-[12px] sm:text-[13px] lg:text-[14px] leading-none tracking-normal align-middle",
                                    "max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-72 group-hover:opacity-100",
                                )}
                            >
                                {e.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex items-center justify-center gap-3 w-fit mx-auto my-2">
                <button
                    type="button"
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber((prev) => prev - 1)}
                    className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Prev
                </button>

                <p className="text-sm font-medium">
                    {pageNumber} / {totalPages}
                </p>

                <button
                    type="button"
                    disabled={pageNumber === totalPages}
                    onClick={() => setPageNumber((prev) => prev + 1)}
                    className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </div>
        <Outlet />
    </div>
)
}
