class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :start_time, :end_time, :city, :city_lat, :city_lng, :description, :transportation_plan_id, :hotel_booking_id, :restaurant_id, :sight_spot_id
  has_one :daily_plan
end
