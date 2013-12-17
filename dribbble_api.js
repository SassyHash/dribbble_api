var ajaxRequest = function(option){
  option = option || "/popular"
  console.log(option);
  $.ajax({
        url           : 'http://api.dribbble.com/shots' + option + '?per_page=40?page=5',
        dataType      : 'jsonp',
        jsonpCallback : 'dealJSONP'
      });
}


var dealJSONP = function(data){
  console.log(data);
  $('.row').html("<span><h1> data here </h1></span>");
};



    


ajaxRequest("/everyone");
