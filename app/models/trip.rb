class Trip < ApplicationRecord
  validates :title, :created_by, :start_date, :end_date, presence: true

  has_many :daily_plans, dependent: :destroy
  has_many :trip_plans, dependent: :destroy
  has_many :users, through: :trip_plans

  def self.new_trip(params)
    # create trip
    trip = self.create!(title: params[:title], created_by: params[:user_id], start_date: params[:start_date], end_date: params[:end_date])

    # create trip_plan to link user with trip
    TripPlan.create!(user_id: params[:user_id], trip_id: trip.id)

    # get the number of days in the trip
    diff = Date.parse(params[:end_date]) - Date.parse(params[:start_date])
    days = diff.to_i + 1

    day = Date.parse(params[:start_date])
    days.times do |i|
      DailyPlan.create!(trip_id: trip.id, day: day, day_index: i + 1, country: params[:country], city: params[:city], city_lat: params[:city_lat], city_lng: params[:city_lng])
      day += 1
    end 

    trip
  end

  def update_trip(params)
    trip = self.update!(end_date: params[:end_date])

    daily_plan = self.daily_plans.sort{|a, b| a.day_index <=> b.day_index}.last
    DailyPlan.create!(trip_id: self.id, day: params[:end_date], day_index: daily_plan.day_index + 1, country: daily_plan.country, city: daily_plan.city, city_lat: daily_plan.city_lat, city_lng: daily_plan.city_lng)

    trip
  end
end
