class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :lat, :lng, :image_url, :rating
end