import React from 'react';
import { FolderSearch, Plus } from 'lucide-react'; // تقدر تغير الأيقونة حسب رغبتك

export default function NotFoundData() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* 1. دائرة تحتوي على الأيقونة بشكل جذاب */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500 mb-4 shadow-sm">
        <FolderSearch size={32} strokeWidth={1.5} />
      </div>

      {/* 2. العنوان الرئيسي */}
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        No Data Found
      </h3>

      {/* 3. الوصف التوضيحي */}
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        We couldn't find any items matching your current search or filter options. Try searching with different keywords.</p>
    </div>
  );
}