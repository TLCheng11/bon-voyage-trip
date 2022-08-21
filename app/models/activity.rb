class Activity < ApplicationRecord
  belongs_to :daily_plan
  has_one :transportation_plan
  has_one :hotel_booking
  has_one :restaurant
  has_one :sight_spot
end
