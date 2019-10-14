class CreateWethers < ActiveRecord::Migration[5.2]
  def change
    create_table :wethers do |t|
      t.date :date
      t.integer :wether
      t.integer :temprature
      t.integer :precipitation
      t.integer :wind_speed
      t.integer :hour_of_sunlight
      t.integer :snow_depth

      t.timestamps
    end
  end
end
