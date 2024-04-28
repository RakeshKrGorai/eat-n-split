export default function Button({
  children,
  Click,
}: {
  children: string;
  Click: () => void;
}) {
  return (
    <button className="button" onClick={Click}>
      {children}
    </button>
  );
}
