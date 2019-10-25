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
    var humiditys = []
    for (  var i = 0;  i < 5;  i++  ) {
      let date = new Date(data.list[i].dt_txt);
      let mm = date.getMonth();
      let dd = date.getDate();
      let hour = date.getHours();
      let min = date.getMinutes()+"0";
      dates.push(mm+"月"+dd+"日"+hour+":"+min);
      wether_icons_id.push(data.list[i].weather[0].icon);
      tempratures.push(data.list[i].main.temp);
      humiditys.push(data.list[i].main.humidity);
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
        <td>${humiditys[0]} %</td>
        <td>${humiditys[1]} %</td>
        <td>${humiditys[2]} %</td>
        <td>${humiditys[3]} %</td>
        <td>${humiditys[4]} %</td>
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
    let city = $('#record_point').val();
    let show_url = $(this).attr('action');
    let current_wether_url = CURRENT_BASE_URL + city +",jp&units=metric&APPID=" + API_KEY;
    let open_wether_url = FORCAST_BASE_URL +city+",jp&units=metric&APPID=" + API_KEY;

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
    
    $.ajax({
      type: 'GET',
      url: open_wether_url,
      dataType: 'json',
    })
    .done(function(data){
      $('.under-side').empty();
      $('.under-side').append(appendTable(data));
      // $('.info').empty();
      // $('.info').append(appendProduct(data));
    })

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
    .fail(function(){
      alert('error');
    })
    
    .always(function(){
      $("#serch_region").removeAttr("disabled");
    });
  });
});
