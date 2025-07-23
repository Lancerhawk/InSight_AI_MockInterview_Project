'use client';

export default function LoaderModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-100 border-solid"></div>
    </div>
  );
} 