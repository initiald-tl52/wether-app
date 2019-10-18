class RemoveWetherFromWethers < ActiveRecord::Migration[5.2]
  def change
    remove_column :wethers, :wether, :integer
  end
end
