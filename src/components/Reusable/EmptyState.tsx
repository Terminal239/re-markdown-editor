import { IconDocument } from "../Icons";

const EmptyState = () => {
  return (
    <div className="h-full w-full flex items-center justify-center p-6">
      <div className="size-full text-center p-6 bg-gray-100 rounded flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2 py-10">
          <IconDocument className="!size-10" />
          <h2 className="text-3xl font-bold">No Document Selected</h2>
          <p className="text-xl leading-[1.2] font-medium text-muted-foreground w-[32ch]">Select a document from the sidebar or create a new one to get started.</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
