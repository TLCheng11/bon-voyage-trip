class CreateHotelBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :hotel_bookings do |t|
      t.string :name
      t.string :locatoin
      t.float :lat
      t.float :lng
      t.string :image_url
      t.float :rating
      t.float :price

      t.timestamps
    end
  end
end
