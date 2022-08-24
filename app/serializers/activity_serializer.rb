class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :start_time, :end_time, :city, :city_lat, :city_lng, :description

  has_one :sight_spot
  has_one :restaurant
  has_one :transportation_plan
  has_one :hotel_booking
end
