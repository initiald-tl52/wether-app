class AddColumnToWether < ActiveRecord::Migration[5.2]
  def change
    add_reference :wethers, :region, foreign_key: true
  end
end
