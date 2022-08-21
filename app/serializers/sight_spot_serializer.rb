class SightSpotSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :lat, :lng, :image_url, :description
end
