class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :profile_img, :first_name, :last_name, :introduction, :home_country, :home_city, :home_city_lat, :home_city_lng, :is_login
end
