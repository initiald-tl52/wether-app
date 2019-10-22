class Wether < ApplicationRecord
  belongs_to :region, optional: true
end
