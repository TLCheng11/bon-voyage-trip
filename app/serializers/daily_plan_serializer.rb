class DailyPlanSerializer < ActiveModel::Serializer
  attributes :id, :day, :country, :city, :city_lat, :city_lng
  has_one :trip
end
