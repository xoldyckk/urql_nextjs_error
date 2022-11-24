import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        fontSize: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span>Home</span>
      <Link href="/user/1" style={{ color: "blue" }}>
        Go to user 1 page : Normal Page
      </Link>
      <Link href="/user/2" style={{ color: "blue" }}>
        Go to user 2 page : Error Page
      </Link>
    </div>
  );
}
