// components/TextCard.tsx
import Link from "next/link";

interface TextCardProps {
  title: string;
  description: string;
  href: string;
}

const TextCard: React.FC<TextCardProps> = ({ title, description, href }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-7 m-4 hover:bg-zinc-100 transition">
      <Link href={href} className="block">
        <h2 className="text-xl font-semibold text-gray-600">{title}</h2>
        <p className="mt-2 text-gray-700 text-sm">{description}</p>
      </Link>
    </div>
  );
};

export default TextCard;
