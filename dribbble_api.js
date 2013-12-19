var api = (function() {

  var option;
  var itemsPp;

  var setOption = function(opt) {
    option = opt || "/popular";
  };

  var setItemsPp = function(pp) {
    itemsPp = pp || 18;
  }

  var ajaxRequest = function(page){
    console.log(itemsPp);

    page = page || 1
    $.ajax({
          url : "http://api.dribbble.com/shots" + option + "?per_page=" + itemsPp +"&page=" + page,
          dataType : "jsonp",
          jsonpCallback : "api.dealJSONP"
        });
  }

  var dealJSONP = function(data){
    var shotsArray = new Array();
    shotsArray = data.shots;

    if (shotsArray.length > 0) {
      clearPage();
      if (option == "/popular" && itemsPp == 30) {
        paginate(1000, data.page);
      } else {
        paginate(data.total, data.page);  
      };
      _.each(shotsArray, renderShot);
    } else {
      clearPage();
      $(".shots").append("<h1> Oops. Something's wrong. There are no shots.</h1>");
    }
  };

  var clearPage = function(){
    $(".shots").empty();
  };

  var renderShot = function(shot, index){
    var shotElement = $("<img>");
    shotElement.attr("class", "shot");
    shotElement.attr("id", "shot-"+index);
    shotElement.attr("src", shot.image_url);
    $(".shots").append(shotElement);
    $("#shot-"+index).wrap("<a href="+ shot.url+"></a>");
  };

  var paginate = function(total_items, page){
    $(".pages").pagination({
        items: total_items,
        itemsOnPage: itemsPp,
        currentPage: page,
        displayedPages: 3,
        onPageClick: pageFlip
      });
  }

  var pageFlip = function(page){
    ajaxRequest(page);
  }

  return {
    ajaxRequest: ajaxRequest, 
    dealJSONP: dealJSONP, 
    setItemsPp: setItemsPp,
    setOption: setOption,
  }

})();

api.setOption();
api.setItemsPp();
api.ajaxRequest();

$(document).ready(function(){
  $("#min").hide();

  $("#everyone").click(function(){
    api.setOption("/everyone");
    api.ajaxRequest();
  });

  $("#popular").click(function(){
    api.setOption("/popular");
    api.ajaxRequest();
  });

  $("#max").click(function(){
    api.setItemsPp(30);
    api.ajaxRequest();
    $("#max").hide();
    $("#min").show();
  });

  $("#min").click(function(){
    api.setItemsPp(18);
    api.ajaxRequest();
    $("#min").hide();
    $("#max").show();
  });

}); 
