class Trip < ApplicationRecord
  validates :title, :created_by, :start_date, :end_date, presence: true

  has_many :daily_plans, dependent: :destroy
  has_many :trip_plans, dependent: :destroy
  has_many :users, through: :trip_plans
  has_many :transportation_plans, through: :daily_plans

  def self.new_trip(params)
    # create trip
    trip = self.create!(title: params[:title], created_by: params[:user_id], start_date: params[:start_date], end_date: params[:end_date])

    # create trip_plan to link user with trip
    TripPlan.create!(user_id: params[:user_id], trip_id: trip.id)

    # get the number of days in the trip
    params[:day_count].times do |i|
      DailyPlan.create!(trip_id: trip.id, day: params[:day_range][i], day_index: i + 1, country: params[:country], city: params[:city], city_lat: params[:city_lat], city_lng: params[:city_lng])
    end 

    trip
  end

  def update_trip_add(params)
    trip = self.update!(end_date: params[:end_date])

    daily_plan = self.daily_plans.sort{|a, b| a.day_index <=> b.day_index}.last
    DailyPlan.create!(trip_id: self.id, day: params[:end_date], day_index: daily_plan.day_index + 1, country: daily_plan.country, city: daily_plan.city, city_lat: daily_plan.city_lat, city_lng: daily_plan.city_lng)

    trip
  end

  def update_trip_delete(params)
    trip = self.update!(end_date: params[:end_date])

    daily_plan = self.daily_plans.sort{|a, b| a.day_index <=> b.day_index}.last
    daily_plan.destroy

    trip
  end
end
