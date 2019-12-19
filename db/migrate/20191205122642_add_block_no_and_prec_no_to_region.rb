class AddBlockNoAndPrecNoToRegion < ActiveRecord::Migration[5.2]
  def change
    add_column :regions, :prec_no, :string
    add_column :regions, :block_no, :string
  end
end
