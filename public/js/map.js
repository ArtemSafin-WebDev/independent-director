document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".js-map"));
  console.log("MAP ELEMNTS", elements);
  elements.forEach((element) => {
    ymaps.ready(initMap);
    function initMap() {
      console.log("MAP");
      const mapElement = element.querySelector(".js-map-element");

      console.log(mapElement);

      const center = element.getAttribute("data-center").split(",");
      const mobileCenter = element
        .getAttribute("data-mobile-center")
        .split(",");
      const coords = element.getAttribute("data-coords").split(",");
      const zoom = element.getAttribute("data-zoom");

      const pin = {
        iconLayout: "default#image",
        iconImageHref: element.hasAttribute("data-pin")
          ? element.getAttribute("data-pin")
          : "images/pin.svg",
        iconImageSize: !window.matchMedia("(max-width: 640px)").matches
          ? [110, 110]
          : [60, 60],
        iconImageOffset: !window.matchMedia("(max-width: 640px)").matches
          ? [-55, -110]
          : [-30, -60],
      };

      const mapInstance = new ymaps.Map(mapElement, {
        center: center,
        zoom: zoom ? zoom : 12,
        controls: [],
      });

      mapInstance.behaviors.disable("scrollZoom");

      const zoomControl = new ymaps.control.ZoomControl({
        options: {
          size: "small",
          position: {
            right: 10,
            bottom: 10,
          },
        },
      });
      mapInstance.controls.add(zoomControl);

      var objectManager = new ymaps.ObjectManager({
        geoObjectOpenBalloonOnClick: false,
        clusterize: false,
      });
      mapInstance.geoObjects.add(objectManager);

      const objectToAdd = {
        id: coords.join("-"),
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coords,
        },
        options: {
          ...pin,
          balloonShadow: false,
          hideIconOnBalloonOpen: false,
        },
      };

      objectManager.add(objectToAdd);

      const mql = window.matchMedia("(max-width: 640px)");

      const handleWidthChange = (e) => {
        if (e.matches) {
          mapInstance.setCenter(mobileCenter, zoom);
        } else {
          mapInstance.setCenter(center, zoom);
        }
      };

      mql.addEventListener("change", handleWidthChange);

      handleWidthChange(mql);
    }
  });
});
