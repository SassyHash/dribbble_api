var option = option || "/popular"

var ajaxRequest = function(page){
  console.log("called");
  page = page || 1
  $.ajax({
        url : "http://api.dribbble.com/shots" + option + "?per_page=18&page=" + page,
        dataType : "jsonp",
        jsonpCallback : "dealJSONP"
      });
}

var dealJSONP = function(data){
  var shotsArray = new Array();
  shotsArray = data.shots;
  console.log(data.page);
  console.log(data.per_page);

  if (shotsArray.length > 0) {
    paginate(data.total, data.per_page);
    clearPage();
    _.each(shotsArray, renderShot);
  } else {
    $(".row").append("<h1> Oops. Something's wrong. There are no shots.</h1>");
  }
};

var clearPage = function(){
  $(".shots").empty();
};


var renderShot = function(shot){
  var shotElement = $('<img>'); 
  console.log(shot.id);
  shotElement.attr('class', 'shot');
  shotElement.attr('src', shot.image_url);

  $('.shots').append(shotElement);

  //$(".shots").append(
  //  shot.image_400_url
  //   );
};


var paginate = function(total_items, itemspp){
  $(".pages").pagination({
      items: total_items,
      itemsOnPage: itemspp,
      displayedPages: 3
    });
}


ajaxRequest();

$(document).ready(function(){

  $("#everyone").click(function(){
    option = "/everyone";
    ajaxRequest();
  })

  $("#popular").click(function(){
    option = "/popular";
    ajaxRequest();

  })
  $(".page-link").click(function(){
    var page = this.text();
    ajaxRequest(page);
    console.log(page);
  })  
})


