// src/components/ArtworkMediaGallery.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ARTWORK_MEDIA } from '../graphql/media';

interface ArtworkMediaGalleryProps {
  artworkId: number;
}

const ArtworkMediaGallery: React.FC<ArtworkMediaGalleryProps> = ({ artworkId }) => {
  const { data, loading, error } = useQuery(GET_ARTWORK_MEDIA, {
    variables: { artworkId: Number(artworkId) },
  });

  data && console.log(data)

  if (loading) return <div>Loading media...</div>;
  if (error) return <div>Error loading media: {error.message}</div>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Artwork Media</h3>
      
      {data?.artworkMedia?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.artworkMedia.map((media: any) => (
            <div key={media.id} className="border rounded-lg overflow-hidden shadow-sm">
              {media.type === 'IMAGE' ? (
                <img
                  src={media.url}
                  alt={`Artwork media ${media.id}`}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <video
                  src={media.url}
                  controls
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-3 bg-gray-50">
                <p className="text-sm font-medium">{media.type.toLowerCase()}</p>
                {media.width && media.height && (
                  <p className="text-xs text-gray-500">
                    {media.width}×{media.height}px
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No media available for this artwork.</p>
      )}
    </div>
  );
};

export default ArtworkMediaGallery;