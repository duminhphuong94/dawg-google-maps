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

  function siteMenuFunctionality() {
    var menuParent = $("#dawgNavParent");
    var menuButton = menuParent.find("#menuButton");
    var siteModal = $("#dawgMenuModal");
    var siteModalCloser = siteModal.find(".closeButton");
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
  
    siteModalCloser.on("click", function() {
      var $this = $(this);
      $this.parent().find(".posContainer").addClass("hiddenTransform");
      setTimeout(function() {
        $this.parent().addClass("hiddenTransform");
        destroyRestrictSiteScroll();
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
      /*
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
            console.log(result);
            console.log(pagination);
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
                console.log("next page");
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
            console.log(resultArray);
            map11.setZoom(18);
            map11.setCenter(resultArray[0].geometry.location);
            Array.prototype.forEach.call(resultArray, function(locationObj, index) {
              service.getDetails({
                placeId: locationObj.place_id
              }, processGooglePlaceId);
            });
          }
          else {
            console.error("Service Request Error, Status => ", status); 
          }
        }

        function processGooglePlaceId(result, status) {
          if(status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(result);
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
      */
    }
  }

  function centralProcessor() {
    generalBodyFunctionality();
    siteMenuFunctionality();
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
