export default function StripesBackground({
  opacity = "opacity-40",
}) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none ${opacity} z-0`}
      aria-hidden="true"
    >
      <div className="w-full h-full bg-[repeating-linear-gradient(45deg,rgba(245,124,0,0.12),rgba(245,124,0,0.12)_10px,transparent_10px,transparent_20px)]" />
    </div>
  );
}
