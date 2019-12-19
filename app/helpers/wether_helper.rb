require '/Users/itoudaichi/projects/wether-app/lib/weather_scraping.rb'
require 'date'

module WetherHelper
  def past_month_weather_save(region)
    yesterday = Date.today - 1
    prev_month = yesterday.prev_month
    date = prev_month
    while date <= yesterday
      create_wether(date, region)
      date += 1
    end
  end

  def create_wether(date, region)
    Wether.where(date: date, region_id: region.id).first_or_create do |wether|
      weather_scrape = WetherScraping.new(region.prec_no, region.block_no, date)
      precipitation = weather_scrape.get_value(weather_scrape.get_coloum_index("降水量(mm)"))
      hour_of_sunlight = weather_scrape.get_value(weather_scrape.get_coloum_index("日照時間(h)"))
      temprature = weather_scrape.get_value(weather_scrape.get_coloum_index("気温(℃)"))
      weather_scrape_nomal = WetherScraping.new(region.prec_no, region.block_no, date,true)
      normal_precipitation = weather_scrape_nomal.get_value(weather_scrape_nomal.get_coloum_index("降水量(mm)"))
      normal_hour_of_sunlight = weather_scrape_nomal.get_value(weather_scrape_nomal.get_coloum_index("日照時間(時間)"))
      normal_temprature = weather_scrape_nomal.get_value(weather_scrape_nomal.get_coloum_index("平均気温(℃)"))

      wether.precipitation = precipitation
      wether.hour_of_sunlight = hour_of_sunlight
      wether.temprature = temprature
      wether.normal_precipitation = normal_precipitation
      wether.normal_hour_of_sunlight = normal_hour_of_sunlight
      wether.normal_temprature = normal_temprature
    end
  end
end
