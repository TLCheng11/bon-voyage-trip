class CreateTrips < ActiveRecord::Migration[7.0]
  def change
    create_table :trips do |t|
      t.integer :created_by
      t.string :title, default: "My next trip"
      t.datetime :start_date
      t.datetime :end_date

      t.timestamps
    end
  end
end
