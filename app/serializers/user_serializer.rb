class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :profile_img, :first_name, :last_name, :home_country, :home_city, :introduction, :is_login
end
