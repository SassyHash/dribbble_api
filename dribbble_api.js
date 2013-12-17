var ajaxRequest = function(option){
  option = option || "/everyone"
  $.ajax({
        url           : 'http://api.dribbble.com/shots' + option,
        dataType      : 'jsonp',
        jsonpCallback : 'dealJSONP'
      });
}


var dealJSONP = function(data){
  console.log(data);
  $('body').html("<h1>It works!</h1>");
};



    


ajaxRequest();