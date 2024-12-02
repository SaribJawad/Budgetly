interface EmptySectionProps {
  title: string;
  description: string;
}

function EmptySection({ title, description }: EmptySectionProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black text-gray-500 text-center p-10">
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
  );
}

export default EmptySection;
