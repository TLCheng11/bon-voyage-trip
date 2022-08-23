class CreateActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.belongs_to :daily_plan, null: false, foreign_key: true
      t.datetime :start_time
      t.datetime :end_time
      t.string :city
      t.float :city_lat
      t.float :city_lng
      t.string :description

      t.timestamps
    end
  end
end
