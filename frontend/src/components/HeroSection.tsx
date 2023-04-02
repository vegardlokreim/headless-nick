import React from "react";

type Props = {
  title: string;
  description: string;
};

export default function HeroSection({ title, description }: Props) {
  return (
    <div className="flex flex-col bg-gray-100 items-center justify-center h-[50vh]">
      <h1 className="text-[34px]">{title}</h1>
      <p className="mt-6 text-xl">{description}</p>
    </div>
  );
}
