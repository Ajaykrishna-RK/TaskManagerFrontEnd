function Loading() {
  return (
    <div className="flex justify-center py-6 min-h-[70vh]">
      <div
        className="animate-spin mt-20 inline-block size-8 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
