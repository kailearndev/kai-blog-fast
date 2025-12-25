export default function GlobalLoading() {
  return (
    <div className="flex justify-center items-center absolute w-full h-full  top-0 left-0 bg-black bg-opacity-50 z-50">
      <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-300"></div>
    </div>
  );
}
