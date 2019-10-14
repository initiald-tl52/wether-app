class Region < ApplicationRecord
  has_many :users
  has_many :messages
  belongs_to :wether
end
