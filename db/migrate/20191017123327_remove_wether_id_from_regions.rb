class RemoveWetherIdFromRegions < ActiveRecord::Migration[5.2]
  def change
    remove_reference :regions, :wether, foreign_key: true
  end
end
