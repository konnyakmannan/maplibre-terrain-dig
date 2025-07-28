import { makeNumPngDemProtocol } 
		from 'https://datapng.gsj-seamless.jp/kansai/handson/sample/js/numPngDemProtocol.js'
import { makeTerrainRGBProtocol }
		from './terrainRGBProtcol.js'

const map = new maplibregl.Map( {
	container: 'map',					// コンテナ<div>要素のID
	center: [ 129.84935, 32.75352 ],	// 中心点の[ 経度, 緯度 ], 長崎市稲佐山山頂
	zoom: 13,							// ズームレベル
	maxZoom: 18,
    style: {
		version: 8,
		sources: {
			gsistd: {
        type: 'raster',
        tiles: [
            'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'
        ],
        attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html">'
        	+ '地理院タイル</a>',
        maxzoom: 18
      }, 
			nagasakidem: {
        type: 'raster-dem',
        tiles: [
          'terrainrgb://forestgeo.info/opendata/42_nagasaki/dem_terrainRGB_2022/{z}/{x}/{y}.png'
        ],
				attribution: '<a href="https://www.geospatial.jp/ckan/dataset/rinya-nagasaki-maptiles">長崎県・DEM（Terrain-RGB/2022）林野庁加工</a>',
          tileSize: 256,
          maxzoom: 18,
          },
      },
		layers: [
      {
        id: 'gsistd',
        type: 'raster',
        source: 'gsistd'
      }
    ],
    terrain: {
      source: 'nagasakidem',
      exaggeration: 1
    }
  },
  pitch: 45
} );

maplibregl.addProtocol( 'numpngdem', makeNumPngDemProtocol() );
maplibregl.addProtocol( 'terrainrgb', makeTerrainRGBProtocol() );

