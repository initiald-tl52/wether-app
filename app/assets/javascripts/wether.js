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

  function appendTable(data) {
    var dates = []
    var wether_icons_id = []
    var tempratures = []
    var rains_per_3h = []
    for (  var i = 0;  i < 5;  i++  ) {
      dates.push(data.list[i].dt_txt);
      console.log("data.list[i].dt_txt   "+data.list[i].dt_txt);
      wether_icons_id.push(data.list[i].wether[0].icon);
      console.log("data.list[i].wether[0].icon   "+data.list[i].wether[0].icon);
      tempratures.push("data.list[i].main.temp   "+data.list[i].main.temp);
      console.log("data.list[i].main.temp   "+data.list[i].main.temp);
      rains_per_3h.push(data.list[i].rain.3h);
      console.log("data.list[i].rain.3h   "+data.list[i].rain.3h);
    }
    var table = `<table border="1">
                  <tbody>
                      <tr class="tr_date">
                      <td>${dates[0]}</td>
                      <td>${dates[1]}</td>
                      <td>${dates[2]}</td>
                      <td>${dates[3]}</td>
                      <td>${dates[4]}</td>
                    </tr>
                    <tr class="tr_wether">
                      <td>${wether_icons_id[0]}</td>
                      <td>${wether_icons_id[1]}</td>
                      <td>${wether_icons_id[2]}</td>
                      <td>${wether_icons_id[3]}</td>
                      <td>${wether_icons_id[4]}</td>
                    </tr>
                    <tr class="tr_temprature">
                      <td>${tempratures[0]} ℃</td>
                      <td>${tempratures[1]} ℃</td>
                      <td>${tempratures[2]} ℃</td>
                      <td>${tempratures[3]} ℃</td>
                      <td>${tempratures[4]} ℃</td>
                    </tr>
                    <tr class="tr_precipitation">
                      <td>${rains_per_3h[0]} %</td>
                      <td>${rains_per_3h[1]} %</td>
                      <td>${rains_per_3h[2]} %</td>
                      <td>${rains_per_3h[3]} %</td>
                      <td>${rains_per_3h[4]} %</td>
                    </tr>
                  </tbody>
                </table>`
    return table;
  }
  function getWetherIcon(id){
    return `http://openweathermap.org/img/w/${id}.png`
  }
  $(".form_region").on("submit", function(e) {
    e.preventDefault();
    var city = $('#record_point').val();
    var show_url = $(this).attr('action');
    let current_wether_url = CURRENT_BASE_URL + city +",jp&units=metric&APPID=" + API_KEY;
    
    // let forcast_wether_url = FORCAST_BASE_URL +city+",jp&units=metric&APPID=" + API_KEY;
    // $.ajax({
    //   type: 'GET',
    //   url: forcast_wether_url,
    //   dataType: 'json',
    // })
    // .done(function(data){
    //   $('.under-side').empty();
    //   $('.under-side').append(appendTable(data));
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
