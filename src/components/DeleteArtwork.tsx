import React from "react";

interface DeleteProps{
    selectedId: number,
    artworkTitle: string,
    onDelete: () => void,
    onCancel: () => void,
}

const DeleteArtwork: React.FC<DeleteProps> = ({artworkTitle, selectedId, onDelete, onCancel}) => {
  return (
    <div onClick={onCancel} className=" fixed left-0 top-0 w-screen h-full bg-black/20 flex justify-center items-center">
      <div onClick={(e) => e.stopPropagation()} className=" bg-white max-w-[270px] p-3 rounded-sm">
        <p className=" text-center text-lg font-medium mb-1 text-red-600">
          Delete data! {selectedId}
        </p>
        <p>Are you sure you want to delete "{artworkTitle}"?</p>
        <div className=" flex justify-center gap-4 mt-2">
          <button onClick={onDelete} className=" bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-sm shadow-sm">
            Delete
          </button>
          <button onClick={onCancel} className=" border hover:bg-gray-50 px-3 py-1 rounded-sm shadow-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteArtwork;
