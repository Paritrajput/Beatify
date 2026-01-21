export default function PlayerSkeleton() {
  return (
    <div className="h-20 bg-black border-t border-gray-800 px-4 flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 bg-gray-700 rounded-md" />

      <div className="flex-1 space-y-2">
        <div className="h-3 w-40 bg-gray-700 rounded" />
        <div className="h-3 w-24 bg-gray-600 rounded" />
      </div>

      <div className="hidden md:flex gap-3">
        <div className="w-6 h-6 bg-gray-700 rounded-full" />
        <div className="w-6 h-6 bg-gray-700 rounded-full" />
        <div className="w-6 h-6 bg-gray-700 rounded-full" />
      </div>
    </div>
  );
}
