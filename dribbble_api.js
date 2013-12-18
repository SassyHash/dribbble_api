var shotsArray = new Array();

var renderShots = function(){
  console.log(shotsArray.shots);
};

var ajaxRequest = function(option){
  option = option || "/popular"
  console.log(option);
  $.ajax({
        url           : "http://api.dribbble.com/shots" + option + "?per_page=20",
        dataType      : "jsonp",
        jsonpCallback : "dealJSONP"
      });
}

var dealJSONP = function(data){
  shots = data;
  if (shotsArray.length > 0) {
    renderShots();
  } else {
    $(".row").append("<h1> Oops. Something's wrong. There are no shots.</h1>");
  }
};

  ajaxRequest();

$(document).ready(function(){

  $("#everyone").click(function(){
    console.log("clicked");
    ajaxRequest("/everyone");
  })

  $("#popular").click(function(){
    ajaxRequest("/popular");
  })
  $(".pages").click(function(){

  })  
})


