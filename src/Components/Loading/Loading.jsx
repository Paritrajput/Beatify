"use client";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-full w-full bg-black">
      <div className="flex flex-col items-center gap-6">
        {/* Equalizer */}
        <div className="flex items-end gap-1 h-14">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`eq-bar delay-${i * 100}`}
            />
          ))}
        </div>

        <p className="text-green-400 tracking-widest text-sm animate-pulse">
          Loading music…
        </p>
      </div>
    </div>
  );
}
