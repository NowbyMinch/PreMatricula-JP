export function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-full my-auto mx-auto">
      <div className="animate-spin w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full" />
    </div>
  )
}
export function LoadingSmaller() {
  return (
    <div className="flex justify-center items-center w-full h-full my-auto mx-auto">
      <div className="animate-spin w-5 h-5 border-3 border-yellow-400 border-t-transparent rounded-full" />
    </div>
  )
}