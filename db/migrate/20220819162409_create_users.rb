class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :profile_img
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :introduction
      t.string :home_country
      t.string :home_city
      t.float :home_city_lat
      t.float :home_city_lng
      t.boolean :is_login, default: true

      t.timestamps
    end
  end
end
