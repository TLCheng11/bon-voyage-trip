class CreateTransportationPlans < ActiveRecord::Migration[7.0]
  def change
    create_table :transportation_plans do |t|
      t.string :transpotation_type
      t.string :company
      t.string :departure_city
      t.string :destination_city
      t.string :departure_location
      t.string :destination_location
      t.float :departure_lat
      t.float :departure_lng
      t.float :destination_lat
      t.float :destination_lng
      t.datetime :departure_time
      t.datetime :arrival_time
      t.float :ticket_price
      t.belongs_to :activity, null: false, foreign_key: true

      t.timestamps
    end
  end
end
