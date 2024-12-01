interface EmptySectionProps {
  title: string;
  description: string;
}

function EmptySection({ title, description }: EmptySectionProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mb-4 text-[#8470FF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v5m6-5v5m-9-5h12a2 2 0 002-2v-5a2 2 0 00-2-2H6a2 2 0 00-2 2v5a2 2 0 002 2zm0-10h12m-6-6v6"
        />
      </svg>
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
  );
}

export default EmptySection;
