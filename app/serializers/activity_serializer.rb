class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :start_time, :end_time, :city, :city_lat, :city_lng, :description
end
