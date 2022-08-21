# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_21_204024) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.bigint "daily_plan_id", null: false
    t.datetime "start_time"
    t.datetime "end_time"
    t.string "city"
    t.float "city_lat"
    t.float "city_lng"
    t.string "description"
    t.integer "transportation_plan_id"
    t.integer "hotel_booking_id"
    t.integer "restaurant_id"
    t.integer "sight_spot_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["daily_plan_id"], name: "index_activities_on_daily_plan_id"
  end

  create_table "daily_plans", force: :cascade do |t|
    t.bigint "trip_id", null: false
    t.datetime "day"
    t.string "country"
    t.string "city"
    t.float "city_lat"
    t.float "city_lng"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_daily_plans_on_trip_id"
  end

  create_table "hotel_bookings", force: :cascade do |t|
    t.string "name"
    t.string "locatoin"
    t.float "lat"
    t.float "lng"
    t.string "image_url"
    t.float "rating"
    t.float "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "restaurants", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.float "lat"
    t.float "lng"
    t.string "image_url"
    t.float "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sight_spots", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.float "lat"
    t.float "lng"
    t.string "image_url"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transportation_plans", force: :cascade do |t|
    t.string "method"
    t.string "company"
    t.string "departure_city"
    t.string "destination_city"
    t.string "departure_location"
    t.string "destination_location"
    t.float "departure_lat"
    t.float "departure_lng"
    t.float "destination_lat"
    t.float "destination_lng"
    t.datetime "departure_time"
    t.datetime "arrival_time"
    t.float "ticket_price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trip_plans", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "trip_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_trip_plans_on_trip_id"
    t.index ["user_id"], name: "index_trip_plans_on_user_id"
  end

  create_table "trips", force: :cascade do |t|
    t.integer "created_by"
    t.string "title", default: "My next trip"
    t.datetime "start_date"
    t.datetime "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "profile_img"
    t.string "first_name"
    t.string "last_name"
    t.string "introduction"
    t.string "home_country"
    t.string "home_city"
    t.float "home_city_lat"
    t.float "home_city_lng"
    t.boolean "is_login", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "activities", "daily_plans"
  add_foreign_key "daily_plans", "trips"
  add_foreign_key "trip_plans", "trips"
  add_foreign_key "trip_plans", "users"
end
