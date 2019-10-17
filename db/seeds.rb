require "csv"

CSV.foreach('20190915-1015tokachi_wether.csv', headers: true) do |row|
  Wether.create(date: row['日時'],
                '降水量の合計(mm)'
                
                )
  Region.create(

                )
end