function makeTerrainRGBProtocol( protocolName = 'terrainrgb' ){
  return async ( params, abortController ) => {
    const response = await fetch( params.url.replace( protocolName + '://', 'https://' ) );

    if( response.status === 200 ){
      const imageBitmap = await createImageBitmap( await response.blob() );
      const offscreenCanvas = new OffscreenCanvas(
      imageBitmap.width, imageBitmap.height );
      const ctx = offscreenCanvas.getContext( '2d' );

      ctx.drawImage( imageBitmap, 0, 0 );

      const imageData = ctx.getImageData( 0, 0, imageBitmap.width, imageBitmap.height );
      for ( let i = 0; i < imageData.data.length; i += 4 ) {
        let [ r, g, b, a ] = imageData.data.slice( i, i + 4 );
        if( a == 255 ){
          const m = ( r * 65536 + g * 256 + b ) * 0.1 - 10000;
          const n2 = Math.max( (m + 10000) * 10, 0 );
          imageData.data.set( [ 0xff & n2 >> 16, 0xff & n2 >> 8, 0xff & n2, a ], i );
        }
      }
      imageBitmap.close()
      ctx.putImageData( imageData, 0, 0 );
        return { data: await ( await offscreenCanvas.convertToBlob() ).arrayBuffer() };
      } else {    // タイルが存在しないときはこちらが処理される
      abortController.abort();
        return { data: null };    // 値を返さないとMapLibre GL JSがエラーを出す
      }
  }
};

export { makeTerrainRGBProtocol };

