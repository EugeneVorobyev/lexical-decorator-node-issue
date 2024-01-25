import { useParams } from "react-router-dom";
import { DocumentEditor } from "../Lexical/Editor";

export default function DetailsPage(props: {
  documents: any[];
  openModal: () => void;
}) {
  const { documentId } = useParams();
  const { documents } = props;

  const document = documents.find((doc: any) => doc.id === documentId);
  if (!document) {
    return <div>Document not found</div>;
  }

  return (
    <div className="p-8">
      {documentId}
      <div
        className="text-blue-600 cursor-pointer hover:underline"
        onClick={props.openModal}
      >
        Open modal
      </div>
      <DocumentEditor documentId={document?.id} content={document?.content} />
    </div>
  );
}
