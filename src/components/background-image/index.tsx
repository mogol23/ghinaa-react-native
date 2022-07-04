import React from 'react';
import { Image, View } from 'native-base';
import Assets from "../../assets";
import { viewport } from '../../helpers';
import { InterfaceImageProps } from 'native-base/lib/typescript/components/primitives/Image/types';

const index: React.FC<InterfaceImageProps> = (props) => {
  return (
    <>
      <View
        position={'absolute'}
        bg={'rgba(107,107,107,.2)'}
        width={viewport.width}
        height={viewport.height} />
      <Image
        source={Assets.images.Background}
        position="absolute"
        width={viewport.width}
        height={viewport.height}
        opacity={.5}
        {...props} />

    </>
  )
};

export default index;