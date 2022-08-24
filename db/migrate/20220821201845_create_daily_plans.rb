class CreateDailyPlans < ActiveRecord::Migration[7.0]
  def change
    create_table :daily_plans do |t|
      t.belongs_to :trip, null: false, foreign_key: true
      t.datetime :day
      t.integer :day_index
      t.string :country
      t.string :city
      t.float :city_lat
      t.float :city_lng

      t.timestamps
    end
  end
end
