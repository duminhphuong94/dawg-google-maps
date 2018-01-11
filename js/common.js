function bubbleLoader() {
  var loaderParent = $("#pageLoaderParent");
  var bubbles = loaderParent.find(".bubble");
  var bubbleCount = bubbles.length;
  var intervalCount = 0;
  function startBubbleAni() {
    bubbles.removeClass("bubbleAnimate");
    bubbles.eq(intervalCount).addClass("bubbleAnimate");
    intervalCount += 1;
    if(intervalCount >= bubbleCount) {
      intervalCount = 0;
    }
    setTimeout(function() {
      startBubbleAni();
    }, 100);
  }
  startBubbleAni();
}

function restrictSiteScroll() {
  var siteContainer = $("#mainSiteBorder");
  var currentScrollPos = 0;
  currentScrollPos = $(window).scrollTop();
  siteContainer.addClass("restrictScroll");
  siteContainer.scrollTop(0);
  if(siteContainer.scrollTop() !== currentScrollPos) {
    siteContainer.scrollTop(currentScrollPos);
  }
}

function destroyRestrictSiteScroll() {
  var siteContainer = $("#mainSiteBorder");
  var YScrollPos = siteContainer.scrollTop();
  siteContainer.removeClass("restrictScroll");
  $(window).scrollTop(YScrollPos);
}

function generalBodyFunctionality() {
  var IOSStatus = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
  if(IOSStatus) {
    $("body").addClass("IOSClickableStatus");
  } 

  $(document).on("keyup", function(event) {
    if(event.keyCode === 27) {
      if($(".dawgModalUnit").length > 0) {
        var dawgModalUnit = $(".dawgModalUnit");
        dawgModalUnit.each(function(index, thisDawgModal) {
          if(!$(thisDawgModal).hasClass("hiddenTransform")) {
            $(thisDawgModal).find(".posContainer").addClass("hiddenTransform");
            setTimeout(function() {
              $(thisDawgModal).addClass("hiddenTransform");
              destroyRestrictSiteScroll();
            }, 350);
          }
        });
      }
    }
  });
}

function documentScrollPercent() {
  if($("#scrollBarEl").length > 0) {
    var scrollBarEl = $("#scrollBarEl");
    var percentScrolled = ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100;
    scrollBarEl.css({
      width: percentScrolled + "%"
    });
  }
}

function siteMenuFunctionality() {
  var menuParent = $("#dawgNavParent");
  var menuButton = menuParent.find("#menuButton");
  var siteModal = $("#dawgMenuModal");
  var menuDropDownLi = siteModal.find(".dropdownItem");

  menuButton.on("click", function() {
    var $this = $(this);
    var dataString = $this.attr("data-modalLink");
    $(dataString).removeClass("hiddenTransform");
    setTimeout(function() {
      $(dataString).find(".posContainer").removeClass("hiddenTransform");
      restrictSiteScroll();
    }, 350);
  });

  menuDropDownLi.on("click", function() {
    menuDropDownLi.find("ul").slideUp(350);
    var $this = $(this);
    $this.find("ul").slideDown(350);
  });
}

function toolTipFunctionality() {
  if($(window).innerWidth() > 1199 && $(".toolTipMessage").length > 0 && $(".sourceCode").length > 0) {
    $(".sourceCode").on("mouseover", function() {
      var $this = $(this);
      $this.parent().find(".toolTipMessage").removeClass("hiddenTransform");
    });

    $(".sourceCode").on("mouseout", function() {
      var $this = $(this);
      $this.parent().find(".toolTipMessage").addClass("hiddenTransform");
    });
  }
}

function dawgModalFunctionality() {
  if($(".dawgModalUnit").length > 0) {
    var sourceCodeElement = $(".sourceCode");
    var modalCloser = $(".dawgModalUnit").find(".closeButton");
    
    sourceCodeElement.on("click", function() {
      var $this = $(this);
      var dataString = $this.attr("data-modalLink");
      $(dataString).removeClass("hiddenTransform");
      setTimeout(function() {
        $(dataString).find(".posContainer").removeClass("hiddenTransform");
        restrictSiteScroll();
      }, 350);
    });

    modalCloser.on("click", function() {	
      var $this = $(this);
      $this.parent().find(".posContainer").addClass("hiddenTransform");
      setTimeout(function() {
        $this.parent().addClass("hiddenTransform");
        destroyRestrictSiteScroll();
      }, 350);
    });

    $(".dawgModalUnit").on("click", function(event) {
      var $this = $(this);
      if($(event.target).hasClass("dawgModalUnit") || $(event.target).hasClass("posContainer")) {
        $this.find(".closeButton").trigger("click");
      }
    });
  }
}

function googleMapsJsBasics() {
  if(document.location.href.indexOf("google-maps-js-basic-concepts") > -1) {
    (function basicCreation() {
      var locationCoords = new google.maps.LatLng(55.7558, 37.6173);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        center: locationCoords,
        zoom: 12
      });
    })();

    (function satelliteMap() {
      var locationCoords = new google.maps.LatLng(40.4168, -3.7038);
      var map = new google.maps.Map(document.getElementById("gMap2"), {
        center: locationCoords,
        zoom: 15,
        mapTypeId: "satellite"
      });
    })();
    
    (function hybridMap() {
      var locationCoords = new google.maps.LatLng(41.9028, 12.4964);
      var map = new google.maps.Map(document.getElementById("gMap3"), {
        center: locationCoords,
        zoom: 15,
        mapTypeId: "hybrid"
      });
    })();
    
    (function terrainMap() {
      var locationCoords = new google.maps.LatLng(19.4326, -99.1332);
      var map = new google.maps.Map(document.getElementById("gMap4"), {
        center: locationCoords,
        zoom: 11,
        mapTypeId: "terrain"
      });
    })();
    
    (function rotatingImagery() {
      var locationCoords = new google.maps.LatLng(40.7829, -73.9654);
      var map = new google.maps.Map(document.getElementById("gMap5"), {
        center: locationCoords,
        zoom: 18,
        mapTypeId: "hybrid",
        tilt: 45,
        heading: 90
      });

      function autoRotation() {
        if(map.getTilt !== 0) {
          var mapCurrentHeading = map.getHeading() || 0;
          map.setHeading(mapCurrentHeading + 90);
        }
      }
      setInterval(autoRotation, 5000);
    })();

    (function customBaseMapType() {
      var locationCoords = new google.maps.LatLng(28.6139, 77.2090);
      var map = new google.maps.Map(document.getElementById("gMap6"), {
        center: locationCoords,
        zoom: 15,
        mapTypeId: "terrain"
      });

      function CustomMapType(tileSize) {
        this.tileSize = tileSize;
      }
      CustomMapType.prototype.maxZoom = 19;
      CustomMapType.prototype.name = "Example Custom Name";
      CustomMapType.prototype.alt = "This is an example tutorial map type creation";
      CustomMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        var gridElement = ownerDocument.createElement("div");
        gridElement.innerHTML = coord;
        gridElement.style.width = this.tileSize.width + "px";
        gridElement.style.height = this.tileSize.height + "px";
        gridElement.style.fontSize = "16px";
        gridElement.style.fontWeight = "600";
        gridElement.style.border = "2px solid #ec0000";
        gridElement.style.background = "#efefef";
        return gridElement;
      };

      map.setMapTypeId("gridbox");
      map.mapTypes.set("gridbox", new CustomMapType(new google.maps.Size(256, 256)));
    })();

    (function customOverlayMapType() {
      var locationCoords = new google.maps.LatLng(71.7069, -42.6043);
      var map = new google.maps.Map(document.getElementById("gMap7"), {
        center: locationCoords,
        zoom: 3,
        mapTypeId: "terrain"
      });

      function CustomOverlay(tileSize) {
        this.tileSize = tileSize;
      }
      CustomOverlay.prototype.getTile = function(coord, zoom, ownerDocument) {
        var gridElement = ownerDocument.createElement("div");
        gridElement.innerHTML = coord;
        gridElement.style.width = this.tileSize.width + "px";
        gridElement.style.height = this.tileSize.height + "px";
        gridElement.style.fontSize = "16px";
        gridElement.style.fontWeight = "600";
        gridElement.style.border = "2px solid #ec0000";
        gridElement.style.background = "transparent";
        return gridElement;
      };

      map.overlayMapTypes.insertAt(0, new CustomOverlay(new google.maps.Size(256, 256)));
    })();
  }
}

function googleMapsLocalizing() {
  if(document.location.href.indexOf("map-localizing") > -1) {
    (function mapLocalizing1() {
      var locationCoords = new google.maps.LatLng(28.6139, 77.2090);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        center: locationCoords,
        zoom: 14,
        mapTypeId: "terrain"
      });
    })();
  }
}

function googlePlacesLibraryFunc() {
  if(document.location.href.indexOf("google-places-api-js") > -1) {
    (function nearbySearchRequest1() {
      var location1 = new google.maps.LatLng(35.6895, 139.6917);
      var map1 = new google.maps.Map(document.getElementById("gMap1"), {
        center: location1,
        zoom: 13
      });
      var service = new google.maps.places.PlacesService(map1);
      service.nearbySearch({
        location: location1,
        radius: 200,
        type: ["restaurant"]
      }, resultCallback);

      function resultCallback(results, status) {
        if(status === google.maps.places.PlacesServiceStatus.OK) {
          Array.prototype.forEach.call(results, function(thisValue, index) {
            createMarker(thisValue);
          });
        }
        else {
          console.error("Google Places API - Service 1 Error, please check", status);
        }
      }

      function createMarker(locationObj) {
        var marker = new google.maps.Marker({
          map: map1,
          position: locationObj.geometry.location
        });
      }
    })();

    (function nearbySearchRequest2() {
      var location2 = new google.maps.LatLng(35.6895, 139.6917);
      var map2 = new google.maps.Map(document.getElementById("gMap2"), {
        center: location2,
        zoom: 13
      });
      var service = new google.maps.places.PlacesService(map2);
      service.nearbySearch({
        location: location2,
        radius: 600,
        type: ["restaurant"],
        keyword: "russian",
        openNow: true,
      }, resultCallback);

      function resultCallback(results, status) {
        if(status === google.maps.places.PlacesServiceStatus.OK) {
          Array.prototype.forEach.call(results, function(thisValue, index) {
            createMarker(thisValue);
          });
        }
      }

      function createMarker(locationObj) {
        var marker = new google.maps.Marker({
          map: map2,
          position: locationObj.geometry.location
        });
      }
    })();
    
    (function nearbySearchRequest3() {
      var location3 = new google.maps.LatLng(35.6895, 139.6917);
      var map3 = new google.maps.Map(document.getElementById("gMap3"), {
        center: location3,
        zoom: 13
      });
      var service = new google.maps.places.PlacesService(map3);
      service.nearbySearch({
        location: location3,
        radius: 600,
        type: ["restaurant"],
        keyword: "indian restaurant",
        openNow: false,
        minPriceLevel: 4,
        maxPriceLevel: 4
      }, resultCallback);

      function resultCallback(results, status) {
        if(status === google.maps.places.PlacesServiceStatus.OK) {
          Array.prototype.forEach.call(results, function(thisValue, index) {
            createMarker(thisValue);
          });
        }
      }

      function createMarker(locationObj) {
        var marker = new google.maps.Marker({
          map: map3,
          position: locationObj.geometry.location
        });
      }
    })();
    
    (function nearbySearchRequest4() {
      var location4 = new google.maps.LatLng(28.5383, -81.3792);
      var map4 = new google.maps.Map(document.getElementById("gMap4"), {
        center: location4,
        zoom: 15,
      });
      var service = new google.maps.places.PlacesService(map4);
      service.nearbySearch({
        location: location4,
        radius: 600,
        type: ["restaurant"],
        openNow: false,
        name: "subway"
      }, resultCallback);

      function resultCallback(results, status) {
        if(status === google.maps.places.PlacesServiceStatus.OK) {
          Array.prototype.forEach.call(results, function(thisValue, index) {
            createMarker(thisValue);
          });
        }
      }

      function createMarker(locationObj) {
        var marker = new google.maps.Marker({
          map: map4,
          position: locationObj.geometry.location
        });
      }
    })();
    
    (function nearbySearchRequest5() {
      var location5 = new google.maps.LatLng(28.5383, -81.3792);
      var map5 = new google.maps.Map(document.getElementById("gMap5"), {
        center: location5,
        zoom: 15,
      });
      var service = new google.maps.places.PlacesService(map5);
      service.nearbySearch({
        location: location5,
        type: ["restaurant"],
        openNow: false,
        keyword: "burger",
        name: "burger",
        rankBy: google.maps.places.RankBy.DISTANCE,
      }, resultCallback);

      function resultCallback(results, status) {
        if(status === google.maps.places.PlacesServiceStatus.OK) {
          var parentList = $("#rankByResults");
          Array.prototype.forEach.call(results, function(thisValue, index) {
            if(index <= 5) {
              var createThisLi = $("<li></li>");
              var locationName = thisValue.name;
              createThisLi.text(thisValue.name).appendTo(parentList);
              createMarker(thisValue);
            }
          });
        }
      }

      function createMarker(locationObj) {
        var marker = new google.maps.Marker({
          map: map5,
          position: locationObj.geometry.location
        });
      }
    })();

    (function textSearchRequest1() {
      var location6 = new google.maps.LatLng(51.5074, -0.1278);
      var map6 = new google.maps.Map(document.getElementById("gMap6"), {
        center: location6,
        zoom: 12
      });

      var service = new google.maps.places.PlacesService(map6);
      service.textSearch({
        query: "indian restaurants in paris",
      }, resultCallback);

      function resultCallback(results, status) {
        if(status === google.maps.places.PlacesServiceStatus.OK) {
          var listParent = $("#gMap6").parent().parent().find(".resultsUI");
          map6.setCenter(results[0].geometry.location);
          Array.prototype.forEach.call(results, function(locationObj, index) {
            if(index <= 6) {
              createMarker(locationObj);
              var liElement = $("<li></li>");
              liElement.text(locationObj.name).appendTo(listParent);
            }
          });
        }
      }

      function createMarker(locationObj) {
        var marker = new google.maps.Marker({
          map: map6,
          position: locationObj.geometry.location
        });
      }
    })();
    
    (function textSearchRequest2() {
      var location7 = new google.maps.LatLng(51.5074, -0.1278);
      var map7 = new google.maps.Map(document.getElementById("gMap7"), {
        center: location7,
        zoom: 12
      });

      var service = new google.maps.places.PlacesService(map7);
      service.textSearch({
        query: "mcdonalds restaurant in chennai, tamilnadu",
        openNow: true
      }, resultCallback);

      function resultCallback(results, status) {
        if(status === google.maps.places.PlacesServiceStatus.OK) {
          var listParent = $("#gMap7").parent().parent().find(".resultsUI");
          map7.setCenter(results[0].geometry.location);
          map7.setZoom(11);
          Array.prototype.forEach.call(results, function(locationObj, index) {
            if(index <= 6) {
              createMarker(locationObj);
              var liElement = $("<li></li>");
              liElement.html("<b>" + locationObj.name + "</b>" + "-" + locationObj.formatted_address).appendTo(listParent);
            }
          });
        }
      }

      function createMarker(locationObj) {
        var marker = new google.maps.Marker({
          map: map7,
          position: locationObj.geometry.location
        });
      }
    })();
    
    (function textSearchRequest3() {
      var location8 = new google.maps.LatLng(51.5074, -0.1278);
      var map8 = new google.maps.Map(document.getElementById("gMap8"), {
        center: location8,
        zoom: 12
      });

      var service = new google.maps.places.PlacesService(map8);
      service.textSearch({
        query: "Hotels in Florida",
        type: ["restaurant"],
        minPriceLevel: 3,
        maxPriceLevel: 4,
      }, resultCallback);

      function resultCallback(results, status) {
        if(status === google.maps.places.PlacesServiceStatus.OK) {
          var listParent = $("#gMap8").parent().parent().find(".resultsUI");
          map8.setCenter(results[0].geometry.location);
          map8.setZoom(11);
          Array.prototype.forEach.call(results, function(locationObj, index) {
            if(index <= 6) {
              createMarker(locationObj);
              var liElement = $("<li></li>");
              liElement.html("<b>" + locationObj.name + "</b>" + "-" + locationObj.formatted_address).appendTo(listParent);
            }
          });
        }
        else {
          console.error("Service Status Error: " + status);
        }
      }

      function createMarker(locationobj) {
        var marker = new google.maps.Marker({
          map: map8,
          position: locationobj.geometry.location
        });
      }
    })();

    (function placesResultsObject() {
      var location9 = new google.maps.LatLng(36.1699, -115.1398);
      var map9 = new google.maps.Map(document.getElementById("gMap9"), {
        center: location9,
        zoom: 13
      });
      var service = new google.maps.places.PlacesService(map9);
      service.textSearch({
        query: "Caesars Place, Las Vegas NV",
      }, resultCallback);

      function resultCallback(result, status) {
        if(status === google.maps.places.PlacesServiceStatus.OK) {
          createMarker(result[0]);
          map9.setCenter(result[0].geometry.location);
          map9.setZoom(18);
          var listParent = $("#gMap9").parent().find(".objectResultList");
    
          var nameLi = $("<li></li>").html("<b>Name:</b> " + result[0].name);
          nameLi.appendTo(listParent);

          var addressLi = $("<li></li>").html("<b>Address:</b> " + result[0].formatted_address);
          addressLi.appendTo(listParent);

          var latLngLi = $("<li></li>").html("<b>Latitude-Longitude Coordinates:</b> " + result[0].geometry.location.lat() + "-" + result[0].geometry.location.lng());
          latLngLi.appendTo(listParent);

          var iconLi = $("<li></li>").html("<b>Icon:</b> " + "<img src=" + result[0].icon + " class='img-responsive resultIcon' alt='icon' title='icon'/>");
          iconLi.appendTo(listParent);

          var ratingLi = $("<li></li>").html("<b>Rating</b> " + result[0].rating);
          ratingLi.appendTo(listParent);

          var placeIdLi = $("<li></li>").html("<b>Place_ID:</b> " + result[0].place_id);
          placeIdLi.appendTo(listParent);

          var typesArrayString = result[0].types;
          var typesString = "";
          Array.prototype.forEach.call(typesArrayString, function(stringValue, q) {
            typesString += (typesString === "") ? stringValue : ", " + stringValue;
          });
          var typesLi = $("<li></li>").html("<b>Type</b> " + typesString);
          typesLi.appendTo(listParent);
        }
        else {
          console.error("Service Request Error", status);
        }
      }

      function createMarker(locationObj) {
        var marker = new google.maps.Marker({
          map: map9,
          position: locationObj.geometry.location
        });
      }
    })();
    
    (function placesPaginationHandling() {
      var location10 = new google.maps.LatLng(36.1699, -115.1398);
      var map10 = new google.maps.Map(document.getElementById("gMap10"), {
        center: location10,
        zoom: 12
      });
      
      var service = new google.maps.places.PlacesService(map10);
      service.textSearch({
        query: "Pawn Shops in Las Vegas, NV"
      }, resultCallback);

      var pageNumber = 1;
      function resultCallback(result, status, pagination) {
        if(status === google.maps.places.PlacesServiceStatus.OK) {
          var toBeClonedParent = $("#paginationClone");
          var cloneParent = toBeClonedParent.clone();
          cloneParent.find(".headingSegment").text("Page Number: " + pageNumber);
          Array.prototype.forEach.call(result, function(thisObj, index) {
            createMarker(thisObj);
            var borderBox = $("#borderBoxClone").clone();
            borderBox.find(".headerIcon").attr("src", thisObj.icon);
            borderBox.find(".establishmentName").text(thisObj.name);
            var openStatusEl = borderBox.find(".openStatus");
            if(!thisObj.opening_hours.open_now) {
              openStatusEl.text("Open")
            }
            else {
              openStatusEl.addClass("closedStatus").text("Closed");
            }
            borderBox.find(".latlngValue").text(Number.prototype.toPrecision.call(thisObj.geometry.location.lat(), 4) + " | " + Number.prototype.toPrecision.call(thisObj.geometry.location.lng(), 4));
            var categoryElement = borderBox.find(".typesValue");
            var catString = "";
            Array.prototype.forEach.call(thisObj.types, function(typeString, q) {
              catString += (catString === "") ? typeString : ", " + typeString;
            });
            categoryElement.text(catString);
            borderBox.find(".ratingValue").text(thisObj.rating);
            borderBox.removeAttr("id").removeClass("hide");
            borderBox.appendTo(cloneParent.find(".bodySegment"));
            if((index + 1) % 2 === 0) {
              $('<div class="clearfix hidden-xs"></div>').appendTo(cloneParent.find(".bodySegment"));
            }
          });
          cloneParent.removeClass("hide").removeAttr("id").appendTo($("#gMap10").parent());
          pageNumber += 1;
          if(pagination.hasNextPage) {
            $("#gMap10").parent().find(".loadMoreButton").on("click", function() {
              $("#gMap10").parent().find(".errorMessage").addClass("hide");
              pagination.nextPage();
            });
          }
        }
        else {
          var errorElement = $("#gMap10").parent().find(".errorMessage");
          errorElement.find("span").text("Error Message from API Request Made: " + "Service Request Error - " + status);
          errorElement.removeClass("hide");
          console.error("Service Request Error", status);
        }
      }

      function createMarker(locationObj) {
        var marker = new google.maps.Marker({
          map: map10,
          position: locationObj.geometry.location
        });
      }
    })();

    (function placesDetailHandling() {
      var location11 = new google.maps.LatLng(19.0760, 72.8777);
      var map11 = new google.maps.Map(document.getElementById("gMap11"), {
        center: location11,
        zoom: 12
      });
      var requestObject = {
        query: "Taj Mahal Palace and Towers hotel, Mumbai",
      };

      var service = new google.maps.places.PlacesService(map11);
      service.textSearch(requestObject, requestCallBack);
      
      function requestCallBack(resultArray, status) {
        if(status === google.maps.places.PlacesServiceStatus.OK) {
          map11.setZoom(18);
          map11.setCenter(resultArray[0].geometry.location);
          Array.prototype.forEach.call(resultArray, function(locationObj, index) {
            service.getDetails({
              placeId: locationObj.place_id
            }, processGooglePlaceId);
            createMarker(locationObj);
          });
        }
        else {
          console.error("Service Request Error, Status => ", status); 
        }
      }

      function processGooglePlaceId(result, status) {
        var parentElement = $("#placesDetailedDiv");
        if(status === google.maps.places.PlacesServiceStatus.OK) {
          var borderBoxClone = $("#placesBorderBoxClone").clone();
          borderBoxClone.find(".establishmentName").text(result.name);
          borderBoxClone.find(".headearIcon").attr("src", result.icon);
         
          if(result.opening_hours) {
            var openString = (result.opening_hours.open_now) ? "Open" : "Closed";
            if(openString === "Open") {
              borderBoxClone.find(".openStatus").text(openString);
            }
            else {
              borderBoxClone.find(".openStatus").addClass("closedStatus").text(openString);
            }
          }

          borderBoxClone.find(".address").text(result.formatted_address);
          borderBoxClone.find(".latlngValue").text(result.geometry.location.lat() + " - " + result.geometry.location.lng());
          var typeString = "";
          Array.prototype.forEach.call(result.types, function(typeData, index) {
            typeString += (typeString === "") ? typeData : " ," + typeData;
          });
          borderBoxClone.find(".typesValue").text(typeString);
          borderBoxClone.find(".ratingValue").text(result.rating);
          borderBoxClone.find(".intPhoneNumber").text(result.international_phone_number);
          borderBoxClone.find(".vicinityName").text(result.vicinity);
          borderBoxClone.find(".websiteUrl").attr("href", result.website);
          borderBoxClone.find(".utcOffsetData").text(result.utc_offset);

          Array.prototype.forEach.call(result.reviews, function(reviewObj, index) {
            var reviewClone = $("#reviewParentClone").clone();
            reviewClone.find(".profilePhoto").attr("src", reviewObj.profile_photo_url);
            reviewClone.find(".authorName").text(reviewObj.author_name);
            reviewClone.find(".authorLanguage").text(reviewObj.language);
            reviewClone.find(".authorRating").text(reviewObj.rating);
  
            var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var timeStamp = new Date(reviewObj.time * 1000);
            var thisDate = timeStamp.getDate();
            var thisMonth = monthArray[timeStamp.getMonth()];
            var thisYear = timeStamp.getFullYear();
            var thisHours = timeStamp.getHours();
            var thisMinutes = timeStamp.getMinutes();
            var thisSeconds = timeStamp.getSeconds();
            var timeString = thisDate + "-" + thisMonth + "-" + thisYear + " @ " + thisHours + ":" + thisMinutes + ":" + thisSeconds + "hrs"; 
            reviewClone.find(".authorTimeStamp").text(timeString + " " + "(" + reviewObj.relative_time_description + ")");
            reviewClone.find(".authorDescription").text(reviewObj.text);
            reviewClone.removeClass("hide").removeAttr("id");
            reviewClone.appendTo(borderBoxClone.find(".content"));
          });

          borderBoxClone.removeClass("hide").removeAttr("id");
          borderBoxClone.appendTo(parentElement.find(".bodySegment"));

          var photoArray = result.photos;
          if(photoArray) {
            var photoParent = $("#photosDiv");
            Array.prototype.forEach.call(photoArray, function(photoObj, index) {
              var photoUrl = photoObj.getUrl({"maxWidth": 400});
              var imageTag = $('<img class="img-responsive"/>');
              imageTag.attr("src", photoUrl);
              imageTag.appendTo(photoParent);
              if((index + 1) % 2 === 0) {
                $('<div class="clearfix"></div>').appendTo(photoParent);
              }
            });
          }
          else {
            console.error("Service Request Error, Photos are not available for result");
          }
        }
        else {
          console.error("Place ID Request Error => ", status);
        }
      }
      
      function createMarker(locationobj) {
        var marker = new google.maps.Marker({
          map: map11,
          position: locationobj.geometry.location
        });
      }
    })();
  }
}

function stylingYourGoogleMaps() {
  if(document.location.href.indexOf("styling-your-map") > -1) {
    (function defaultStyling() {
      var locationCoords = new google.maps.LatLng(-33.8688, 151.2093);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        center: locationCoords,
        zoom: 15,
        mapTypeId: "roadmap",
      });
    })();

    (function silverStyleMode() {
      var locationCoords = new google.maps.LatLng(-33.8688, 151.2093);
      var gSilverStyledMap = new google.maps.StyledMapType(
				[
					{
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#f5f5f5"
							}
						]
					},
					{
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#616161"
							}
						]
					},
					{
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#f5f5f5"
							}
						]
					},
					{
						"featureType": "administrative.land_parcel",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#bdbdbd"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#eeeeee"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#757575"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#e5e5e5"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#9e9e9e"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#ffffff"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#757575"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#dadada"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#616161"
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#9e9e9e"
							}
						]
					},
					{
						"featureType": "transit.line",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#e5e5e5"
							}
						]
					},
					{
						"featureType": "transit.station",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#eeeeee"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#c9c9c9"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#9e9e9e"
							}
						]
					}
				], {name: "gSilverMap"});
      var map = new google.maps.Map(document.getElementById("gMap2"), {
        center: locationCoords,
        zoom: 15,
        mapTypeId: "roadmap",
      });

			map.mapTypes.set("gSilver", gSilverStyledMap);
			map.setMapTypeId("gSilver");
    })();
    
		(function retroStyleMode() {
      var locationCoords = new google.maps.LatLng(-33.8688, 151.2093);
      var gRetroStyledMap = new google.maps.StyledMapType(
				[
					{
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#ebe3cd"
							}
						]
					},
					{
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#523735"
							}
						]
					},
					{
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#f5f1e6"
							}
						]
					},
					{
						"featureType": "administrative",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#c9b2a6"
							}
						]
					},
					{
						"featureType": "administrative.land_parcel",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#dcd2be"
							}
						]
					},
					{
						"featureType": "administrative.land_parcel",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#ae9e90"
							}
						]
					},
					{
						"featureType": "landscape.natural",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#dfd2ae"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#dfd2ae"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#93817c"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#a5b076"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#447530"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#f5f1e6"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#fdfcf8"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#f8c967"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#e9bc62"
							}
						]
					},
					{
						"featureType": "road.highway.controlled_access",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#e98d58"
							}
						]
					},
					{
						"featureType": "road.highway.controlled_access",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#db8555"
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#806b63"
							}
						]
					},
					{
						"featureType": "transit.line",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#dfd2ae"
							}
						]
					},
					{
						"featureType": "transit.line",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#8f7d77"
							}
						]
					},
					{
						"featureType": "transit.line",
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#ebe3cd"
							}
						]
					},
					{
						"featureType": "transit.station",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#dfd2ae"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#b9d3c2"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#92998d"
							}
						]
					}
				], {name: "gRetroMap"});
      var map = new google.maps.Map(document.getElementById("gMap3"), {
        center: locationCoords,
        zoom: 15,
        mapTypeId: "roadmap",
      });

			map.mapTypes.set("gRetro", gRetroStyledMap);
			map.setMapTypeId("gRetro");
    })();
		
		(function darkStyleMode() {
      var locationCoords = new google.maps.LatLng(-33.8688, 151.2093);
      var gDarkStyledMap = new google.maps.StyledMapType(
				[
					{
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#212121"
							}
						]
					},
					{
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#757575"
							}
						]
					},
					{
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#212121"
							}
						]
					},
					{
						"featureType": "administrative",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#757575"
							}
						]
					},
					{
						"featureType": "administrative.country",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#9e9e9e"
							}
						]
					},
					{
						"featureType": "administrative.land_parcel",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "administrative.locality",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#bdbdbd"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#757575"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#181818"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#616161"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#1b1b1b"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#2c2c2c"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#8a8a8a"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#373737"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#3c3c3c"
							}
						]
					},
					{
						"featureType": "road.highway.controlled_access",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#4e4e4e"
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#616161"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#757575"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#000000"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#3d3d3d"
							}
						]
					}
				], {name: "gDarkMap"});
      var map = new google.maps.Map(document.getElementById("gMap4"), {
        center: locationCoords,
        zoom: 15,
        mapTypeId: "roadmap",
      });

			map.mapTypes.set("gDark", gDarkStyledMap);
			map.setMapTypeId("gDark");
    })();
		
		(function nightStyleMode() {
      var locationCoords = new google.maps.LatLng(-33.8688, 151.2093);
      var gNightStyledMap = new google.maps.StyledMapType(
				[
					{
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#242f3e"
							}
						]
					},
					{
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#746855"
							}
						]
					},
					{
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#242f3e"
							}
						]
					},
					{
						"featureType": "administrative.locality",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#d59563"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#d59563"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#263c3f"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#6b9a76"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#38414e"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#212a37"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#9ca5b3"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#746855"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#1f2835"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#f3d19c"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#2f3948"
							}
						]
					},
					{
						"featureType": "transit.station",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#d59563"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#17263c"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#515c6d"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#17263c"
							}
						]
					}
				], {name: "gNightMap"});
      var map = new google.maps.Map(document.getElementById("gMap5"), {
        center: locationCoords,
        zoom: 15,
        mapTypeId: "roadmap",
      });

			map.mapTypes.set("gNight", gNightStyledMap);
			map.setMapTypeId("gNight");
    })();
		
		(function aubergineStyleMode() {
      var locationCoords = new google.maps.LatLng(-33.8688, 151.2093);
      var gAubergineStyledMap = new google.maps.StyledMapType(
				[
					{
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#1d2c4d"
							}
						]
					},
					{
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#8ec3b9"
							}
						]
					},
					{
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#1a3646"
							}
						]
					},
					{
						"featureType": "administrative.country",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#4b6878"
							}
						]
					},
					{
						"featureType": "administrative.land_parcel",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#64779e"
							}
						]
					},
					{
						"featureType": "administrative.province",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#4b6878"
							}
						]
					},
					{
						"featureType": "landscape.man_made",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#334e87"
							}
						]
					},
					{
						"featureType": "landscape.natural",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#023e58"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#283d6a"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#6f9ba5"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#1d2c4d"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#023e58"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#3C7680"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#304a7d"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#98a5be"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#1d2c4d"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#2c6675"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#255763"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#b0d5ce"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#023e58"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#98a5be"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#1d2c4d"
							}
						]
					},
					{
						"featureType": "transit.line",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#283d6a"
							}
						]
					},
					{
						"featureType": "transit.station",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#3a4762"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#0e1626"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#4e6d70"
							}
						]
					}
				], {name: "gAubergineMap"});
      var map = new google.maps.Map(document.getElementById("gMap6"), {
        center: locationCoords,
        zoom: 15,
        mapTypeId: "roadmap",
      });

			map.mapTypes.set("gAubergine", gAubergineStyledMap);
			map.setMapTypeId("gAubergine");
    })();
		
    (function myCustomStyleMode() {
      var locationCoords = new google.maps.LatLng(-33.8688, 151.2093);
      var myStyledMap = new google.maps.StyledMapType(
				[
					{
						"featureType": "landscape.natural",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#6dff7f"
							},
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "landscape.natural.terrain",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#a73d2a"
							},
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#57532b"
							},
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#6aa278"
							},
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#ff6300"
							},
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "road.highway.controlled_access",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#ff0082"
							},
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#3f3f3f"
							},
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#32cadd"
							},
							{
								"visibility": "on"
							}
						]
					}
				], {name: "myCustomStyleMap"});
      var map = new google.maps.Map(document.getElementById("gMap7"), {
        center: locationCoords,
        zoom: 15,
        mapTypeId: "roadmap",
      });

			map.mapTypes.set("myStyle", myStyledMap);
			map.setMapTypeId("myStyle");
    })();
  }
}

function googleMapMarkersAndInfoWindow() {
  if(document.location.href.indexOf("map-markers") > -1) {
    (function createMarker() {
      var locationCoords = new google.maps.LatLng(19.8968, -155.5828);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        center: locationCoords,
        zoom: 7,
      });
      var marker = new google.maps.Marker({
        map: map,
        position: map.getCenter(),
        title: "This is an Example Marker"
      });
    })();

    (function dynamicMarkerPlacement() {
      var locationCoords = new google.maps.LatLng(19.8968, -155.5828);
      var map = new google.maps.Map(document.getElementById("gMap2"), {
        center: locationCoords,
        zoom: 7,
      });
      var honolulu = new google.maps.LatLng(21.3069, -157.8583);
      var kilauea = new google.maps.LatLng(19.4069, -155.2834);
      var kihei = new google.maps.LatLng(20.7644, -156.4450);
      var hilo = new google.maps.LatLng(19.7071, -155.0885);
      var markerArray = [];
      var marker1 = new google.maps.Marker({
        position: honolulu,
      });
      Array.prototype.push.call(markerArray, marker1);
      var marker2 = new google.maps.Marker({
        position: kilauea,
      });
      Array.prototype.push.call(markerArray, marker2);
      var marker3 = new google.maps.Marker({
        position: kihei,
      });
      Array.prototype.push.call(markerArray, marker3);
      var marker4 = new google.maps.Marker({
        position: hilo,
      });
      Array.prototype.push.call(markerArray, marker4);

      var count = 0;
      function startMarkerPlacement() {
        Array.prototype.forEach.call(markerArray, function(markerObj, index) {
          markerObj.setAnimation(null);
          markerObj.setMap(null);
        });
        if(!markerArray[count].getAnimation() || markerArray[count].getAnimation() === null) {
          markerArray[count].setAnimation(google.maps.Animation.BOUNCE);
        }
        markerArray[count].setMap(map);
        count += 1;
        if(count < markerArray.length) {
          setTimeout(startMarkerPlacement, 3000);
        }
        else {
          count = 0;
          setTimeout(startMarkerPlacement, 3000);
        }
      }
      startMarkerPlacement();
    })();
    
    (function markerLabel() {
      var locationCoords = new google.maps.LatLng(19.8968, -155.5828);
      var map = new google.maps.Map(document.getElementById("gMap3"), {
        center: locationCoords,
        zoom: 7,
      });
      var honolulu = new google.maps.LatLng(21.3069, -157.8583);
      var marker = new google.maps.Marker({
        position: honolulu,
        label: "H",
        map: map,
      });
    })();

    (function markerLabelSimpleIcons() {
      var locationCoords = new google.maps.LatLng(19.8968, -155.5828);
      var map = new google.maps.Map(document.getElementById("gMap4"), {
        center: locationCoords,
        zoom: 7,
      });
      var honolulu = new google.maps.LatLng(21.3069, -157.8583);
      var wLocationOrigin = window.location.origin;
      var baseUrl = "/dawg-google-maps";
      var imageUrl = wLocationOrigin + baseUrl + "/assets/images/hawaii.png";
      var marker = new google.maps.Marker({
        position: honolulu,
        map: map,
        icon: imageUrl,
        animation: google.maps.Animation.BOUNCE
      });
    })();
    
    (function markerLabelDraggable() {
      var locationCoords = new google.maps.LatLng(19.8968, -155.5828);
      var map = new google.maps.Map(document.getElementById("gMap5"), {
        center: locationCoords,
        zoom: 7,
      });
      var honolulu = new google.maps.LatLng(21.3069, -157.8583);
      var wLocationOrigin = window.location.origin;
      var baseUrl = "/dawg-google-maps";
      var imageUrl = wLocationOrigin + baseUrl + "/assets/images/hawaii.png";
      var marker = new google.maps.Marker({
        position: honolulu,
        map: map,
        icon: imageUrl,
        draggable: true
      });
    })();

    (function infoWindowBasic() {
      var locationCoords = new google.maps.LatLng(19.8968, -155.5828);
      var map = new google.maps.Map(document.getElementById("gMap6"), {
        center: locationCoords,
        zoom: 7,
      });
      var marker = new google.maps.Marker({
        position: locationCoords,
        map: map
      });
      var basicInfoWindow = new google.maps.InfoWindow({
        maxWidth: 300,
        content: "Hawaii, a U.S. state, is an isolated volcanic archipelago in the Central Pacific. Its islands are renowned for their rugged landscapes of cliffs, waterfalls, tropical foliage and beaches with gold, red, black and even green sands. Of the 6 main islands, Oahu has Hawaii’s biggest city and capital, Honolulu, home to crescent Waikiki Beach and Pearl Harbor's WWII memorials.",
      });
      marker.addListener("click", function() {
        basicInfoWindow.open(map, marker);
      });
    })();
  }
}

function googleMapControlsAndEvents() {
  if(document.location.href.indexOf("map-controls-and-events") > -1) {
    (function disableDefaultUI() {
      var locationCoords = new google.maps.LatLng(30.2672, -97.7431);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        center: locationCoords,
        zoom: 14,
        disableDefaultUI: true
      });
    })();

    (function modifyingMapTypeControls() {
      var locationCoords = new google.maps.LatLng(30.2672, -97.7431);
      var map = new google.maps.Map(document.getElementById("gMap2"), {
        center: locationCoords,
        zoom: 14,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        }
      });
    })();
    
    (function mapControlsPositioning() {
      var locationCoords = new google.maps.LatLng(30.2672, -97.7431);
      var map = new google.maps.Map(document.getElementById("gMap3"), {
        center: locationCoords,
        zoom: 14,
				zoomControl: true,
				zoomControlOptions: {
					position: google.maps.ControlPosition.BOTTOM_LEFT
				},
				mapTypeControl: true,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position: google.maps.ControlPosition.TOP_RIGHT,
				},
				streetViewControl: true,
				streetViewControlOptions: {
					position: google.maps.ControlPosition.LEFT_TOP,
				},
				rotateControl: true,
				rotateControlOptions: {
					position: google.maps.ControlPosition.LEFT_CENTER
				},
				fullscreenControl: true,
				fullscreenControlOptions: {
					position: google.maps.ControlPosition.RIGHT_CENTER,
				},
      });
    })();
    
    (function createCustomControl() {
      var locationCoords = new google.maps.LatLng(30.2672, -97.7431);
      var map = new google.maps.Map(document.getElementById("gMap4"), {
        center: locationCoords,
        zoom: 14,
        mapTypeId: "terrain"
      });

      function CenterPosControl(customParent) {
        var centerButton = document.createElement("div");
        var innerText = document.createTextNode("Reset Center");
        centerButton.appendChild(innerText);
        centerButton.setAttribute("class", "customControlButton positionRelative");
        centerButton.style.marginTop = "10px";
        centerButton.onclick = function() {
          map.setOptions({
            center: locationCoords
          });
        };

        customParent.appendChild(centerButton);
      }
      var customControlsParent = document.createElement("div");
      var centerControl = new CenterPosControl(customControlsParent);

      customControlsParent.index = 2;
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(customControlsParent);
    })();

    (function createStateWithCustomControl() {
      var locationCoords = new google.maps.LatLng(30.2672, -97.7431);
      var map = new google.maps.Map(document.getElementById("gMap5"), {
        center: locationCoords,
        zoom: 14,
        mapTypeId: "terrain"
      });

      function CenterPosControls(customParent) {
        var thisObject = this;

        var setCenterButton = document.createElement("button");
        setCenterButton.setAttribute("class", "dawgButton customCenter1");
        var text1 = document.createTextNode("Set This Center");
        setCenterButton.style.margin = "0 0 0 5px";
        setCenterButton.appendChild(text1);

        var resetPosButton = document.createElement("button");
        resetPosButton.setAttribute("class", "dawgButton customCenter2");
        var text2 = document.createTextNode("Reset Position");
        resetPosButton.style.margin = "5px 0 0 5px";
        resetPosButton.appendChild(text2);

        customParent.appendChild(setCenterButton);
        customParent.appendChild(resetPosButton);

        setCenterButton.onclick = function() {
          var currentPosition = map.getCenter();
          thisObject.setCenterCoords(currentPosition);
        };

        resetPosButton.onclick = function() {
          var toMoveCoords = thisObject.getCenterCoords();
          if(toMoveCoords) {
            map.setCenter(toMoveCoords);
          }
          else {
            alert("You need to first set a Center!");
          }
        };
      }
      CenterPosControls.prototype.centerCoords = null;
      CenterPosControls.prototype.setCenterCoords = function(coords) {
        this.centerCoords = coords;
      };
      CenterPosControls.prototype.getCenterCoords = function() {
        return this.centerCoords;
      };

      var customControlsParent = document.createElement("div");
      var centerControl = new CenterPosControls(customControlsParent);

      customControlsParent.index = 1;
      map.controls[google.maps.ControlPosition.LEFT_CENTER].push(customControlsParent);
    })();

    (function addListenEvents() {
      var locationCoords = new google.maps.LatLng(31.2304, 121.4737);
      var map = new google.maps.Map(document.getElementById("gMap6"), {
        center: locationCoords,
        zoom: 14,
        mapTypeId: "terrain"
      });
      map.addListener("click", function(event) {
        console.log("Map Element Clicked. Location Coords: Lat=" + event.latLng.lat() + " | " + "Lng=" + event.latLng.lng()); 
      });
      map.addListener("bounds_changed", function(event) {
        console.log("Map Viewport bounds have changed");
      });
      map.addListener("center_changed", function() {
        console.log("Map Center has changed. Center Location: Lat=" + this.getCenter().lat() + " | " + "Lng=" + this.getCenter().lng());
      });
      map.addListener("dblclick", function(event) {
        console.log("Map Double Click Triggered. Location Coords: Lat=" + event.latLng.lat() + " | " + "Lng=" + event.latLng.lng());
      });
      map.addListener("dragstart", function() {
        console.log("DRAG STARTED -> You are starting to drag the map");
      });
      map.addListener("drag", function() {
        console.log("DRAG IS GOING ON -> You are dragging the map");
      });
      map.addListener("dragend", function() {
        console.log("DRAG ENDED -> You have finished dragging the map");
      });
    })();
    
    (function gestureHandlingDefault() {
      var locationCoords = new google.maps.LatLng(64.1814, -51.6941);
      var map = new google.maps.Map(document.getElementById("gMap7"), {
        center: locationCoords,
        zoom: 12,
        gestureHandling: "cooperative"
      });
    })();

    (function gestureHandlingNone() {
      var locationCoords = new google.maps.LatLng(64.1814, -51.6941);
      var map = new google.maps.Map(document.getElementById("gMap8"), {
        center: locationCoords,
        zoom: 12,
        gestureHandling: "none",
        zoomControl: false
      });
    })();

    (function gestureHandlingGreedy() {
      var locationCoords = new google.maps.LatLng(64.1814, -51.6941);
      var map = new google.maps.Map(document.getElementById("gMap9"), {
        center: locationCoords,
        zoom: 12,
        gestureHandling: "greedy",
      });
    })();

    (function markerEvents() {
      var locationCoords = new google.maps.LatLng(64.1814, -51.6941);
      var map = new google.maps.Map(document.getElementById("gMap10"), {
        center: locationCoords,
        zoom: 12,
      });

      var animationArray = ["google.maps.Animation.BOUNCE", "google.maps.Animation.DROP"];
      
      var wLocationOrigin = window.location.origin;
      var baseUrl = "/dawg-google-maps";
      var imageUrl = wLocationOrigin + baseUrl + "/assets/images/hawaii.png";

      var marker = new google.maps.Marker({
        position: locationCoords,
        map: map,
      });

      marker.addListener("click", function(event) {
        console.log("Marker is being clicked now", event);
        marker.setAnimation(google.maps.Animation.BOUNCE);
      });

      marker.addListener("animation_changed", function() {
        var $this = this;
        console.log("Marker Animation has been changed =>", animationArray[$this.getAnimation()]);
      });

      marker.addListener("cursor_changed", function() {
        var $this = this;
        console.log("Marker Cursor has changed =>", $this.getCursor());
      });

      marker.addListener("dblclick", function(event) {
        console.log("Marker has been Double Clicked", event);
        marker.setOptions({
          cursor: "crosshair",
          draggable: true
        });
      });

      marker.addListener("draggable_changed", function() {
        console.log("Drag Feature has now been enabled for this marker");
      });

      marker.addListener("dragstart", function(event) {
        console.log("The Marker-Drag Event has started", event);
      });

      marker.addListener("drag", function(event) {
        console.log("The Marker is being Dragged Now", event);
      });

      marker.addListener("dragend", function(event) {
        console.log("The Marker Drag Event has stopped", event);
        marker.setOptions({
          icon: imageUrl
        });
        getCurrentMarkerPos();
      });

      marker.addListener("icon_changed", function() {
        var $this = this;
        console.log("Marker Icon has been changed", $this.getIcon());
      });

      function getCurrentMarkerPos() {
        marker.addListener("position_changed", function() {
          var $this = this;
          console.log("Marker position has changed", $this.getPosition());
        });
      }

      marker.addListener("mouseover", function(event) {
        console.log("Your Mouse is hovering over the Marker", event);
        var $this = this;
        $this.setOptions({
          title: "Example Map Marker"
        });
      });

      marker.addListener("mouseout", function(event) {
        console.log("Your Mouse has left the Marker", event);
      });

      marker.addListener("mousedown", function(event) {
        console.log("Mouse Down Button Pressed", event);
      });

      marker.addListener("mouseup", function(event) {
        console.log("Mouse Button is Up", event);
      });

      function removeMarkerAnimation() {
        marker.setOptions({
          animation: null
        });
        console.log("Marker Animation has been removed because of mouse right click!!");
      }

      marker.addListener("rightclick", function(event) {
        console.log("Mouse Right Click has been triggered");
        removeMarkerAnimation();
      });

      marker.addListener("title_changed", function() {
        var $this = this;
        console.log("Title for Marker has been changed to =>", $this.getTitle());
      });
    })();
    
    (function polylineClassEvents() {
      var locationCoords = new google.maps.LatLng(21.3069, -157.8583);
      var map = new google.maps.Map(document.getElementById("gMap11"), {
        center: locationCoords,
        zoom: 15,
      });

      var polyArray = [
      {lat: 21.308581398038793, lng: -157.86765575408936},
      {lat: 21.30406341742832, lng: -157.860746383667},
      {lat: 21.309780838575993, lng: -157.85220623016357},
      ];

      var polyPath = new google.maps.Polyline({
        map: map,
        path: polyArray,
        geodesic: true,
        strokeColor: "#ff0000",
        strokeOpacity: 0.7,
        strokeWeight: 8,
        editable: true,
        draggable: true
      });

      polyPath.addListener("click", function(event) {
        console.log("Polyline Clicked", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      polyPath.addListener("dblclick", function(event) {
        console.log("Polyline Double Clicked", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });

      polyPath.addListener("dragstart", function() {
        console.log("Polyline Drag Event Started");
      });

      polyPath.addListener("drag", function() {
        console.log("Polyline Drag Continues On Map...");
      });

      polyPath.addListener("dragend", function() {
        console.log("Polyline Drag Event has Stopped");
      });

      polyPath.addListener("mousedown", function(event) {
        console.log("Polyline Mouse Down Event Triggered", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      polyPath.addListener("mouseup", function(event) {
        console.log("Polyline Mouse Up Event Triggered", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });

      polyPath.addListener("mouseover", function(event) {
        console.log("Polyline Mouse Over Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      polyPath.addListener("mousemove", function(event) {
        console.log("Polyline Mouse Move Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      polyPath.addListener("mouseout", function(event) {
        console.log("Polyline Mouse Out Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      polyPath.addListener("rightclick", function(event) {
        console.log("Polyline Right Click Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
    })();

    (function polygonClassEvents() {
      var locationCoords = new google.maps.LatLng(21.3069, -157.8583);
      var map = new google.maps.Map(document.getElementById("gMap12"), {
        center: locationCoords,
        zoom: 15,
      });

      var polyArray = [
      {lat: 21.308581398038793, lng: -157.86765575408936},
      {lat: 21.30406341742832, lng: -157.860746383667},
      {lat: 21.309780838575993, lng: -157.85220623016357},
      ];

      var polyGon = new google.maps.Polygon({
        map: map,
        path: polyArray,
        geodesic: true,
        strokeColor: "#ff0000",
        strokeOpacity: 0.7,
        strokeWeight: 8,
        editable: true,
        draggable: true
      });
      
      polyGon.addListener("click", function(event) {
        console.log("Polygon Clicked", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      polyGon.addListener("dblclick", function(event) {
        console.log("Polygon Double Clicked", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });

      polyGon.addListener("dragstart", function() {
        console.log("Polygon Drag Event Started");
      });

      polyGon.addListener("drag", function() {
        console.log("Polygon Drag Continues On Map...");
      });

      polyGon.addListener("dragend", function() {
        console.log("Polygon Drag Event has Stopped");
      });

      polyGon.addListener("mousedown", function(event) {
        console.log("Polygon Mouse Down Event Triggered", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      polyGon.addListener("mouseup", function(event) {
        console.log("Polygon Mouse Up Event Triggered", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });

      polyGon.addListener("mouseover", function(event) {
        console.log("Polygon Mouse Over Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      polyGon.addListener("mousemove", function(event) {
        console.log("Polygon Mouse Move Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      polyGon.addListener("mouseout", function(event) {
        console.log("Polygon Mouse Out Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      polyGon.addListener("rightclick", function(event) {
        console.log("Polygon Right Click Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
    })();
    
    (function rectangleClassEvents() {
      var locationCoords = new google.maps.LatLng(21.3069, -157.8583);
      var map = new google.maps.Map(document.getElementById("gMap13"), {
        center: locationCoords,
        zoom: 15,
      });
      
      var latLngBounds = new google.maps.LatLngBounds({lat: 21.309021194039655, lng: -157.8576135635376},{lat: 21.30654232664826, lng: -157.85387992858887});
      var latLngBoundsJson = latLngBounds.toJSON();
      var rect = new google.maps.Rectangle({
        map: map,
        bounds: {
          north: latLngBoundsJson.north,
          south: latLngBoundsJson.south,
          east: latLngBoundsJson.east,
          west: latLngBoundsJson.west
        },
        geodesic: true,
        strokeColor: "#ff0000",
        strokeOpacity: 0.7,
        strokeWeight: 8,
        editable: true,
        draggable: true
      });
     
      rect.addListener("bounds_changed", function() {
        console.log("Rectangle Bounds Have Now Changed");
      });

      rect.addListener("click", function(event) {
        console.log("Rectangle Clicked", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      rect.addListener("dblclick", function(event) {
        console.log("Rectangle Double Clicked", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });

      rect.addListener("dragstart", function() {
        console.log("Rectangle Drag Event Started");
      });

      rect.addListener("drag", function() {
        console.log("Rectangle Drag Continues On Map...");
      });

      rect.addListener("dragend", function() {
        console.log("Rectangle Drag Event has Stopped");
      });

      rect.addListener("mousedown", function(event) {
        console.log("Rectangle Mouse Down Event Triggered", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      rect.addListener("mouseup", function(event) {
        console.log("Rectangle Mouse Up Event Triggered", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });

      rect.addListener("mouseover", function(event) {
        console.log("Rectangle Mouse Over Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      rect.addListener("mousemove", function(event) {
        console.log("Rectangle Mouse Move Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      rect.addListener("mouseout", function(event) {
        console.log("Rectangle Mouse Out Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      rect.addListener("rightclick", function(event) {
        console.log("Rectangle Right Click Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
    })();
    
    (function circleClassEvents() {
      var locationCoords = new google.maps.LatLng(21.3069, -157.8583);
      var map = new google.maps.Map(document.getElementById("gMap14"), {
        center: locationCoords,
        zoom: 15,
      });
      
      var circleShape = new google.maps.Circle({
        map: map,
        center: {lat: 21.309021194039655, lng: -157.8576135635376},
        radius: 150,
        geodesic: true,
        strokeColor: "#ff0000",
        strokeOpacity: 0.7,
        strokeWeight: 8,
        editable: true,
        draggable: true
      });
    
      circleShape.addListener("bounds_changed", function() {
        console.log("Circle Bounds Have Now Changed");
      });

      circleShape.addListener("click", function(event) {
        console.log("Circle Clicked", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      circleShape.addListener("dblclick", function(event) {
        console.log("Circle Double Clicked", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });

      circleShape.addListener("dragstart", function() {
        console.log("Circle Drag Event Started");
      });

      circleShape.addListener("drag", function() {
        console.log("Circle Drag Continues On Map...");
      });

      circleShape.addListener("dragend", function() {
        console.log("Circle Drag Event has Stopped");
      });

      circleShape.addListener("mousedown", function(event) {
        console.log("Circle Mouse Down Event Triggered", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      circleShape.addListener("mouseup", function(event) {
        console.log("Circle Mouse Up Event Triggered", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });

      circleShape.addListener("mouseover", function(event) {
        console.log("Circle Mouse Over Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      circleShape.addListener("mousemove", function(event) {
        console.log("Circle Mouse Move Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      circleShape.addListener("mouseout", function(event) {
        console.log("Circle Mouse Out Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
      
      circleShape.addListener("rightclick", function(event) {
        console.log("Circle Right Click Event Trigger", "Lat => " + event.latLng.lat(), "Lng => " + event.latLng.lng());
      });
    })();
  }
}

function drawingOnYourMapShapes() {
  if(document.location.href.indexOf("draw-on-your-map-shapes") > -1) {
    (function simplePolyline() {
      var locationCoords = new google.maps.LatLng(-14.2350, -51.9253);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        center: locationCoords,
        zoom: 4,
        mapTypeId: "terrain"
      });

      var polyArray = [
      {lat: -23.5505, lng: -46.6333},
      {lat: -25.2637, lng: -57.5759},
      {lat: -31.4201, lng: -64.1888},
      {lat: -0.1807, lng: -78.4678},
      {lat: -23.5505, lng: -46.6333},
      ];

      var polyPath = new google.maps.Polyline({
        map: map,
        path: polyArray,
        geodesic: true,
        strokeColor: "#ff0000",
        strokeOpacity: 0.7,
        strokeWeight: 4,
      });
    })();
    
    (function removeAndPlaceAgainPolyline() {
      var locationCoords = new google.maps.LatLng(-14.2350, -51.9253);
      var map = new google.maps.Map(document.getElementById("gMap2"), {
        center: locationCoords,
        zoom: 4,
        mapTypeId: "terrain"
      });

      var polyArray = [
      {lat: -23.5505, lng: -46.6333},
      {lat: -25.2637, lng: -57.5759},
      {lat: -31.4201, lng: -64.1888},
      {lat: -0.1807, lng: -78.4678},
      {lat: -23.5505, lng: -46.6333},
      ];

      var polyPath = new google.maps.Polyline({
        map: map,
        path: polyArray,
        geodesic: true,
        strokeColor: "#ff0000",
        strokeOpacity: 0.7,
        strokeWeight: 4,
      });

      function removePolyline() {
        polyPath.setMap(null);
        setTimeout(placeAgainPolyline, 2000);
      }
      removePolyline();

      function placeAgainPolyline() {
        polyPath.setMap(map);
        setTimeout(removePolyline, 2000);
      }
    })();

    (function drawDynamicPolypath() {
      var locationCoords = new google.maps.LatLng(-23.5505, -46.6333);
      var map = new google.maps.Map(document.getElementById("gMap3"), {
        center: locationCoords,
        zoom: 13,
        mapTypeId: "terrain"
      });
      
      var wLocationOrigin = window.location.origin;
      var baseUrl = "/dawg-google-maps";
      var imageUrl = wLocationOrigin + baseUrl + "/assets/images/polymarker.png";

      var polyPath = new google.maps.Polyline({
        strokeWeight: 3,
        strokeColor: "#0886da",
        strokeOpacity: 0.9,
        map: map
      });

      map.addListener("click", function(event) {
        var pathArray = polyPath.getPath();
        var clickCoords = event.latLng;
        pathArray.push(clickCoords);

        var marker = new google.maps.Marker({
          map: map,
          position: clickCoords,
          icon: imageUrl,
          animation: google.maps.Animation.DROP
        });
      });
    })();

    (function simplePolygon() {
      var locationCoords = new google.maps.LatLng(46.2276, 2.2137);
      var map = new google.maps.Map(document.getElementById("gMap4"), {
        center: locationCoords,
        zoom: 5,
        mapTypeId: "terrain"
      });

      var polygonArray = [
      {lat: 48.8566, lng: 2.3522},
      {lat: 51.5074, lng: -0.1278},
      {lat: 50.1109, lng: 8.6821},
      {lat: 41.9028, lng: 12.4964},
      {lat: 41.3851, lng: 2.1734}
      ];

      var polygonArea = new google.maps.Polygon({
        map: map,
        paths: polygonArray,
        strokeColor: "#0000ff",
        strokeWeight: 3,
        strokeOpacity: 0.8,
        fillColor: "#0000ff",
        fillOpacity: 0.5
      });
    })();
    
    (function polygonRemoveAndPlaceAgain() {
      var locationCoords = new google.maps.LatLng(46.2276, 2.2137);
      var map = new google.maps.Map(document.getElementById("gMap5"), {
        center: locationCoords,
        zoom: 5,
        mapTypeId: "terrain"
      });

      var polygonArray = [
      {lat: 48.8566, lng: 2.3522},
      {lat: 51.5074, lng: -0.1278},
      {lat: 50.1109, lng: 8.6821},
      {lat: 41.9028, lng: 12.4964},
      {lat: 41.3851, lng: 2.1734}
      ];

      var polygonArea = new google.maps.Polygon({
        paths: polygonArray,
        strokeColor: "#0000ff",
        strokeWeight: 3,
        strokeOpacity: 0.8,
        fillColor: "#0000ff",
        fillOpacity: 0.5
      });

      function setPolygonArea() {
        polygonArea.setMap(map);
        setTimeout(removePolygonArea, 2000);
      }

      function removePolygonArea() {
        polygonArea.setMap(null);
        setTimeout(setPolygonArea, 2000);
      }

      setPolygonArea();
    })();
    
    (function inspectAPolygon() {
      var locationCoords = new google.maps.LatLng(46.2276, 2.2137);
      var map = new google.maps.Map(document.getElementById("gMap6"), {
        center: locationCoords,
        zoom: 5,
        mapTypeId: "terrain"
      });

      var polygonArray = [
      {lat: 48.8566, lng: 2.3522},
      {lat: 51.5074, lng: -0.1278},
      {lat: 50.1109, lng: 8.6821},
      {lat: 41.9028, lng: 12.4964},
      {lat: 41.3851, lng: 2.1734}
      ];

      var polygonArea = new google.maps.Polygon({
        paths: polygonArray,
        strokeColor: "#ff0000",
        strokeWeight: 3,
        strokeOpacity: 0.8,
        fillColor: "#ff0000",
        fillOpacity: 0.5
      });
      polygonArea.setMap(map);

      var infoWindow = new google.maps.InfoWindow;


      polygonArea.addListener("click", function(event) {
        var $this = this;
        var paths = $this.getPath();
        var pathString = "";
        for (var i = 0; i < paths.getLength(); i++) {
          console.log("Lat:-> " + paths.getAt(i).lat(), "Lng:-> " + paths.getAt(i).lng());
          pathString += (pathString === "") ? ("Lat:-> " + paths.getAt(i).lat() + " Lng:-> " + paths.getAt(i).lng()) : ("<br/>" + "Lat:-> " + paths.getAt(i).lat() + " Lng:-> " + paths.getAt(i).lng());
        }
        var infoString = "<b>Example Heading</b>.<br/>You have clicked on the polygon area.<br/>Location Coordinates for click are:<br/><br/><b>Latitude-></b> " + event.latLng.lat() + "<br/><b>Longitude-></b> " + event.latLng.lng() + "<br/><br/>" + "<b>Polygon Area Path Coords</b><br/>" + pathString;
        infoWindow.setOptions({
          content: infoString,
          position: event.latLng
        });
        infoWindow.open(map);
      });
    })();
    
    (function holeInPolygon() {
      var locationCoords = new google.maps.LatLng(46.2276, 2.2137);
      var map = new google.maps.Map(document.getElementById("gMap7"), {
        center: locationCoords,
        zoom: 5,
        mapTypeId: "terrain"
      });

      var polygonArray = [
      {lat: 48.8566, lng: 2.3522},
      {lat: 51.5074, lng: -0.1278},
      {lat: 50.1109, lng: 8.6821},
      {lat: 41.9028, lng: 12.4964},
      {lat: 41.3851, lng: 2.1734}
      ];

      var holeArray1 = [
      {lat: 48.6687, lng: 5.185},
      {lat: 47.2563, lng: 4.042},
      {lat: 45.498, lng: 4.921},
      {lat: 47.7905, lng: 8.525}
      ];

      var holeArray2 = [
      {lat: 45.524, lng: 3.867},
      {lat: 43.140, lng: 5.756},
      {lat: 44.315, lng: 8.745},
      {lat: 45.528, lng: 9.140}
      ];
    
      var holeArray3 = [
      {lat: 50.603, lng: 2.241},
      {lat: 49.957, lng: 2.285},
      {lat: 50.408, lng: 3.427},
      ];

      var polygonArea = new google.maps.Polygon({
        paths: [polygonArray, holeArray1, holeArray2, holeArray3],
        strokeColor: "#ff0000",
        strokeWeight: 3,
        strokeOpacity: 0.8,
        fillColor: "#ff0000",
        fillOpacity: 0.5
      });
      polygonArea.setMap(map);
    })();

    (function simpleRectangle() {
      var locationCoords = new google.maps.LatLng(41.8781, -87.6298);
      var map = new google.maps.Map(document.getElementById("gMap8"), {
        center: locationCoords,
        zoom: 16,
        mapTypeId: "roadmap"
      });

      var rectBounds = new google.maps.LatLngBounds({lat: 41.878, lng: -87.630}, {lat: 41.879, lng: -87.627});
      var rectBoundsJson = rectBounds.toJSON();
      var rectangle = new google.maps.Rectangle({
        bounds: {
          north: rectBoundsJson.north,
          south: rectBoundsJson.south,
          east: rectBoundsJson.east,
          west: rectBoundsJson.west
        },
        map: map
      });

      var rectBounds2 = new google.maps.LatLngBounds({lat: 41.878, lng: -87.624}, {lat: 41.875, lng: -87.620});
      var rectBounds2Json = rectBounds2.toJSON();
      var rectangle2 = new google.maps.Rectangle({
        bounds: {
          north: rectBounds2Json.north,
          south: rectBounds2Json.south,
          east: rectBounds2Json.east,
          west: rectBounds2Json.west
        },
        map: map,
        strokeColor: "#ec0000",
        strokeWeight: 4,
        strokeOpacity: 0.5,
        fillColor: "#ec0000",
        fillOpacity: 0.3
      });
    })();

    (function removeAndPlaceAgainRectangle() {
      var locationCoords = new google.maps.LatLng(41.8781, -87.6298);
      var map = new google.maps.Map(document.getElementById("gMap9"), {
        center: locationCoords,
        zoom: 16,
        mapTypeId: "roadmap"
      });

      var rectBounds = new google.maps.LatLngBounds({lat: 41.878, lng: -87.630}, {lat: 41.879, lng: -87.627});
      var rectBoundsJson = rectBounds.toJSON();
      var rectangle = new google.maps.Rectangle({
        bounds: {
          north: rectBoundsJson.north,
          south: rectBoundsJson.south,
          east: rectBoundsJson.east,
          west: rectBoundsJson.west
        },
        map: map
      });

      var rectBounds2 = new google.maps.LatLngBounds({lat: 41.878, lng: -87.624}, {lat: 41.875, lng: -87.620});
      var rectBounds2Json = rectBounds2.toJSON();
      var rectangle2 = new google.maps.Rectangle({
        bounds: {
          north: rectBounds2Json.north,
          south: rectBounds2Json.south,
          east: rectBounds2Json.east,
          west: rectBounds2Json.west
        },
        map: map,
        strokeColor: "#ec0000",
        strokeWeight: 4,
        strokeOpacity: 0.5,
        fillColor: "#ec0000",
        fillOpacity: 0.3
      });

      function removeRects() {
        rectangle.setMap(null);
        rectangle2.setMap(null);
        setTimeout(placeAgainRects, 2000);
      }
      removeRects();

      function placeAgainRects() {
        rectangle.setMap(map);
        rectangle2.setMap(map);
        setTimeout(removeRects, 2000);
      }
    })();

    (function simpleCircle() {
      var locationCoords = new google.maps.LatLng(55.3781, -3.4360);
      var map = new google.maps.Map(document.getElementById("gMap10"), {
        mapTypeId: "terrain",
        center: locationCoords,
        zoom: 5
      });

      var hexArray = ["#ff2a00", "#019d60",  "#0f539a"];
      var hexCount = 0;
      var cityLocations = {
        london: {
          population: 8.788,
          coordinates: {lat: 51.5074, lng: -0.1278}
        },
        dublin: {
          population: 1.8,
          coordinates: {lat: 53.3498, lng: -6.2603}
        },
        glasgow: {
          population: 1.232,
          coordinates: {lat: 55.8642, lng: -4.2518}
        }
      };

      for (var cities in cityLocations) {
        var circle = new google.maps.Circle({
          center: cityLocations[cities].coordinates,
          radius: Math.sqrt(cityLocations[cities].population * 100000) * 200,
          map: map,
          strokeColor: hexArray[hexCount],
          strokeOpacity: 1,
          strokeWeight: 3,
          fillColor: hexArray[hexCount],
          fillOpacity: 0.3
        });
        hexCount += 1;
      }
    })();

    (function removeAndPlaceAgainCircles() {
      var locationCoords = new google.maps.LatLng(55.3781, -3.4360);
      var map = new google.maps.Map(document.getElementById("gMap11"), {
        mapTypeId: "terrain",
        center: locationCoords,
        zoom: 5
      });

      var hexArray = ["#ff2a00", "#019d60",  "#0f539a"];
      var hexCount = 0;
      var cityLocations = {
        london: {
          population: 8.788,
          coordinates: {lat: 51.5074, lng: -0.1278}
        },
        dublin: {
          population: 1.8,
          coordinates: {lat: 53.3498, lng: -6.2603}
        },
        glasgow: {
          population: 1.232,
          coordinates: {lat: 55.8642, lng: -4.2518}
        }
      };

      var circlesArray = [];

      for (var cities in cityLocations) {
        var circle = new google.maps.Circle({
          center: cityLocations[cities].coordinates,
          radius: Math.sqrt(cityLocations[cities].population * 100000) * 200,
          map: map,
          strokeColor: hexArray[hexCount],
          strokeOpacity: 1,
          strokeWeight: 3,
          fillColor: hexArray[hexCount],
          fillOpacity: 0.3
        });
        Array.prototype.push.call(circlesArray, circle);
        hexCount += 1;
      }

      function removeCircles() {
        Array.prototype.forEach.call(circlesArray, function(circleObj, index) {
          circleObj.setMap(null);
        });
        setTimeout(placeCircles, 2000);
      }
      removeCircles();

      function placeCircles() {
        Array.prototype.forEach.call(circlesArray, function(circleObj, index) {
          circleObj.setMap(map);
        });
        setTimeout(removeCircles, 2000);
      }
    })();
    
    (function editablePolyline() {
      var locationCoords = new google.maps.LatLng(-14.2350, -51.9253);
      var map = new google.maps.Map(document.getElementById("gMap12"), {
        center: locationCoords,
        zoom: 4,
        mapTypeId: "terrain"
      });

      var polyArray = [
      {lat: -23.5505, lng: -46.6333},
      {lat: -25.2637, lng: -57.5759},
      {lat: -31.4201, lng: -64.1888},
      {lat: -0.1807, lng: -78.4678},
      {lat: -23.5505, lng: -46.6333},
      ];

      var polyPath = new google.maps.Polyline({
        map: map,
        path: polyArray,
        geodesic: true,
        strokeColor: "#ff0000",
        strokeOpacity: 0.7,
        strokeWeight: 4,
        editable: true
      });
    })();
    
    (function draggablePolyline() {
      var locationCoords = new google.maps.LatLng(-14.2350, -51.9253);
      var map = new google.maps.Map(document.getElementById("gMap13"), {
        center: locationCoords,
        zoom: 4,
        mapTypeId: "terrain"
      });

      var polyArray = [
      {lat: -23.5505, lng: -46.6333},
      {lat: -25.2637, lng: -57.5759},
      {lat: -31.4201, lng: -64.1888},
      {lat: -0.1807, lng: -78.4678},
      {lat: -23.5505, lng: -46.6333},
      ];

      var polyPath = new google.maps.Polyline({
        map: map,
        path: polyArray,
        geodesic: true,
        strokeColor: "#ff0000",
        strokeOpacity: 0.7,
        strokeWeight: 4,
        draggable: true
      });
    })();
    
    (function editablePolygon() {
      var locationCoords = new google.maps.LatLng(46.2276, 2.2137);
      var map = new google.maps.Map(document.getElementById("gMap14"), {
        center: locationCoords,
        zoom: 5,
        mapTypeId: "terrain"
      });

      var polygonArray = [
      {lat: 48.8566, lng: 2.3522},
      {lat: 51.5074, lng: -0.1278},
      {lat: 50.1109, lng: 8.6821},
      {lat: 41.9028, lng: 12.4964},
      {lat: 41.3851, lng: 2.1734}
      ];

      var polygonArea = new google.maps.Polygon({
        map: map,
        paths: polygonArray,
        strokeColor: "#0000ff",
        strokeWeight: 3,
        strokeOpacity: 0.8,
        fillColor: "#0000ff",
        fillOpacity: 0.5,
        editable: true,
        geodesic: true,
      });
    })();
    
    (function draggablePolygon() {
      var locationCoords = new google.maps.LatLng(46.2276, 2.2137);
      var map = new google.maps.Map(document.getElementById("gMap15"), {
        center: locationCoords,
        zoom: 5,
        mapTypeId: "terrain"
      });

      var polygonArray = [
      {lat: 48.8566, lng: 2.3522},
      {lat: 51.5074, lng: -0.1278},
      {lat: 50.1109, lng: 8.6821},
      {lat: 41.9028, lng: 12.4964},
      {lat: 41.3851, lng: 2.1734}
      ];

      var polygonArea = new google.maps.Polygon({
        map: map,
        paths: polygonArray,
        strokeColor: "#0000ff",
        strokeWeight: 3,
        strokeOpacity: 0.8,
        fillColor: "#0000ff",
        fillOpacity: 0.5,
        draggable: true,
        geodesic: true,
      });
    })();
    
    (function editableRectangle() {
      var locationCoords = new google.maps.LatLng(41.8781, -87.6298);
      var map = new google.maps.Map(document.getElementById("gMap16"), {
        center: locationCoords,
        zoom: 16,
        mapTypeId: "roadmap"
      });

      var rectBounds = new google.maps.LatLngBounds({lat: 41.878, lng: -87.630}, {lat: 41.879, lng: -87.627});
      var rectBoundsJson = rectBounds.toJSON();
      var rectangle = new google.maps.Rectangle({
        bounds: {
          north: rectBoundsJson.north,
          south: rectBoundsJson.south,
          east: rectBoundsJson.east,
          west: rectBoundsJson.west
        },
        map: map,
        editable: true,
      });

      var rectBounds2 = new google.maps.LatLngBounds({lat: 41.878, lng: -87.624}, {lat: 41.875, lng: -87.620});
      var rectBounds2Json = rectBounds2.toJSON();
      var rectangle2 = new google.maps.Rectangle({
        bounds: {
          north: rectBounds2Json.north,
          south: rectBounds2Json.south,
          east: rectBounds2Json.east,
          west: rectBounds2Json.west
        },
        map: map,
        strokeColor: "#ec0000",
        strokeWeight: 4,
        strokeOpacity: 0.5,
        fillColor: "#ec0000",
        fillOpacity: 0.3,
        editable: true,
      });
    })();
    
    (function draggableRectangle() {
      var locationCoords = new google.maps.LatLng(41.8781, -87.6298);
      var map = new google.maps.Map(document.getElementById("gMap17"), {
        center: locationCoords,
        zoom: 16,
        mapTypeId: "roadmap"
      });

      var rectBounds = new google.maps.LatLngBounds({lat: 41.878, lng: -87.630}, {lat: 41.879, lng: -87.627});
      var rectBoundsJson = rectBounds.toJSON();
      var rectangle = new google.maps.Rectangle({
        bounds: {
          north: rectBoundsJson.north,
          south: rectBoundsJson.south,
          east: rectBoundsJson.east,
          west: rectBoundsJson.west
        },
        map: map,
        draggable: true,
      });

      var rectBounds2 = new google.maps.LatLngBounds({lat: 41.878, lng: -87.624}, {lat: 41.875, lng: -87.620});
      var rectBounds2Json = rectBounds2.toJSON();
      var rectangle2 = new google.maps.Rectangle({
        bounds: {
          north: rectBounds2Json.north,
          south: rectBounds2Json.south,
          east: rectBounds2Json.east,
          west: rectBounds2Json.west
        },
        map: map,
        strokeColor: "#ec0000",
        strokeWeight: 4,
        strokeOpacity: 0.5,
        fillColor: "#ec0000",
        fillOpacity: 0.3,
        draggable: true,
      });
    })();
    
    (function editableCircle() {
      var locationCoords = new google.maps.LatLng(55.3781, -3.4360);
      var map = new google.maps.Map(document.getElementById("gMap18"), {
        mapTypeId: "terrain",
        center: locationCoords,
        zoom: 5
      });

      var hexArray = ["#ff2a00", "#019d60",  "#0f539a"];
      var hexCount = 0;
      var cityLocations = {
        london: {
          population: 8.788,
          coordinates: {lat: 51.5074, lng: -0.1278}
        },
        dublin: {
          population: 1.8,
          coordinates: {lat: 53.3498, lng: -6.2603}
        },
        glasgow: {
          population: 1.232,
          coordinates: {lat: 55.8642, lng: -4.2518}
        }
      };

      for (var cities in cityLocations) {
        var circle = new google.maps.Circle({
          center: cityLocations[cities].coordinates,
          radius: Math.sqrt(cityLocations[cities].population * 100000) * 200,
          map: map,
          strokeColor: hexArray[hexCount],
          strokeOpacity: 1,
          strokeWeight: 3,
          fillColor: hexArray[hexCount],
          fillOpacity: 0.3,
          editable: true,
        });
        hexCount += 1;
      }
    })();
    
    (function draggableCircle() {
      var locationCoords = new google.maps.LatLng(55.3781, -3.4360);
      var map = new google.maps.Map(document.getElementById("gMap19"), {
        mapTypeId: "terrain",
        center: locationCoords,
        zoom: 5
      });

      var hexArray = ["#ff2a00", "#019d60",  "#0f539a"];
      var hexCount = 0;
      var cityLocations = {
        london: {
          population: 8.788,
          coordinates: {lat: 51.5074, lng: -0.1278}
        },
        dublin: {
          population: 1.8,
          coordinates: {lat: 53.3498, lng: -6.2603}
        },
        glasgow: {
          population: 1.232,
          coordinates: {lat: 55.8642, lng: -4.2518}
        }
      };

      for (var cities in cityLocations) {
        var circle = new google.maps.Circle({
          center: cityLocations[cities].coordinates,
          radius: Math.sqrt(cityLocations[cities].population * 100000) * 200,
          map: map,
          strokeColor: hexArray[hexCount],
          strokeOpacity: 1,
          strokeWeight: 3,
          fillColor: hexArray[hexCount],
          fillOpacity: 0.3,
          draggable: true,
        });
        hexCount += 1;
      }
    })();
  }
}

function googleMapsDataLayers() {
  if(document.location.href.indexOf("google-maps-data-layers") > -1) {
    (function dataLayerDrawPolygon() {
      var locationCoords = new google.maps.LatLng(-33.9249, 18.4241);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        center: locationCoords,
        zoom: 14,
        mapTypeId: "terrain"
      });

      var polyOuter = [
      {lat: -33.91928949902838, lng: 18.419265747070312},
      {lat: -33.92220964959485, lng: 18.415746688842773},
      {lat: -33.924987260907464, lng: 18.420381546020508},
      {lat: -33.92235209340369, lng: 18.423128128051758}
      ];

      var polyInner = [
      {lat: -33.92327797235584, lng: 18.42106819152832},
      {lat: -33.921283759032086, lng: 18.41806411743164},
      {lat: -33.922708201883815, lng: 18.418235778808594},
      ];

      map.data.add({geometry: new google.maps.Data.Polygon([polyOuter, polyInner])});
    })();

    (function dataLayerLoaderGeoJson() {
      var locationCoords = new google.maps.LatLng(39.9526, -75.1652);
      var map = new google.maps.Map(document.getElementById("gMap2"), {
        center: locationCoords,
        zoom: 14,
        mapTypeId: "terrain",
      });
  
      map.data.loadGeoJson("https://phl.carto.com/api/v2/sql?q=SELECT+*+FROM+li_demolitions&filename=li_demolitions&format=geojson&skipfields=cartodb_id", null, function(features){
        console.log(features);
      });

      var wLocationOrigin = window.location.origin;
      var baseUrl = "/dawg-google-maps";
      var imageUrl = wLocationOrigin + baseUrl + "/assets/images/polymarker.png";
      map.data.setStyle({
        icon: imageUrl
      });
    })();

    (function dataLayerEvents() {
      var locationCoords = new google.maps.LatLng(39.9526, -75.1652);
      var map = new google.maps.Map(document.getElementById("gMap3"), {
        center: locationCoords,
        zoom: 14,
        mapTypeId: "terrain",
      });
  
      var infoWindow = new google.maps.InfoWindow();

      map.data.loadGeoJson("https://phl.carto.com/api/v2/sql?q=SELECT+*+FROM+li_demolitions&filename=li_demolitions&format=geojson&skipfields=cartodb_id", null, function(features){
        console.log(features);
      });

      var wLocationOrigin = window.location.origin;
      var baseUrl = "/dawg-google-maps";
      var imageUrl = wLocationOrigin + baseUrl + "/assets/images/polymarker.png";
      map.data.setStyle({
        icon: imageUrl
      });

      map.data.addListener("click", function(event) {
        var infoset = event.feature;
        var contentString = "<b>Owner Name: </b>" + infoset.getProperty("ownername") + "<br/>" + "<b>Address Details: </b>" + infoset.getProperty("address") + "<br/><br/>" + "<b>Record Type: </b>" + infoset.getProperty("record_type") + "<br/>" + "<b>Case/Permit Number: </b>" + infoset.getProperty("caseorpermitnumber") + "<br/><br/>" + "<b>Demo-Contractor Name: </b>" + infoset.getProperty("contractorname") + "<br/>" + "<b>Demo-Contractor Address: </b>" + infoset.getProperty("contractoraddress1") + "<br/>" + "<b>Demo-Contractor Location: </b>" + infoset.getProperty("contractorcity") + ", " + infoset.getProperty("contractorstate") + "<br/>"; 
        infoWindow.setOptions({
          content: contentString,
          position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
        });
        infoWindow.open(map);
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {animation: google.maps.Animation.BOUNCE});
      });
      
      map.addListener("click", function(event) {
        infoWindow.setMap(null);
        map.data.revertStyle();
      });

      infoWindow.addListener("closeclick", function(event) {
        map.data.revertStyle();
        infoWindow.setMap(null);
      });
    })();
  }
}

function googleMapsHeatLayers() {
  if(document.location.href.indexOf("google-maps-heat-layers") > -1) {
    (function basicHeatMapExample() {
      var locationCoords = new google.maps.LatLng(35.9940, -78.8986);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        mapTypeId: "roadmap",
        center: locationCoords,
        zoom: 10
      });

      var crimeArray = [];

      $.ajax({
        url: "https://opendurham.nc.gov/api/records/1.0/search/?dataset=durham-police-crime-reports&facet=date_rept&facet=dow1&facet=reportedas&facet=chrgdesc&facet=big_zone",
        success: function(successResult) {
          $.each(successResult.records, function(index, dataset) {
            var latloc = dataset.geometry.coordinates[1];
            var lngloc = dataset.geometry.coordinates[0];
            var loccoords = new google.maps.LatLng(latloc, lngloc);
            crimeArray.push(loccoords);
          });
          var heatDisplay = new google.maps.visualization.HeatmapLayer({
            map: map,
            data: crimeArray
          });
        },
        error: function(errorResult) {
          console.log(errorResult);
        },
      });
    })();
  }
}

function trafficTransitBicycleLayers() {
  if(document.location.href.indexOf("traffic-transit-bicycle-layer") > -1) {
    (function trafficLayer() {
      var locationCoords =  new google.maps.LatLng(40.7128, -74.0060);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        center: locationCoords,
        zoom: 10
      });

      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    })();

    (function transitLayer() {
      var locationCoords =  new google.maps.LatLng(34.0522, -118.2437);
      var map = new google.maps.Map(document.getElementById("gMap2"), {
        center: locationCoords,
        zoom: 10
      });

      var transitLayer = new google.maps.TransitLayer();
      transitLayer.setMap(map);
    })();

    (function bicycleLayer() {
      var locationCoords =  new google.maps.LatLng(40.7128, -74.0060);
      var map = new google.maps.Map(document.getElementById("gMap3"), {
        center: locationCoords,
        zoom: 10
      });

      var bicycleLayer = new google.maps.BicyclingLayer();
      bicycleLayer.setMap(map);
    })();
  }
}

function googleMapsDirectionsAPI() {
  if(document.location.href.indexOf("directions-service") > -1) {
    (function simpleDirectionServiceRequest() {
      var locationCoords = new google.maps.LatLng(40.7128, -74.0060);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        center: locationCoords,
        zoom: 12
      });

      var directionsObj = {
        origin: "New York City, USA",
        destination: "Philadelphia, USA",
        travelMode: "DRIVING"
      };

      var directionService = new google.maps.DirectionsService();
      var directionDisplay = new google.maps.DirectionsRenderer();
      directionDisplay.setMap(map);
      directionService.route(directionsObj, function(results, status) {
        if(status === "OK") {
          //Do Not Delete This
          console.log(results);
          directionDisplay.setDirections(results);
          var routesArray = results.routes;
          var parentResultHolder = $("#gMap1ResultHolder");
          $.each(routesArray, function(index, dataObj) {
            var resultClone = $("#directionResultClone").clone();
            resultClone.find(".copyrightValue").text(dataObj.copyrights);
      
            var legsArray = dataObj.legs;
            $.each(legsArray, function(q, thisLegObj) {
              var distanceText = thisLegObj.distance.text;
              var durationText = thisLegObj.duration.text;
              resultClone.find(".distanceDurationValue").text(distanceText + ", " + durationText);
              resultClone.find(".originLocationValue").text(thisLegObj.start_address);
              resultClone.find(".destinationLocationValue").text(thisLegObj.end_address);
              $.each(thisLegObj.steps, function(w, thisStepObj) {
                var dataInfoEl = $("#dataInfoClone").clone();
                dataInfoEl.find(".travelModeInfo").text(thisStepObj.travel_mode);
                if(thisStepObj.maneuver !== "" || !!thisStepObj.maneuver) {
                  var maneuverText = thisStepObj.maneuver;
                  dataInfoEl.find(".maneuverInfo").text(maneuverText).removeClass("hide");
                }
                dataInfoEl.find(".distDirInfo").text(thisStepObj.distance.text + ", " + thisStepObj.duration.text);
                dataInfoEl.find(".instructionsInfo").html(thisStepObj.instructions);
                dataInfoEl.removeClass("hide").removeAttr("id").appendTo(resultClone.find(".directionsBody"));
              });
            });
            
            resultClone.removeAttr("id").removeClass("hide");
            resultClone.appendTo(parentResultHolder);
          });
        }
        else {
          console.error("ERROR Directions Service Request, ->", status);
        }
      });
    })();

    (function directionTransitOption() {
      var locationCoords = new google.maps.LatLng(40.7128, -74.0060);
      var map = new google.maps.Map(document.getElementById("gMap2"), {
        center: locationCoords,
        zoom: 12
      });

      var directionsObj = {
        origin: "Empire State Building, New York, USA",
        destination: "Long Island City, New York, USA",
        travelMode: "TRANSIT",
        transitOptions: {
          departureTime: new Date(),
          modes: ["TRAIN", "SUBWAY"],
          routingPreference: "LESS_WALKING"
        }
      };

      var directionService = new google.maps.DirectionsService();
      var directionDisplay = new google.maps.DirectionsRenderer();
      directionDisplay.setMap(map);
      directionService.route(directionsObj, function(results, status) {
        if(status === "OK") {
          //Do Not Delete This
          console.log(results);
          directionDisplay.setDirections(results);
          var routesArray = results.routes;
          var parentResultHolder = $("#gMap2ResultHolder");
          $.each(routesArray, function(index, dataObj) {
            var resultClone = $("#directionResultClone").clone();
            resultClone.find(".copyrightValue").text(dataObj.copyrights);
            
            var legsArray = dataObj.legs;
            $.each(legsArray, function(q, thisLegObj) {
              var distanceText = thisLegObj.distance.text;
              var durationText = thisLegObj.duration.text;
              resultClone.find(".distanceDurationValue").text(distanceText + ", " + durationText);
              resultClone.find(".originLocationValue").text(thisLegObj.start_address);
              resultClone.find(".destinationLocationValue").text(thisLegObj.end_address);
              $.each(thisLegObj.steps, function(w, thisStepObj) {
                var dataInfoEl = $("#dataInfoClone").clone();
                dataInfoEl.find(".travelModeInfo").text(thisStepObj.travel_mode);
                if(thisStepObj.maneuver !== "" || !!thisStepObj.maneuver) {
                  var maneuverText = thisStepObj.maneuver;
                  dataInfoEl.find(".maneuverInfo").text(maneuverText).removeClass("hide");
                }
                dataInfoEl.find(".distDirInfo").text(thisStepObj.distance.text + ", " + thisStepObj.duration.text);
                dataInfoEl.find(".instructionsInfo").html(thisStepObj.instructions);
                dataInfoEl.removeClass("hide").removeAttr("id").appendTo(resultClone.find(".directionsBody"));
              });
              if(thisLegObj.arrival_time && thisLegObj.departure_time) {
                var departureTimeText = thisLegObj.departure_time.text;
                var departureTimeZoneText = thisLegObj.departure_time.time_zone;
                var arrivalTimeText = thisLegObj.arrival_time.text;
                var arrivalTimeZoneText = thisLegObj.arrival_time.time_zone;
                resultClone.find(".departureTimeValue").text(departureTimeText).addBack().find(".depTimeZoneValue").text(departureTimeZoneText);
                resultClone.find(".arrivalTimeValue").text(arrivalTimeText).addBack().find(".arrTimeZoneValue").text(arrivalTimeZoneText);4
                resultClone.find(".arrDepDetails").removeClass("hide");
              }
            });

            if(dataObj.warnings.length > 0) {
              var warningMessage = "";
              $.each(dataObj.warnings, function(e, warningString) {
                warningMessage += (warningMessage === "") ? (warningString) : (" " + warningString);
              });
              resultClone.find(".warningMessage").text(warningMessage).removeClass("hide");
            }

            resultClone.removeAttr("id").removeClass("hide");
            resultClone.appendTo(parentResultHolder);
          });
        }
        else {
          console.error("ERROR Directions Service Request, ->", status);
        }
      });
    })();
    
    (function directionDrivingOptions() {
      var locationCoords = new google.maps.LatLng(40.7128, -74.0060);
      var map = new google.maps.Map(document.getElementById("gMap3"), {
        center: locationCoords,
        zoom: 12
      });

      var directionsObj = {
        origin: "Empire State Building, New York, USA",
        destination: "New York Hall of Science, New York, USA",
        travelMode: "DRIVING",
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: "bestguess"
        }
      };

      var directionService = new google.maps.DirectionsService();
      var directionDisplay = new google.maps.DirectionsRenderer();
      directionDisplay.setMap(map);
      directionService.route(directionsObj, function(results, status) {
        if(status === "OK") {
          //Do Not Delete This
          console.log(results);
          directionDisplay.setDirections(results);
          var routesArray = results.routes;
          var parentResultHolder = $("#gMap3ResultHolder");
          $.each(routesArray, function(index, dataObj) {
            var resultClone = $("#directionResultClone").clone();
            resultClone.find(".copyrightValue").text(dataObj.copyrights);
            
            var legsArray = dataObj.legs;
            $.each(legsArray, function(q, thisLegObj) {
              var distanceText = thisLegObj.distance.text;
              var durationText = thisLegObj.duration.text;
              resultClone.find(".distanceDurationValue").text(distanceText + ", " + durationText);
              resultClone.find(".originLocationValue").text(thisLegObj.start_address);
              resultClone.find(".destinationLocationValue").text(thisLegObj.end_address);
              $.each(thisLegObj.steps, function(w, thisStepObj) {
                var dataInfoEl = $("#dataInfoClone").clone();
                dataInfoEl.find(".travelModeInfo").text(thisStepObj.travel_mode);
                if(thisStepObj.maneuver !== "" || !!thisStepObj.maneuver) {
                  var maneuverText = thisStepObj.maneuver;
                  dataInfoEl.find(".maneuverInfo").text(maneuverText).removeClass("hide");
                }
                dataInfoEl.find(".distDirInfo").text(thisStepObj.distance.text + ", " + thisStepObj.duration.text);
                dataInfoEl.find(".instructionsInfo").html(thisStepObj.instructions);
                dataInfoEl.removeClass("hide").removeAttr("id").appendTo(resultClone.find(".directionsBody"));
              });
              if(thisLegObj.duration_in_traffic) {
                resultClone.find(".durationInTraffic").find(".durationInTrafficValue").text(thisLegObj.duration_in_traffic.text).addBack().removeClass("hide");
              }
            });

            if(dataObj.warnings.length > 0) {
              var warningMessage = "";
              $.each(dataObj.warnings, function(e, warningString) {
                warningMessage += (warningMessage === "") ? (warningString) : (" " + warningString);
              });
              resultClone.find(".warningMessage").text(warningMessage).removeClass("hide");
            }

            resultClone.removeAttr("id").removeClass("hide");
            resultClone.appendTo(parentResultHolder);
          });
        }
        else {
          console.error("ERROR Directions Service Request, ->", status);
        }
      });
    })();
    
    (function unitSystemMetric() {
      var locationCoords = new google.maps.LatLng(40.7128, -74.0060);
      var map = new google.maps.Map(document.getElementById("gMap4"), {
        center: locationCoords,
        zoom: 12
      });

      var directionsObj = {
        origin: "Empire State Building, NYC, USA",
        destination: "Queens Zoom NYC, USA",
        travelMode: "DRIVING",
        unitSystem: google.maps.UnitSystem.METRIC
      };

      var directionService = new google.maps.DirectionsService();
      var directionDisplay = new google.maps.DirectionsRenderer();
      directionDisplay.setMap(map);
      directionService.route(directionsObj, function(results, status) {
        if(status === "OK") {
          //Do Not Delete This
          console.log(results);
          directionDisplay.setDirections(results);
          var routesArray = results.routes;
          var parentResultHolder = $("#gMap4ResultHolder");
          $.each(routesArray, function(index, dataObj) {
            var resultClone = $("#directionResultClone").clone();
            resultClone.find(".copyrightValue").text(dataObj.copyrights);
      
            var legsArray = dataObj.legs;
            $.each(legsArray, function(q, thisLegObj) {
              var distanceText = thisLegObj.distance.text;
              var durationText = thisLegObj.duration.text;
              resultClone.find(".distanceDurationValue").text(distanceText + ", " + durationText);
              resultClone.find(".originLocationValue").text(thisLegObj.start_address);
              resultClone.find(".destinationLocationValue").text(thisLegObj.end_address);
              $.each(thisLegObj.steps, function(w, thisStepObj) {
                var dataInfoEl = $("#dataInfoClone").clone();
                dataInfoEl.find(".travelModeInfo").text(thisStepObj.travel_mode);
                if(thisStepObj.maneuver !== "" || !!thisStepObj.maneuver) {
                  var maneuverText = thisStepObj.maneuver;
                  dataInfoEl.find(".maneuverInfo").text(maneuverText).removeClass("hide");
                }
                dataInfoEl.find(".distDirInfo").text(thisStepObj.distance.text + ", " + thisStepObj.duration.text);
                dataInfoEl.find(".instructionsInfo").html(thisStepObj.instructions);
                dataInfoEl.removeClass("hide").removeAttr("id").appendTo(resultClone.find(".directionsBody"));
              });
            });
            
            resultClone.removeAttr("id").removeClass("hide");
            resultClone.appendTo(parentResultHolder);
          });
        }
        else {
          console.error("ERROR Directions Service Request, ->", status);
        }
      });
    })();
    
    (function usingWaypoints() {
      var locationCoords = new google.maps.LatLng(40.7128, -74.0060);
      var map = new google.maps.Map(document.getElementById("gMap5"), {
        center: locationCoords,
        zoom: 12
      });

      var directionsObj = {
        origin: "Brooklyn Bridge, NYC, USA",
        destination: "Robert F Kennedy Bridge, NYC, USA",
        travelMode: "DRIVING",
        waypoints: [
        {location: "Williamsburg Bridge,NYC", stopover: false},
        {location: "Pulaski Bridge, NYC", stopover: true}
        ],
        optimizeWaypoints: true
      };

      var directionService = new google.maps.DirectionsService();
      var directionDisplay = new google.maps.DirectionsRenderer();
      directionDisplay.setMap(map);
      directionService.route(directionsObj, function(results, status) {
        if(status === "OK") {
          //Do Not Delete This
          console.log(results);
          directionDisplay.setDirections(results);
          var routesArray = results.routes;
          var parentResultHolder = $("#gMap5ResultHolder");
          $.each(routesArray, function(index, dataObj) {
      
            var legsArray = dataObj.legs;
            $.each(legsArray, function(q, thisLegObj) {
              var resultClone = $("#directionResultClone").clone();
              resultClone.find(".copyrightValue").text(dataObj.copyrights);
              var distanceText = thisLegObj.distance.text;
              var durationText = thisLegObj.duration.text;
              resultClone.find(".distanceDurationValue").text(distanceText + ", " + durationText);
              resultClone.find(".originLocationValue").text(thisLegObj.start_address);
              resultClone.find(".destinationLocationValue").text(thisLegObj.end_address);
              $.each(thisLegObj.steps, function(w, thisStepObj) {
                var dataInfoEl = $("#dataInfoClone").clone();
                dataInfoEl.find(".travelModeInfo").text(thisStepObj.travel_mode);
                if(thisStepObj.maneuver !== "" || !!thisStepObj.maneuver) {
                  var maneuverText = thisStepObj.maneuver;
                  dataInfoEl.find(".maneuverInfo").text(maneuverText).removeClass("hide");
                }
                dataInfoEl.find(".distDirInfo").text(thisStepObj.distance.text + ", " + thisStepObj.duration.text);
                dataInfoEl.find(".instructionsInfo").html(thisStepObj.instructions);
                dataInfoEl.removeClass("hide").removeAttr("id").appendTo(resultClone.find(".directionsBody"));
              });
              resultClone.removeAttr("id").removeClass("hide");
              resultClone.appendTo(parentResultHolder);
            });
            
          });
        }
        else {
          console.error("ERROR Directions Service Request, ->", status);
        }
      });
    })();
    
    (function providingRouteAlternatives() {
      var locationCoords = new google.maps.LatLng(40.7128, -74.0060);
      var map = new google.maps.Map(document.getElementById("gMap6"), {
        center: locationCoords,
        zoom: 12
      });

      var directionsObj = {
        origin: "Empire State Building, NYC, USA",
        destination: "Central Park Zoo, NYC, USA",
        travelMode: "WALKING",
        provideRouteAlternatives: true
      };

      var directionService = new google.maps.DirectionsService();
      var directionDisplay = new google.maps.DirectionsRenderer();
      directionDisplay.setMap(map);
      directionService.route(directionsObj, function(results, status) {
        if(status === "OK") {
          var routesArray = results.routes;
          var polylineRoutesArray = [];
          var routeInstructionsArray = [];
          console.log(routesArray);
          var parentResultHolder = $("#gMap6ResultHolder");
          $.each(routesArray, function(index, dataObj) {
            var polylineRoutePath = new google.maps.Polyline({
              path: dataObj.overview_path,
              geodesic: true,
              map: map,
              strokeWeight: 4
            });
            Array.prototype.push.call(polylineRoutesArray, polylineRoutePath);
            var legsArray = dataObj.legs;
            $.each(legsArray, function(q, thisLegObj) {
              var resultClone = $("#directionResultClone").clone();
              resultClone.find(".copyrightValue").text(dataObj.copyrights);
              var distanceText = thisLegObj.distance.text;
              var durationText = thisLegObj.duration.text;
              resultClone.find(".distanceDurationValue").text(distanceText + ", " + durationText);
              resultClone.find(".originLocationValue").text(thisLegObj.start_address);
              resultClone.find(".destinationLocationValue").text(thisLegObj.end_address);
              $.each(thisLegObj.steps, function(w, thisStepObj) {
                var dataInfoEl = $("#dataInfoClone").clone();
                dataInfoEl.find(".travelModeInfo").text(thisStepObj.travel_mode);
                if(thisStepObj.maneuver !== "" || !!thisStepObj.maneuver) {
                  var maneuverText = thisStepObj.maneuver;
                  dataInfoEl.find(".maneuverInfo").text(maneuverText).removeClass("hide");
                }
                dataInfoEl.find(".distDirInfo").text(thisStepObj.distance.text + ", " + thisStepObj.duration.text);
                dataInfoEl.find(".instructionsInfo").html(thisStepObj.instructions);
                dataInfoEl.removeClass("hide").removeAttr("id").appendTo(resultClone.find(".directionsBody"));
              });
              resultClone.removeAttr("id");
              resultClone.appendTo(parentResultHolder);
              Array.prototype.push.call(routeInstructionsArray, resultClone);
            });
            if(index === 0) {
              polylineRoutePath.setOptions({
                strokeColor: "#0000ff",
                strokeOpacity: 0.7
              });
              map.setOptions({
                center: dataObj.overview_path[0],
                zoom: 14
              });

              var startMarker = new google.maps.Marker({
                position: dataObj.overview_path[0],
                map: map,
                animation: google.maps.Animation.BOUNCE
              });

              var endMarker = new google.maps.Marker({
                position: dataObj.overview_path[dataObj.overview_path.length - 1],
                map: map,
                animation: google.maps.Animation.BOUNCE
              });
              $(routeInstructionsArray[0]).removeClass("hide");
            }
            else {
              polylineRoutePath.setOptions({
                strokeColor: "#000000",
                strokeOpacity: 0.3
              });
            }
          });
          function resetPolylineColor() {
            $.each(polylineRoutesArray, function(q, polylinePath) {
              polylinePath.setOptions({
                strokeColor: "#000000",
                strokeOpacity: 0.3
              });
            });
          }
          function resetRoutesInstructions() {
            $.each(routeInstructionsArray, function(q, routesElement) {
              $(routesElement).addClass("hide");
            });
          }
          $.each(polylineRoutesArray, function(q, polylinePath) {
            polylinePath.addListener("click", function(event) {
              resetPolylineColor();
              resetRoutesInstructions();
              polylinePath.setOptions({
                strokeColor: "#0000ff",
                strokeOpacity: 0.7
              });
              $(routeInstructionsArray[q]).removeClass("hide");
            });
          });
        }
        else {
          console.error("ERROR Directions Service Request, ->", status);
        }
      });
    })();
    
    (function draggableRoutes() {
      var locationCoords = new google.maps.LatLng(40.7128, -74.0060);
      var map = new google.maps.Map(document.getElementById("gMap7"), {
        center: locationCoords,
        zoom: 12
      });


      var directionsObj = {
        origin: "Empire State Building, NYC, USA",
        destination: "Belleuve Hospital Center, NYC, USA",
        travelMode: "WALKING",
      };

      var directionService = new google.maps.DirectionsService();
      var directionDisplay = new google.maps.DirectionsRenderer({
        draggable: true
      });
      directionDisplay.setMap(map);
      
      directionDisplay.addListener("directions_changed", function() {
        console.log(directionDisplay.getDirections());
        placeRouteInstructions(directionDisplay.getDirections());
      });

      function placeRouteInstructions(results) {
        var routesArray = results.routes;
        var parentResultHolder = $("#gMap7ResultHolder");
        parentResultHolder.empty();
        $.each(routesArray, function(index, dataObj) {
          var resultClone = $("#directionResultClone").clone();
          resultClone.find(".copyrightValue").text(dataObj.copyrights);
    
          var legsArray = dataObj.legs;
          $.each(legsArray, function(q, thisLegObj) {
            var distanceText = thisLegObj.distance.text;
            var durationText = thisLegObj.duration.text;
            resultClone.find(".distanceDurationValue").text(distanceText + ", " + durationText);
            resultClone.find(".originLocationValue").text(thisLegObj.start_address);
            resultClone.find(".destinationLocationValue").text(thisLegObj.end_address);
            $.each(thisLegObj.steps, function(w, thisStepObj) {
              var dataInfoEl = $("#dataInfoClone").clone();
              dataInfoEl.find(".travelModeInfo").text(thisStepObj.travel_mode);
              if(thisStepObj.maneuver !== "" || !!thisStepObj.maneuver) {
                var maneuverText = thisStepObj.maneuver;
                dataInfoEl.find(".maneuverInfo").text(maneuverText).removeClass("hide");
              }
              dataInfoEl.find(".distDirInfo").text(thisStepObj.distance.text + ", " + thisStepObj.duration.text);
              dataInfoEl.find(".instructionsInfo").html(thisStepObj.instructions);
              dataInfoEl.removeClass("hide").removeAttr("id").appendTo(resultClone.find(".directionsBody"));
            });
          });
          
          resultClone.removeAttr("id").removeClass("hide");
          resultClone.appendTo(parentResultHolder);
        });
      }
      directionService.route(directionsObj, function(results, status) {
        if(status === "OK") {
          directionDisplay.setDirections(results);
          placeRouteInstructions(results);
        }
        else {
          console.error("ERROR Directions Service Request, ->", status);
        }
      });
    })();
  }
}

function googleMapsDistanceAPI() {
  if(document.location.href.indexOf("distance-matrix-service") > -1) {
    (function distanceMatrixBasic() {
      var locationCoords = new google.maps.LatLng(55.7558, 37.6173);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        center: locationCoords,
        zoom: 14,
      });

      var distanceObj = {
        origins: ["Red Square, Moscow"],
        destinations: ["Moscow Zoo, Moscow"],
        travelMode: "DRIVING"
      }

      var distanceService = new google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix(distanceObj, function(response, status) {
        if(status === "OK") {
          console.log(response);
          var originAddress = response.originAddresses[0];
          var destinationAddress = response.destinationAddresses[0];
          var distanceText = response.rows[0].elements[0].distance.text;
          var durationText = response.rows[0].elements[0].duration.text;
          console.log(originAddress, destinationAddress, distanceText, durationText);
          
          var infoContent = "<b>Origin Address: </b>" + originAddress + "<br/>" + 
            "<b>Destination Address: </b>" + destinationAddress + "<br/>" + 
            "<b>Distance/Duration: </b>" + distanceText + "/" + durationText;
          var infoWindow = new google.maps.InfoWindow({
            content: infoContent,
            position: map.getCenter()
          });
          infoWindow.open(map);
        }
      });
    })();

    (function distanceMatrixTransit() {
      var locationCoords = new google.maps.LatLng(55.7558, 37.6173);
      var map = new google.maps.Map(document.getElementById("gMap2"), {
        center: locationCoords,
        zoom: 14,
      });

      var distanceObj = {
        origins: ["Red Square, Moscow"],
        destinations: ["Moscow Zoo, Moscow"],
        travelMode: "TRANSIT",
        transitOptions: {
          departureTime: new Date(),
          modes: ["SUBWAY"]
        }
      }

      var distanceService = new google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix(distanceObj, function(response, status) {
        if(status === "OK") {
          console.log(response);
          var resultHolderParent = $("#gMap2ResultHolder");
          var infoClone = $("#durationInfoClone");

          var originText = response.originAddresses[0];
          infoClone.find(".originLocationValue").text(originText);

          var destinationText = response.destinationAddresses[0];
          infoClone.find(".destinationLocationValue").text(destinationText);

          var distanceDurationText = response.rows[0].elements[0].distance.text + "/" + response.rows[0].elements[0].duration.text;
          infoClone.find(".distanceDurationValue").text(distanceDurationText);

          var fareAmount = response.rows[0].elements[0].fare.value + response.rows[0].elements[0].fare.currency;
          infoClone.find(".expectedTravelFareValue").text(fareAmount);
          infoClone.removeAttr("id").removeClass("hide").appendTo(resultHolderParent);
        }
      });
    })();

    (function distanceMatrixDriving() {
      var locationCoords = new google.maps.LatLng(55.7558, 37.6173);
      var map = new google.maps.Map(document.getElementById("gMap3"), {
        center: locationCoords,
        zoom: 14,
      });

      var distanceObj = {
        origins: ["Red Square, Moscow"],
        destinations: ["Moscow Zoo, Moscow"],
        travelMode: "DRIVING",
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: "pessimistic"
        }
      }

      var distanceService = new google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix(distanceObj, function(response, status) {
        if(status === "OK") {
          console.log(response);
          var resultHolderParent = $("#gMap3ResultHolder");
          var infoClone = $("#durationInfoClone");

          var originText = response.originAddresses[0];
          infoClone.find(".originLocationValue").text(originText);

          var destinationText = response.destinationAddresses[0];
          infoClone.find(".destinationLocationValue").text(destinationText);

          var distanceDurationText = response.rows[0].elements[0].distance.text + "/" + response.rows[0].elements[0].duration.text;
          infoClone.find(".distanceDurationValue").text(distanceDurationText);
          infoClone.find(".expectedTravelFare").html('<b>Expected Duration In Traffic: </b> <span class="durationInTraffic">' + response.rows[0].elements[0].duration_in_traffic.text + '</span>');
          infoClone.removeAttr("id").removeClass("hide").appendTo(resultHolderParent);
        }
      });
    })();
    
    (function distanceMatrixUnitSytem() {
      var locationCoords = new google.maps.LatLng(55.7558, 37.6173);
      var map = new google.maps.Map(document.getElementById("gMap4"), {
        center: locationCoords,
        zoom: 14,
      });

      var distanceObj = {
        origins: ["Red Square, Moscow"],
        destinations: ["Moscow Zoo, Moscow"],
        travelMode: "DRIVING",
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }

      var distanceService = new google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix(distanceObj, function(response, status) {
        if(status === "OK") {
          console.log(response);
          var originAddress = response.originAddresses[0];
          var destinationAddress = response.destinationAddresses[0];
          var distanceText = response.rows[0].elements[0].distance.text;
          var durationText = response.rows[0].elements[0].duration.text;
          console.log(originAddress, destinationAddress, distanceText, durationText);
          
          var infoContent = "<b>Origin Address: </b>" + originAddress + "<br/>" + 
            "<b>Destination Address: </b>" + destinationAddress + "<br/>" + 
            "<b>Distance/Duration: </b>" + distanceText + "/" + durationText;
          var infoWindow = new google.maps.InfoWindow({
            content: infoContent,
            position: map.getCenter()
          });
          infoWindow.open(map);
        }
      });
    })();
  }
}

function googleMapsElevationServiceAPI() {
  if(document.location.href.indexOf("elevation-service") > -1) {
    (function locationElevationRequest1() {
      var locationCoords = new google.maps.LatLng(35.3606, 138.7278);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        center: locationCoords,
        zoom: 12,
        mapTypeId: "terrain"
      });

      var elevationRequest = new google.maps.ElevationService();
      elevationRequest.getElevationForLocations({locations: [locationCoords]}, function (results, status) {
        if(status === "OK") {
          console.log(results);
          var marker = new google.maps.Marker({
            position: locationCoords,
            map: map
          });

          var contentString = "<b>Elevation of Location: </b>" + results[0].elevation + " mts" + "<br/>" + 
            "<b>Lat-Lng Coordinates: </b>" + results[0].location.lat() + "/" + results[0].location.lng();
          var infoWindow = new google.maps.InfoWindow({
            content: contentString,
          });
          infoWindow.open(map, marker);
        }
      });
    })();
    
    (function locationElevationRequest2() {
      var locationCoords = new google.maps.LatLng(17.7500, 142.5000);
      var map = new google.maps.Map(document.getElementById("gMap2"), {
        center: locationCoords,
        zoom: 4,
        mapTypeId: "terrain"
      });

      var elevationRequest = new google.maps.ElevationService();
      elevationRequest.getElevationForLocations({locations: [locationCoords]}, function (results, status) {
        if(status === "OK") {
          console.log(results);
          var marker = new google.maps.Marker({
            position: locationCoords,
            map: map
          });

          var contentString = "<b>Elevation of Location: </b>" + results[0].elevation + " mts" + "<br/>" + 
            "<b>Lat-Lng Coordinates: </b>" + results[0].location.lat() + "/" + results[0].location.lng();
          var infoWindow = new google.maps.InfoWindow({
            content: contentString,
          });
          infoWindow.open(map, marker);
        }
      });
    })();
    
    (function pathElevationRequest() {
      var locationCoords = new google.maps.LatLng(28.5983, 83.9311);
      var map = new google.maps.Map(document.getElementById("gMap3"), {
        center: locationCoords,
        zoom: 9,
      });

      var latLngArray = [
        new google.maps.LatLng(28.7458, 83.5592),
        new google.maps.LatLng(28.490419194161678, 84.188232421875),
        new google.maps.LatLng(28.55075099675815, 84.55902099609375),
        new google.maps.LatLng(28.897588157944504,84.25689697265625)
      ];

      var elevationRequest = new google.maps.ElevationService();
      elevationRequest.getElevationAlongPath({
        path: latLngArray,
        samples: 8,
      }, function(result, status) {
        if(status === "OK") {
          var polyPath = new google.maps.Polyline({
            map: map,
            path: latLngArray,
            strokeColor: "#0000ff",
            strokeWeight: 4,
            strokeOpacity: 0.8,
          });

          $.each(result, function(index, resultObj) {
            var latCoords = resultObj.location.lat();
            var lngCoords = resultObj.location.lng();
            var elevationVal = resultObj.elevation;

            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(latCoords, lngCoords),
              map: map,
              animation: google.maps.Animation.BOUNCE
            });

            var contentString = "<b>Elevation(mts): </b>" + elevationVal + "<br/>"
               + "<b>Lat-Lng Coordinates: </b>" + latCoords + "/" + lngCoords;
            var infoWindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 250
            });
            marker.addListener("click", function() {
              infoWindow.open(map, marker);
            });
          });
        }
      });
    })();
  }
}

function googleMapsGeocodingServiceAPI() {
  if(document.location.href.indexOf("geocoding-service") > -1) {
    (function geocodingSearchByAddress() {
      var locationCoords = new google.maps.LatLng(19.0760, 72.8777);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        center: locationCoords,
        zoom: 14,
      });

      var geocodeService = new google.maps.Geocoder();
      geocodeService.geocode({
        address: "Gateway of India, Mumbai"
      }, function(result, status) {
        if(status === "OK") {
          Array.prototype.forEach.call(result, function(thisResultObj, index) {
            var viewportToSet = thisResultObj.geometry.viewport;
            var newView = new google.maps.LatLngBounds({lat: viewportToSet.f.b, lng: viewportToSet.b.b}, {lat: viewportToSet.f.f, lng: viewportToSet.b.f});
            map.fitBounds(newView);
            map.setZoom(map.getZoom() - 1);

            var markerPos = new google.maps.LatLng(thisResultObj.geometry.location.lat(), thisResultObj.geometry.location.lng());

            var marker = new google.maps.Marker({
              map: map,
              position: markerPos,
              animation: google.maps.Animation.BOUNCE
            });

            var typeString = "";
            Array.prototype.forEach.call(thisResultObj.types, function(typeStringVal, q) {
              typeString += (typeString === "") ? (typeStringVal) : ", " + (typeStringVal);
            });

            var contentString = "<b>Formatted Address Details: </b>" + thisResultObj.formatted_address + "<br/><br/>" + 
              "<b>Location Type: </b>" + thisResultObj.geometry.location_type + "<br/><br/>" + 
              "<b>Place Id Value: </b>" + thisResultObj.place_id + "<br/><br/>" + 
              "<b>Type String: </b>" + typeString;

            var infoWindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 250
            });

            marker.addListener("click", function() {
              infoWindow.open(map, marker);
            });
          });
        }
      });
    })();

    (function geocodingSearchByLocation() {
      var locationCoords = new google.maps.LatLng(19.0760, 72.8777);
      var map = new google.maps.Map(document.getElementById("gMap2"), {
        center: locationCoords,
        zoom: 14,
      });

      var geocodeService = new google.maps.Geocoder();
      geocodeService.geocode({
        location: {lat: 18.925753088421104, lng: 72.81907796859741}
      }, function(result, status) {
        if(status === "OK") {
          Array.prototype.forEach.call(result, function(thisResultObj, index) {
            if(thisResultObj.geometry.location_type !== "APPROXIMATE") {
              var viewportToSet = thisResultObj.geometry.viewport;
              var newView = new google.maps.LatLngBounds({lat: viewportToSet.f.b, lng: viewportToSet.b.b}, {lat: viewportToSet.f.f, lng: viewportToSet.b.f});
              map.fitBounds(newView);
              map.setZoom(map.getZoom() - 1);

              var markerPos = new google.maps.LatLng(thisResultObj.geometry.location.lat(), thisResultObj.geometry.location.lng());

              var marker = new google.maps.Marker({
                map: map,
                position: markerPos,
                animation: google.maps.Animation.BOUNCE
              });

              var typeString = "";
              Array.prototype.forEach.call(thisResultObj.types, function(typeStringVal, q) {
                typeString += (typeString === "") ? (typeStringVal) : ", " + (typeStringVal);
              });

              var contentString = "<b>Formatted Address Details: </b>" + thisResultObj.formatted_address + "<br/><br/>" + 
                "<b>Location Type: </b>" + thisResultObj.geometry.location_type + "<br/><br/>" + 
                "<b>Place Id Value: </b>" + thisResultObj.place_id + "<br/><br/>" + 
                "<b>Type String: </b>" + typeString;

              var infoWindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 250
              });

              marker.addListener("click", function() {
                infoWindow.open(map, marker);
              });
            }
          });
        }
      });      
    })();

    (function geocodingSearchByPlaceId() {
      var locationCoords = new google.maps.LatLng(19.0760, 72.8777);
      var map = new google.maps.Map(document.getElementById("gMap3"), {
        center: locationCoords,
        zoom: 14,
      });

      var geocodeService = new google.maps.Geocoder();
      geocodeService.geocode({
        placeId: "ChIJcaKto-7R5zsRIXL2witf0x8"
      }, function(result, status) {
        if(status === "OK") {
          Array.prototype.forEach.call(result, function(thisResultObj, index) {
            var viewportToSet = thisResultObj.geometry.viewport;
            var newView = new google.maps.LatLngBounds({lat: viewportToSet.f.b, lng: viewportToSet.b.b}, {lat: viewportToSet.f.f, lng: viewportToSet.b.f});
            map.fitBounds(newView);
            map.setZoom(map.getZoom() - 1);

            var markerPos = new google.maps.LatLng(thisResultObj.geometry.location.lat(), thisResultObj.geometry.location.lng());

            var marker = new google.maps.Marker({
              map: map,
              position: markerPos,
              animation: google.maps.Animation.BOUNCE
            });

            var typeString = "";
            Array.prototype.forEach.call(thisResultObj.types, function(typeStringVal, q) {
              typeString += (typeString === "") ? (typeStringVal) : ", " + (typeStringVal);
            });

            var contentString = "<b>Formatted Address Details: </b>" + thisResultObj.formatted_address + "<br/><br/>" + 
              "<b>Location Type: </b>" + thisResultObj.geometry.location_type + "<br/><br/>" + 
              "<b>Place Id Value: </b>" + thisResultObj.place_id + "<br/><br/>" + 
              "<b>Type String: </b>" + typeString;

            var infoWindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 250
            });

            marker.addListener("click", function() {
              infoWindow.open(map, marker);
            });
          });
        }
      });      
    })();
    
    (function viewportBiasBounds() {
      var locationCoords = new google.maps.LatLng(19.0435385, 72.8194558);
      var map = new google.maps.Map(document.getElementById("gMap4"), {
        center: locationCoords,
        zoom: 14,
      });

      var geoBounds = new google.maps.LatLngBounds({lat: 19.025282514598818, lng: 72.79224747175294}, {lat: 19.061792477774144, lng: 72.84666412824708});
      var geocodeService = new google.maps.Geocoder();
      geocodeService.geocode({
        address: "Taj Hotels",
        bounds: geoBounds
      }, function(result, status) {
        if(status === "OK") {
          Array.prototype.forEach.call(result, function(thisResultObj, index) {
            var viewportToSet = thisResultObj.geometry.viewport;
            var newView = new google.maps.LatLngBounds({lat: viewportToSet.f.b, lng: viewportToSet.b.b}, {lat: viewportToSet.f.f, lng: viewportToSet.b.f});
            map.fitBounds(newView);
            map.setZoom(map.getZoom() - 1);

            var markerPos = new google.maps.LatLng(thisResultObj.geometry.location.lat(), thisResultObj.geometry.location.lng());

            var marker = new google.maps.Marker({
              map: map,
              position: markerPos,
              animation: google.maps.Animation.BOUNCE
            });

            var typeString = "";
            Array.prototype.forEach.call(thisResultObj.types, function(typeStringVal, q) {
              typeString += (typeString === "") ? (typeStringVal) : ", " + (typeStringVal);
            });

            var contentString = "<b>Formatted Address Details: </b>" + thisResultObj.formatted_address + "<br/><br/>" + 
              "<b>Location Type: </b>" + thisResultObj.geometry.location_type + "<br/><br/>" + 
              "<b>Place Id Value: </b>" + thisResultObj.place_id + "<br/><br/>" + 
              "<b>Type String: </b>" + typeString;

            var infoWindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 250
            });

            marker.addListener("click", function() {
              infoWindow.open(map, marker);
            });
          });
        }
      });      
    })();
    
    (function componentRestrictions() {
      var locationCoords = new google.maps.LatLng(19.0435385, 72.8194558);
      var map = new google.maps.Map(document.getElementById("gMap5"), {
        center: locationCoords,
        zoom: 14,
      });

      var geocodeService = new google.maps.Geocoder();
      geocodeService.geocode({
        address: "Mahatma Gandhi Road",
        componentRestrictions: {
          locality: "Bangalore"
        }
      }, function(result, status) {
        if(status === "OK") {
          console.log(result);
          Array.prototype.forEach.call(result, function(thisResultObj, index) {
            var viewportToSet = thisResultObj.geometry.viewport;
            var newView = new google.maps.LatLngBounds({lat: viewportToSet.f.b, lng: viewportToSet.b.b}, {lat: viewportToSet.f.f, lng: viewportToSet.b.f});
            map.fitBounds(newView);
            map.setZoom(map.getZoom() - 1);

            var markerPos = new google.maps.LatLng(thisResultObj.geometry.location.lat(), thisResultObj.geometry.location.lng());

            var marker = new google.maps.Marker({
              map: map,
              position: markerPos,
              animation: google.maps.Animation.BOUNCE
            });

            var typeString = "";
            Array.prototype.forEach.call(thisResultObj.types, function(typeStringVal, q) {
              typeString += (typeString === "") ? (typeStringVal) : ", " + (typeStringVal);
            });

            var contentString = "<b>Formatted Address Details: </b>" + thisResultObj.formatted_address + "<br/><br/>" + 
              "<b>Location Type: </b>" + thisResultObj.geometry.location_type + "<br/><br/>" + 
              "<b>Place Id Value: </b>" + thisResultObj.place_id + "<br/><br/>" + 
              "<b>Type String: </b>" + typeString;

            var infoWindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 250
            });

            marker.addListener("click", function() {
              infoWindow.open(map, marker);
            });
          });
        }
      });      
    })();
  }
}

function drawingLayerLibrary() {
  if(document.location.href.indexOf("google-maps-drawing-library") > -1) {
    var baseUrl = window.location.origin + "/dawg-google-maps";
    var imagesSrc = baseUrl + "/assets/images/";
    (function createBasicDrawingLib() {
      var locationCoords = new google.maps.LatLng(30.0444, 31.2357);
      var map = new google.maps.Map(document.getElementById("gMap1"), {
        center: locationCoords,
        zoom: 14
      });

      var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: true,
        drawingOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER,
          drawingModes: ["marker", "circle", "polygon", "polyline", "rectangle"]
        },
        markerOptions: {
          icon: imagesSrc + "polymarker.png"
        }
      });
      drawingManager.setMap(map);
    })();
    
    (function hideShowDrawingManager() {
      var locationCoords = new google.maps.LatLng(30.0444, 31.2357);
      var map = new google.maps.Map(document.getElementById("gMap2"), {
        center: locationCoords,
        zoom: 14
      });

      var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER,
          drawingModes: ["marker", "circle", "polygon", "polyline", "rectangle"]
        },
        markerOptions: {
          icon: imagesSrc + "polymarker.png"
        }
      });
      drawingManager.setMap(map);

      function hideDrawingManager() {
        drawingManager.setOptions({
          drawingControl: false
        });
        setTimeout(function() {
          showDrawingManager();
        }, 2000);
      }
      hideDrawingManager();

      function showDrawingManager() {
        drawingManager.setOptions({
          drawingControl: true
        });
        setTimeout(function() {
          hideDrawingManager();
        }, 2000);
      }
    })();
    
    (function enableDisableDrawingManager() {
      var locationCoords = new google.maps.LatLng(30.0444, 31.2357);
      var map = new google.maps.Map(document.getElementById("gMap3"), {
        center: locationCoords,
        zoom: 14
      });

      var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER,
          drawingModes: ["marker", "circle", "polygon", "polyline", "rectangle"]
        },
        markerOptions: {
          icon: imagesSrc + "polymarker.png"
        }
      });

      function enableDrawingManager() {
        drawingManager.setMap(map);
        setTimeout(function() {
          disableDrawingManager();
        }, 6000);
      }
      enableDrawingManager();

      function disableDrawingManager() {
        drawingManager.setMap(null);
        setTimeout(function() {
          enableDrawingManager();
        }, 6000);
      }
    })();
    
    (function drawingManagerEvents() {
      var locationCoords = new google.maps.LatLng(30.0444, 31.2357);
      var map = new google.maps.Map(document.getElementById("gMap4"), {
        center: locationCoords,
        zoom: 14
      });

      var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER,
          drawingModes: ["marker", "circle", "polygon", "polyline", "rectangle"]
        },
        markerOptions: {
          icon: imagesSrc + "polymarker.png"
        }
      });
      drawingManager.setMap(map);

      google.maps.event.addListener(drawingManager, "overlaycomplete", function(event) {
        console.log(event.type, event.overlay);
      });
    })();
  }
}

function centralProcessor() {
  bubbleLoader();
  generalBodyFunctionality();
  documentScrollPercent();
  siteMenuFunctionality();
  toolTipFunctionality();
  dawgModalFunctionality();
  googleMapsJsBasics();
  googleMapsLocalizing();
  googlePlacesLibraryFunc();
  stylingYourGoogleMaps();
  googleMapMarkersAndInfoWindow();
  googleMapControlsAndEvents();
  drawingOnYourMapShapes();
  googleMapsDataLayers();
  googleMapsHeatLayers();
  trafficTransitBicycleLayers();
  googleMapsDirectionsAPI();
  googleMapsDistanceAPI();
  googleMapsElevationServiceAPI();
  googleMapsGeocodingServiceAPI();
  drawingLayerLibrary();

  $(window).resize(function() {
    toolTipFunctionality();
  });

  $(window).on("scroll", function() {
    documentScrollPercent();
  });
}

function googleAPIInit() {
  if(typeof google !== "object") {
    var gScriptTag = document.createElement("script");
    gScriptTag.type = "text/javascript";
    var baseUrl = "https://maps.googleapis.com/maps/api/js";
    var apiPass = "AIzaSyAlCo2dLOV-Dmyt-l4WMCDt7EORd0t8vLc";
    var setLangString = "el";
    var setRegionString = "GR";
    if(document.location.href.indexOf("map-localizing") === -1) {
      gScriptTag.setAttribute("src", baseUrl + "?key=" + apiPass + "&libraries=places,visualization,drawing");
    }
    else {
      gScriptTag.setAttribute("src", baseUrl + "?key=" + apiPass + "&libraries=places,visualization,drawing&language=" + setLangString + "&region=" + setRegionString);
    }
    gScriptTag.setAttribute("async", true)
    gScriptTag.setAttribute("defer", true);
    gScriptTag.onload = function() {
      centralProcessor();
    };
    document.body.appendChild(gScriptTag);
  }
}

$(document).ready(function() {
  googleAPIInit();
});
