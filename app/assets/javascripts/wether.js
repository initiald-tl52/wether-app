$(function() {
  var API_KEY = "5bcd49f66a50a0d68ef2ed5d7526700e";
  var BASE_URL = "http://api.openweathermap.org/data/2.5/forecast";

  function appendProduct(data) {
    var html_all =``;
    var name_html = `<h2>${data.city.name}</h2>`;
    html_all += name_html;
    for (  var i = 0;  i < 5;  i++  ) {
      var html = `<p>${data.list[i].main.temp}</p>`
      html_all += html;
    }
    return html_all;
  }
  
  $(".search_button").on("click", function(e) {
    e.preventDefault();
    var city =  $(".seach_field").val();
    var url = BASE_URL + "?q="+city+",jp&units=metric&APPID=" + API_KEY;
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
    })
    .done(function(data){
      $('.info').append(appendProduct(data));
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $(".-btn").removeAttr("disabled");
    });
  });
});
