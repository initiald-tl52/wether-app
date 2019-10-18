class Region < ApplicationRecord
  has_many :users
  has_many :messages
  has_many :wether

end
