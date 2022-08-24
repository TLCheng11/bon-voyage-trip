class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_img, :first_name, :last_name, :email, :introduction, :home_country, :home_city, :home_city_lat, :home_city_lng, :is_login
end
