// Temporary font check — confirm every self-hosted face loads. Delete once verified.
export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-16 text-3xl">
      <p className="font-signature">Bootzy — the script voice</p>
      <p className="font-display">Demo Motherlane — ornamental initials</p>
      <p className="font-heading">Alte Haas Grotesk — statement headings</p>
      <p className="font-label">ZT Bros Oskon 90s — the big name type</p>
      <p className="font-hand">Reenie Beanie — handwriting</p>
      <p className="font-body">Helvetica — body copy</p>
    </div>
  );
}
