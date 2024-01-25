import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListPage } from "./pages/ListPage";
import { Suspense, lazy, useState } from "react";
import { Documents } from "./DocData";
import { Modal } from "./components/Modal";

/**
 *
 * Here is a problem
 *
 * If you put an editor behind the Suspense, custom Decorator nodes won't be rendered on
 * subsequent renders.
 *
 * It can be emulated by situation when we have a modal above the editor.
 * (be sure it's not a Modal issue, as it has been reproduced without it with a different
 * setup as well. It's just for simplicity of reproduction)
 *
 * Though if you replace Suspense with a direct DetailsPage component - all decorator nodes will
 * be rendered fine
 *
 */
function DetailsPageComp(props: any) {
  const DocumentRouter = lazy(() => import("./pages/DetailsPage"));
  return (
    <Suspense>
      <DocumentRouter {...props} />
    </Suspense>
  );
}

function App() {
  const [documents, setDocuments] = useState(Documents);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage documents={documents} />} />
        <Route
          path="/docs/:documentId"
          element={
            <DetailsPageComp
              documents={documents}
              openModal={() => {
                setModalVisible(true);
              }}
            />
          }
        />
      </Routes>
      <Modal
        visible={modalVisible}
        onClick={() => {
          setModalVisible(false);
        }}
      />
      <div id="portal"></div>
    </BrowserRouter>
  );
}

export default App;
