import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface BikeImageProps {
  imageUrl: string;
  name: string;
}

const BikeImage: React.FC<BikeImageProps> = ({ imageUrl, name }) => (
  <div className="relative h-56 mx-4 -mt-6 overflow-hidden rounded-xl bg-blue-gray-500 shadow-lg">
    <LazyLoadImage
      src={imageUrl}
      alt={name}
      effect="blur"
      width="100%"
      height="100%"
      className="w-full h-full object-cover"
    />
  </div>
);

export default BikeImage;