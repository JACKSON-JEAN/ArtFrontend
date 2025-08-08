// src/components/UploadArtworkMedia.tsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ARTWORK_MEDIA } from '../graphql/media';
import ArtworkMediaGallery from './ArtworkMediaGallery';

export default function UploadArtworkMedia() {
  const [file, setFile] = useState<File | null>(null);
  const [artworkId, setArtworkId] = useState<number>(1);
  const [type, setType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');

  const [addMediaInput, { data, loading, error }] = useMutation(ADD_ARTWORK_MEDIA);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      await addMediaInput({
        variables: {
          file,
          artworkId,
          type
        }
      });
      setFile(null); // Reset file input after successful upload
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Upload New Media</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Select File</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Media Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'IMAGE' | 'VIDEO')}
                className="w-full p-2 border rounded-md"
              >
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Artwork ID</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={artworkId}
                onChange={(e) => setArtworkId(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Uploading...' : 'Upload Media'}
          </button>

          {error && (
            <div className="p-3 text-red-700 bg-red-50 rounded-md">
              {error.message}
            </div>
          )}

          {data && (
            <div className="p-3 text-green-700 bg-green-50 rounded-md">
              ✅ Upload successful! The media will appear in the gallery below.
            </div>
          )}
        </form>
      </div>

      {/* Display existing media */}
      <ArtworkMediaGallery artworkId={1} />
    </div>
  );
}