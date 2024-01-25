# lexical-decorator-node-issue

Ok, this is a repository that contains reproduction example for decorator node issue.

## Running

It's a simple `Vite` setup, so just:

`npm i` 

`npm run dev`

## Issue overview

There is the following routing setup:

```js
<Route path="/" element={<ListPage documents={documents} />} />
<Route path="/docs/:documentId" element={
    <DetailsPageComp
      documents={documents}
      openModal={() => {
        setModalVisible(true);
      }}
    />
  }
/>
```

Where `ListPage` - a list of pre-defined documents. `DetailsPage` - is a page with lexical editor.

The problem starts when we have a combination:
- Custom decorator node. In this example it's a `CustomDecoratorNode` (in `src\Lexical\nodes\CustomDecoratorNode.tsx`)
- Page with editor is behind Suspense (with lazy loading). In real world we use it for code splitting in our big project.

Issue:
> When we trigger any sub-sequent re-render of editor by navigation or outside update, the decorator node won't render the content returned by `decorate` method.

Also, the content is rendering again if you edit the nearest nodes.

How it looks like:
https://github.com/EugeneVorobyev/lexical-decorator-node-issue/assets/1272788/eeea7090-83c8-429f-9dc9-6ad1cfd91900

