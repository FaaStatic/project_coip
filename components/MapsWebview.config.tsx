import { PositionLatLng } from '@untr/apps-coip/types/latlng.types';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import { useEffect, useRef } from 'react';
import { poinIcoBase64 } from '@untr/apps-coip/constants/dummyData.constants';

type MapsWebviewProp = {
  position: PositionLatLng;
};

const MapsWebview = ({ position }: MapsWebviewProp) => {
  const refWebview = useRef(null);

  const html_script = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Open Street Map</title>
  
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  
      <link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossorigin="" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
              integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
              crossorigin=""></script>
      <style>
          body {
              padding: 0;
              margin: 0;
          }
  
          html, body, #map {
              height: 100%;
              width: 100vw;
          }
      </style>
  </head>
  <body>
      <div id="map" style="width: 100%; height: 100vh;"></div>
  </body>
  </html>
`;

  const runWebView = `
  let map = L.map('map', { zoomControl: false, attributionControl: false });
   map.fitWorld();
   map.setView([${position.latitude},${position.longitude}], 18);
   let myAttrControl = L.control.attribution().addTo(map);
   myAttrControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');
 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 18,
      attribution: 'Data by©OpenStreetMap'
  }).addTo(map);
  
  let customIcon = L.icon({
          iconUrl: '${poinIcoBase64}',  
          iconSize: [48, 48],
          iconAnchor: [16, 32], 
          popupAnchor: [0, -32] 
        });
  
  L.marker([${position.latitude},${position.longitude}], {icon : customIcon}).addTo(map);
`;

  useEffect(() => {
    if (refWebview?.current) {
      refWebview?.current.reload();
      refWebview?.current?.injectJavaScript(runWebView);
    }
  }, [position]);

  return (
    <View className="relative overflow-hidden rounded-md flex-1">
      <WebView
        ref={refWebview}
        source={{ html: html_script }}
        javaScriptEnabled={true}
        mixedContentMode="always"
        cacheEnabled={false}
        allowFileAccessFromFileURLs={true}
        domStorageEnabled={true}
        injectedJavaScript={runWebView}
        forceDarkOn={false}
        allowFileAccess={true}
        originWhitelist={['*']}
      />
    </View>
  );
};

export default MapsWebview;
