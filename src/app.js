require('./style.css');

import {Deck} from '@deck.gl/core';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';

const PARCELS =
  'https://raw.githubusercontent.com/chris-sarli/building-age-map/main/data/pvd_parcels.geojson';
const PARKS = 
  'https://raw.githubusercontent.com/chris-sarli/building-age-map/main/data/parks-open-space.geojson';
const ROADS =
  'https://raw.githubusercontent.com/chris-sarli/building-age-map/main/data/roads.geojson';

var windowOffset = 0;
var topOffset = -0.015;
if (window.innerWidth > 632) {
  windowOffset = 0.02;
  topOffset = -0.005;
}

const INITIAL_VIEW_STATE = { 
  latitude: 41.8231 + topOffset,
  longitude: -71.4189 + (windowOffset),
  zoom: 12,
  bearing: 0,
  pitch: 0
};

function gett(e) {
  let p = e.properties;
  return [p.r, p.g, p.b, 255]
}

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

var f = true;

function getRoadColor(d) {
  let r = d.properties.ROADTYPE;
  if (r == 'INTERSTATE' || r == 'RAMP') {
    return [90, 90, 90, 255];
  }
  else if (r == 'STATE' || r == 'US') {
    return [80, 80, 80, 255];
  }
  return [60, 60, 60, 255];
}

function getRoadWidth(d) {
  let r = d.properties.ROADTYPE;
  if (r == 'INTERSTATE') {
    return 7;
  }
  else if (r == 'RAMP') {
    return 5;
  }
  else if (r == 'STATE' || r == 'US') {
    return 4;
  }
  return 2;
}

function deleteModal() {
  var element = document.getElementById("modal");
  if (element != undefined) {
     element.parentNode.removeChild(element); 
  }
}

var parcelLayer = new GeoJsonLayer({
  id: 'parcels',
  data: PARCELS,
  // Styles
  stroked: true,
  filled: true,
  lineWidthMinPixels: 0,
  opacity: 1,
  getLineColor: [0, 0, 0, 255],
  getLineWidth: 3,
  pickable: true,
  getFillColor: d => gett(d),
  onClick: (info, event) => openInNewTab("https://gis.vgsi.com/providenceri/Parcel.aspx?pid=" + info.object.properties.CAMAExtract_AV_PID),
  onDataLoad: (v, c) => deleteModal()
})

export const deck = new Deck({
  canvas: 'deck-canvas',
  initialViewState: INITIAL_VIEW_STATE,
  controller: {
    dragRotate: false,
    touchRotate: false,
    inertia: true
  },
  layers: [
    parcelLayer,
    new GeoJsonLayer({
      id: 'parks',
      data: PARKS,
      // Styles
      stroked: false,
      filled: true,
      opacity: 1,
      getFillColor: [0, 26, 17],
    }),
    new GeoJsonLayer({
      id: 'roads',
      data: ROADS,
      // Styles
      stroked: true,
      opacity: 1,
      lineWidthScale: 2,
      getLineColor: d => getRoadColor(d),
      getLineWidth: d => getRoadWidth(d)
    })
  ],
  getTooltip: ({object}) => object && "Year Built: " + object.properties.CAMAExtract_YearBuilt
});

// For automated test cases
/* global document */
document.body.style.margin = '0px';
document.body.style.background = 'black';