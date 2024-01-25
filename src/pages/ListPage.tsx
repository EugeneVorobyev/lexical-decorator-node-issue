import { useNavigate } from "react-router-dom";

/**
 * A page with a list of items.
 */
export function ListPage(props: { documents: any[] }) {
  const navigate = useNavigate();
  const { documents } = props;

  return (
    <div className="p-8 text-lg flex flex-col gap-4">
      {documents.map((doc) => (
        <div
          className="text-blue-600 cursor-pointer hover:underline"
          key={doc.id}
          onClick={() => navigate(`/docs/${doc.id}`)}
        >
          {doc.id}
        </div>
      ))}
    </div>
  );
}
