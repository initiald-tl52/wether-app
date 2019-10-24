$(function() {
  const API_KEY = "5bcd49f66a50a0d68ef2ed5d7526700e";
  const FORCAST_BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?q=";
  const CURRENT_BASE_URL = "http://api.openweathermap.org/data/2.5/weather?q=";

  const context = $("#chart");
  const chart = new Chart(context,{
                                  type: 'line',
                                  data: formatData([]),
                                  options: {
                                    responsive: true,     
                                    title: {
                                      display: true,
                                      fontSize:20,
                                      text: '１ヶ月の平均気温の推移'
                                    },
                                    legend:{
                                      position: 'right'
                                    },
                                    scales: {
                                      yAxes: [{
                                          display: true,
                                          scaleLabel: {
                                            display: true,
                                            labelString: '平均気温（℃）',
                                            fontSize: 18,
                                          },
                                      }]
                                    }
                                  }
                                });
  
  function formatData(data){
    return formatedData = {
      labels : data.dates,
      datasets :[{
        label: '平均気温',
        data:data.tempratures,
        backgroundColor:'rgb(0, 0, 255)',
        borderColor:'rgb(0, 0, 255)',
        fill: false,
      }]
    }
  }

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
  function getWetherIcon(id){
    return `http://openweathermap.org/img/w/${id}.png`
  }
  $(".form_region").on("submit", function(e) {
    e.preventDefault();
    var city = $('#record_point').val();
    var show_url = $(this).attr('action');
    let current_wether_url = CURRENT_BASE_URL + city +",jp&units=metric&APPID=" + API_KEY;
    
    // var open_wether_url = BASE_URL +city+",jp&units=metric&APPID=" + API_KEY;
    // $.ajax({
    //   type: 'GET',
    //   url: open_wether_url,
    //   dataType: 'json',
    // })
    // .done(function(data){
    //   $('.info').empty();
    //   $('.info').append(appendProduct(data));
    // })

    $.ajax({
      type: 'GET',
      url: current_wether_url,
      dataType: 'json',
    })
    .done(function(data){
      $('.wether').text(data.weather[0].main);
      $('#temprature').text(data.main.temp);
      $('#precipitation').text(data.main.humidity);
      $('.imagebox').children('#wether-icon').attr('src', getWetherIcon(data.weather[0].icon));
    })

    $.ajax({
      type: 'GET',
      url: show_url,
      data: {alfabet_record_point: city},
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
