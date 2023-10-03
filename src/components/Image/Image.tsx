import * as React from 'react';
import { Blurhash } from 'react-blurhash';

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className: string;
  hash: string;
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  fit?: 'cover' | 'contain';
};

export const ImageWithBlur: React.FC<ImageProps> = ({ className, src, alt, ...rest }) => {
  const [show, setShow] = React.useState(false);
  return (
    <div>
      <img
        alt={alt}
        className={className}
        draggable="false"
        // loading="lazy"
        src={src}
        style={{ display: show ? 'flex' : 'none' }}
        onLoad={() => setShow(true)}
      />
      <Blurhash
        className={className}
        style={{
          display: show ? 'none' : 'flex',
          filter: 'contrast(40%) brightness(190%) opacity(70%)',
        }}
        {...rest}
      />
    </div>
  );
};
