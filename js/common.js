(function jqueryInit($) {
  function testInit() {
    console.log("Document initialized");
  }

  function centralProcessor() {
    testInit();
  }

  $(document).ready(function() {
    centralProcessor();
  });
})(jQuery);
