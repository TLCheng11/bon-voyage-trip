class HotelBookingSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :lat, :lng, :image_url, :rating, :price
  has_one :activity
end
