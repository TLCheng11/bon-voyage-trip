class Trip < ApplicationRecord
  has_many :daily_plans
  has_many :trip_plans
  has_many :users, through: :trip_plans

  def self.new_trip(params)
    # create trip
    trip = self.create!(title: params[:title], start_date: params[:start_date], end_date: params[:end_date])

    # create trip_plan to link user with trip
    TripPlan.create!(user_id: params[:user_id], trip_id: trip.id)

    # get the number of days in the trip
    diff = Date.parse(params[:end_date]) - Date.parse(params[:start_date])
    days = diff.to_i + 1

    day = Date.parse(params[:start_date])
    days.times do 
      DailyPlan.create!(trip_id: trip.id, day: day, country: params[:country], city: params[:city], city_lat: params[:city_lat], city_lng: params[:city_lng])
      day += 1
    end 

    trip
  end
end
