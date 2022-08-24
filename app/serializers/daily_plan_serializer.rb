class DailyPlanSerializer < ActiveModel::Serializer
  attributes :id, :day, :country, :city, :city_lat, :city_lng, :trip_id

  has_many :activities
end
