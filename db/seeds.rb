require "csv"

CSV.foreach('db/20190915-1015_rikubetu_wether.csv', headers: true) do |row|
  binding.pry
  if(!Region.exists?(record_point: row['地点名']))
    r = Region.new(
                  name: row['地域'],
                  record_point: row['地点名'],
                  )
    r.save
  end
  w = Wether.new(
                date: row['日時'],
                precipitation: row['降水量の合計(mm)'],
                hour_of_sunlight: row['日照時間(時間)'],
                snow_depth: row['降雪量合計(cm)'],
                temprature: row['平均気温'],
                wind_speed: row['平均風速'],
                )
  w.region_id = Region.find(row['地点id'])
  w.save
end