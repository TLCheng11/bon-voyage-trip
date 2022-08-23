class SightSpotSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :lat, :lng, :image_url, :rating
  has_one :activity
end
