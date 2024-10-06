// components/Breadcrumb.tsx
import Link from "next/link";

interface BreadcrumbProps {
  author?: string;
  work?: string;
  chapter?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ author, work, chapter }) => {
  return (
    <div className="text-gray-600 text-sm mb-4 mt-24">
      <Link
        href="/"
        className="text-blue-500 duration duration-300 hover:opacity-70"
      >
        {"< Home"}
      </Link>
      {author && (
        <>
          {" / "}
          <Link
            href={`/texts/${author}`}
            className="text-blue-500 hover:opacity-70 duration-300 capitalize"
          >
            {author}{" "}
          </Link>
        </>
      )}
      {work && (
        <>
          {" / "}
          <Link
            href={`/texts/${author}/${work}`}
            className="text-blue-500 hover:opacity-70 duration-300 capitalize"
          >
            {work}
          </Link>
        </>
      )}
      {chapter && (
        <>
          {" / "}
          <Link
            href={`/texts/${author}/${work}/${chapter}`}
            className="text-blue-500 hover:opacity-70 duration-300 capitalize"
          >
            {chapter}
          </Link>
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
