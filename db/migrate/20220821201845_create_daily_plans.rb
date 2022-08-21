class CreateDailyPlans < ActiveRecord::Migration[7.0]
  def change
    create_table :daily_plans do |t|
      t.belongs_to :trip, null: false, foreign_key: true
      t.datetime :day

      t.timestamps
    end
  end
end
