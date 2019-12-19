$(function() {
  const API_KEY = "5bcd49f66a50a0d68ef2ed5d7526700e";
  const FORCAST_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?q=";
  const CURRENT_BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

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
                                            labelString: '気温（℃）',
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
        backgroundColor:'rgb(51,204,255)',
        borderColor:'rgb(51,204,255)',
        fill: false,
      },
      {
        label: '平年値',
        data:data.normal_temp,
        backgroundColor:'rgb(255,255,204)',
        borderColor:'rgb(204,204,51)',
        pointBackgroundColor:'rgb(255,255,204)',
        fill: true,
      }]
    }
  }

  // function dateFormat(date) {
  //   let date = new Date(date);
  //   let mm = date.getMonth();
  //   let dd = date.getDate();
  //   let hour = date.getHours();
  //   let min = date.getMinutes()+"0";
  //   let formatted = mm+"月"+dd+"日"+hour+":"+min;
  //   return formatted
  // }
  // 以下、コードが冗長。上記のメソッド使用して可読性向上の必要あり。
  // しかし、上記のコード使用するとエラーになる。
  function appendTable(data) {
    let dates = []
    let wether_icons_id = []
    let tempratures = []
    let humiditys = []
    for (  var i = 0;  i < 5;  i++  ) {
      let date = new Date(data.list[i].dt_txt);
      let mm = date.getMonth()+1;
      let dd = date.getDate();
      let hour = date.getHours();
      let min = date.getMinutes()+"0";
      dates.push(mm+"月"+dd+"日"+hour+":"+min);
      wether_icons_id.push(`<img src=${getWetherIcon(data.list[i].weather[0].icon)}>`);
      tempratures.push(data.list[i].main.temp.toFixed(1));
      humiditys.push(data.list[i].main.humidity);
    }

    var table = `<table border="1">
        <tbody>
          <tr class="tr_date">
            <td>日時</td>
            <td>${dates[0]}</td>
            <td>${dates[1]}</td>
            <td>${dates[2]}</td>
            <td>${dates[3]}</td>
            <td>${dates[4]}</td>
          </tr>
          <tr class="tr_wether">
            <td>天気</td>
            <td>${wether_icons_id[0]}</td>
            <td>${wether_icons_id[1]}</td>
            <td>${wether_icons_id[2]}</td>
            <td>${wether_icons_id[3]}</td>
            <td>${wether_icons_id[4]}</td>
          </tr>
          <tr class="tr_temprature">
            <td>気温</td>
            <td>${tempratures[0]} ℃</td>
            <td>${tempratures[1]} ℃</td>
            <td>${tempratures[2]} ℃</td>
            <td>${tempratures[3]} ℃</td>
            <td>${tempratures[4]} ℃</td>
          </tr>
          <tr class="tr_precipitation">
            <td>湿度</td>
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

  $(".custom-select-trigger").on('DOMSubtreeModified propertychange', function() {
    if($('.custom-select-trigger').text()===""){
      return false;
    };
    let city = $('.custom-select').val();
    // 帯広のみ動作確認済み、帯広のみ表示許可 20191211
    if(city != "Obihiro"){
      return false;
    };
    let show_url = "/wether/show"
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
      $('.teble_box').empty();
      $('.teble_box').append(appendTable(data));
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
// 画面表示後に帯広を選択
$(window).on('load',function(){
  $(".custom-option:contains('帯広')").click()
});
