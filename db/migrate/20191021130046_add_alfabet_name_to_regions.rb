class AddAlfabetNameToRegions < ActiveRecord::Migration[5.2]
  def change
    add_column :regions, :alfabet_name, :string
  end
end
