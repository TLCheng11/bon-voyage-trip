class Activity < ApplicationRecord
  belongs_to :daily_plan
  has_one :transportation_plan, dependent: :destroy
  has_one :hotel_booking, dependent: :destroy
  has_one :restaurant, dependent: :destroy
  has_one :sight_spot, dependent: :destroy
end
