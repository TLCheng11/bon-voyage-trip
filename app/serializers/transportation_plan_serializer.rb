class TransportationPlanSerializer < ActiveModel::Serializer
  attributes :id, :transportation_type, :company, :departure_country, :destination_country, :departure_city, :destination_city, :departure_location, :destination_location, :departure_lat, :departure_lng, :destination_lat, :destination_lng, :departure_time, :arrival_time, :ticket_price
  has_one :activity
end
