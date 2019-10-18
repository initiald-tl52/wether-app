class Wether < ApplicationRecord
  belongs_to :regions, optional: true
end
