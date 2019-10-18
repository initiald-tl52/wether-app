class ChangeDataTempraturePrecipitationWindSpeeHourOfSunlightdToWether < ActiveRecord::Migration[5.2]
  def change
    change_column :wethers, :temprature, :decimal,precision: 6, scale: 2
    change_column :wethers, :precipitation, :decimal,precision: 6, scale: 2
    change_column :wethers, :wind_speed, :decimal,precision: 6, scale: 2
    change_column :wethers, :hour_of_sunlight, :decimal,precision: 6, scale: 2
  end
end
