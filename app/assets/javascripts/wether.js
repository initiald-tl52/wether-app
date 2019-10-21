$(function() {
  var API_KEY = "5bcd49f66a50a0d68ef2ed5d7526700e";
  var BASE_URL = "http://api.openweathermap.org/data/2.5/forecast";

  const context = $("#chart");
  const chart = new Chart(context,{
                                  type: 'line',
                                  data: formatData([]),
                                  responsive : true,
                                  label:'気温',
                                  });

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

  function formatData(data){
    return formatedData = {
      labels : data.dates,
      datasets :[{
        data:data.tempratures,
        backgroundColor:'rgb(0, 0, 255)',
        borderColor:'rgb(0, 0, 255)',
        fill: false,
      }]
    }
  }

  $(".form_region").on("submit", function(e) {
    e.preventDefault();
    var city = $(".seach_field").val();
    if(city===""){
      alert("cityの値なし");
      return false;
    }
    var open_wether_url = BASE_URL + "?q="+city+",jp&units=metric&APPID=" + API_KEY;
    var show_url = $(this).attr('action');
    var record_point = $('#record_point').val();
    $.ajax({
      type: 'GET',
      url: open_wether_url,
      dataType: 'json',
    })
    .done(function(data){
      $('.info').empty();
      $('.info').append(appendProduct(data));
    })

    $.ajax({
      type: 'GET',
      url: show_url,
      data: {record_point: record_point},
      dataType: 'json',
    })
    .done(function(data){
      chart.data = formatData(data);
      chart.update();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $("#serch_region").removeAttr("disabled");
    });
  });
});
