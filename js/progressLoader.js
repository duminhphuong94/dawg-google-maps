(function progressLoaderFunc() {
  function loaderInit() {
    var loaderParent = document.getElementById("pageLoaderParent");
    var loaderBar = document.getElementById("loaderBar");
    var loaderText = document.getElementById("loadPercentValue");
    var documentImages = document.images;
    var docImageCount = documentImages.length;
    var iterateCount = 0;

    function imageLoadFunc() {
      iterateCount += 1;
      var percentageValue = Number.prototype.toFixed.call((100/docImageCount * iterateCount), 0) + "%";
      var textNode = document.createTextNode(percentageValue);
      loaderBar.style.width = percentageValue;
      loaderText.innerHTML = "";
      loaderText.appendChild(textNode);
      if(iterateCount === docImageCount) {
        setTimeout(function() {
          var finaleText = document.createTextNode("Let's Go!");
          loaderText.innerHTML = "";
          loaderText.appendChild(finaleText);
          loaderParent.className += " hiddenTransform";
        }, 1500);
        return;
      }
    }

    for (var i = 0; i < docImageCount; i ++) {
      var thisImage = new Image();
      thisImage.src = documentImages[i];
      thisImage.onload = function() {
        imageLoadFunc();
      };
      thisImage.onerror = function() {
        imageLoadFunc();
      };
    }
  }

  function documentInit() {
    document.onreadystatechange = function() {
      if(document.readyState === "interactive") {
        loaderInit();
      }
    };
  }
  documentInit();
})();
