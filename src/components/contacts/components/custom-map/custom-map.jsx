import { YMaps, Map, Placemark } from 'react-yandex-maps';

import MapPlacemarkIcon from '../../../../assets/img/contacts-map-icon.svg';

const MapConfig = {
  POSITION: [59.9684291067977, 30.317490006665444],
  ZOOM: 17,
  WIDTH: '649px',
  HEIGHT: '336px',
  ICON_POSITION: [59.96891729318544, 30.316948993578173],
  ICON_LAYOUT: 'default#image',
  ICON_PATH: MapPlacemarkIcon,
  ICON_SIZE: [56, 70],
  ICON_OFFSET: [56, 35],
};

const CustomMap = () => {
  return (
    <YMaps>
      <Map
        defaultState={{
          center: MapConfig.POSITION,
          zoom: MapConfig.ZOOM,
        }}
        width={MapConfig.WIDTH}
        height={MapConfig.HEIGHT}
      >
        <Placemark
          geometry={MapConfig.ICON_POSITION}
          defaultOptions={{
            iconLayout: MapConfig.ICON_LAYOUT,
            iconImageHref: MapConfig.ICON_PATH,
            iconImageSize: MapConfig.ICON_SIZE,
            iconImageOffset: MapConfig.ICON_OFFSET,
          }}
        />
      </Map>
    </YMaps>
  );
};

export default CustomMap;
