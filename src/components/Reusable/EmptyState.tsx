import { IconDocument } from "../Icons";

const EmptyState = () => {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="flex size-full items-center justify-center rounded bg-gray-100 p-6 text-center">
        <div className="flex flex-col items-center space-y-2 py-10">
          <IconDocument className="!size-10" />
          <h2 className="text-3xl font-bold">No Document Selected</h2>
          <p className="text-muted-foreground w-[32ch] text-xl leading-[1.2] font-medium">
            Select a document from the sidebar or create a new one to get started.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
