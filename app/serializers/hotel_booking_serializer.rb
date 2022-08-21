class HotelBookingSerializer < ActiveModel::Serializer
  attributes :id, :name, :locatoin, :lat, :lng, :image_url, :rating, :price
end
