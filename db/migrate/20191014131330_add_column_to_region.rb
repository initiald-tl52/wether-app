class AddColumnToRegion < ActiveRecord::Migration[5.2]
  def change
    add_reference :regions, :wether, foreign_key: true
  end
end
