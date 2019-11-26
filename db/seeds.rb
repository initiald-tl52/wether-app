require "csv"

CSV.foreach(Rails.root + 
            '/Users/itoudaichi/projects/wether-app/db/20190918-1019北海道気象データ.csv ', headers: true
            ) do |row|
  unless Region.exists?(record_point: row['地点名'])
    r = Region.new(
                  name: row['地域'],
                  record_point: row['地点名'],
                  )
    if r.save
      puts "region success  #{r}"
    else
      puts "region fail #{r}"
      puts "#{r.errors}"
    end
  end

  unless Wether.where(date: row['年月日'],region_id:row['地点id']).exists?
    w = Wether.new(
      date: row['年月日'],
      precipitation: row['降水量の合計(mm)'],
      normal_precipitation: row['平年降水量の合計(mm)'],
      hour_of_sunlight: row['日照時間(時間)'],
      normal_hour_of_sunlight: row['平年日照時間(時間)'],
      snow_depth: row['最深積雪(cm)'],
      normal_snow_depth: row['平年最深積雪(cm)'],
      temprature: row['平均気温(℃)'],
      normal_temprature: row['平年平均気温(℃)'],
      wind_speed: row['平均風速(m/s)'],
      normal_wind_speed: row['平年平均風速(m/s)']
    )
    w.region_id = Region.find(row['地点id']).id
    if w.save
      puts "wether success  #{w}"
    else
      puts "wether fail #{w}"
      puts "#{w.errors.messages}"
    end
  end
end