class CreateSightSpots < ActiveRecord::Migration[7.0]
  def change
    create_table :sight_spots do |t|
      t.string :name
      t.string :location
      t.float :lat
      t.float :lng
      t.string :image_url
      t.float :rating
      t.belongs_to :activity, null: false, foreign_key: true

      t.timestamps
    end
  end
end
