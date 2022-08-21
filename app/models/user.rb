class User < ApplicationRecord
  has_secure_password

  validates :username, uniqueness: true
  # validates :username, :password_digest, :home_country, :home_city, :home_city_lat, :home_city_lng, presence: true
end
