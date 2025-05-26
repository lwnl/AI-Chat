import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center">
      <div className="h-1/5"></div>
      <div className="w-1/2">
        <p className="text-bold text-2xl text-center">有什么可以帮您的吗？</p>
      </div>
    </div>
  );
}
