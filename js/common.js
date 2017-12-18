(function jqueryInit($) {
	function restrictSiteScroll() {
		var siteContainer = $("#mainSiteBorder");
		var currentScrollPos = $(window).scrollTop();
		siteContainer.addClass("restrictScroll");
		siteContainer.scrollTop(currentScrollPos);
	}

	function destroyRestrictSiteScroll() {
		var siteContainer = $("#mainSiteBorder");
		var currentScrollPos = siteContainer.scrollTop();
		siteContainer.removeClass("restrictScroll");
		$(window).scrollTop(currentScrollPos);
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
    if($(".sourceCode").length > 0 && $(".dawgModalUnit").length > 0) {
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
            console.error("Google Places API - Service 1 Error, please check");
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
            var listParent = $("#gMap6").parent().next().find(".resultsUI");
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
    }
  }

  function centralProcessor() {
    generalBodyFunctionality();
    toolTipFunctionality();
    dawgModalFunctionality();
    googlePlacesLibraryFunc();

    $(window).resize(function() {
      toolTipFunctionality();
    });
  }

  $(document).ready(function() {
    centralProcessor();
  });
})(jQuery);
