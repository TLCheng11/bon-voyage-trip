class TransportationPlanSerializer < ActiveModel::Serializer
  attributes :id, :method, :company, :departure_city, :destination_city, :departure_location, :destination_location, :departure_lat, :departure_lng, :destination_lat, :destination_lng, :departure_time, :arrival_time, :ticket_price
end
