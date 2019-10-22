class RenameAlfabetNameColumnToRegions < ActiveRecord::Migration[5.2]
  def change
    rename_column :regions, :alfabet_name, :alfabet_record_point
  end
end
