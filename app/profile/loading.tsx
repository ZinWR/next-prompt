import { FC } from 'react';
import Image from "next/image";

interface loadingProps {};

const Loading: FC<loadingProps> = ({}) => {
  return (
    <div className='w-full flex-center'>
      <Image
        src='assets/icons/loader.svg'
        width={50}
        height={50}
        alt='loader'
        className='object-contain'
      />
    </div>
  );
};

export default Loading;