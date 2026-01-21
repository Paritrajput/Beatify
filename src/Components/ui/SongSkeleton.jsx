export default function SongSkeleton({ count = 5 }) {
  return (
    <div className="space-y-4 px-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 animate-pulse"
        >
          <div className="w-10 h-10 bg-gray-700 rounded-md" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-gray-700 rounded" />
            <div className="h-3 w-1/2 bg-gray-600 rounded" />
          </div>
          <div className="w-10 h-3 bg-gray-700 rounded hidden md:block" />
        </div>
      ))}
    </div>
  );
}
