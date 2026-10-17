/** Teks dengan **tebal** sederhana. Tidak menyentuh HTML, aman untuk data pengguna. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((s, i) => (i % 2 ? <b key={i}>{s}</b> : <span key={i}>{s}</span>))}
    </>
  );
}
