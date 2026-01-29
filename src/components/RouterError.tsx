import { useEffect } from "react";
import { useRouteError } from "react-router-dom";

export default function RouterError() {
  const error: any = useRouteError();

  const isChunkError =
    error?.message?.includes("Loading chunk") ||
    error?.name === "ChunkLoadError";

  useEffect(() => {
    if (isChunkError) {
      const hasReloaded = sessionStorage.getItem("chunk-reloaded");

      if (!hasReloaded) {
        sessionStorage.setItem("chunk-reloaded", "true");
        window.location.reload();
      }
    }
  }, [isChunkError]);

  if (isChunkError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-sm opacity-70">Updating application…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="text-sm opacity-70 mt-2">
        Please refresh the page and try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Reload
      </button>
    </div>
  );
}
