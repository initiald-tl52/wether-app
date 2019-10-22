class AddNomalColumnsToWether < ActiveRecord::Migration[5.2]
  def change
    add_column :wethers, :normal_temprature, :decimal,precision: 6, scale: 2
    add_column :wethers, :normal_precipitation, :decimal,precision: 6, scale: 2
    add_column :wethers, :normal_wind_speed, :decimal,precision: 6, scale: 2
    add_column :wethers, :normal_hour_of_sunlight, :decimal,precision: 6, scale: 2
    add_column :wethers, :normal_snow_depth,:integer
  end
end
