class Activity < ApplicationRecord
  belongs_to :daily_plan
  has_one :transportation_plan, dependent: :destroy
  has_one :hotel_booking, dependent: :destroy
  has_one :restaurant, dependent: :destroy
  has_one :sight_spot, dependent: :destroy

  def self.new_activity(params)
    activity = Activity.create!(daily_plan_id: params[:daily_plan_id], start_time: params[:start_time], end_time: params[:end_time], city: params[:city], city_lat: params[:city_lat], city_lng:params[:city_lng], description: params[:description])
    
    case params[:type]
      when "sight_spot"
        SightSpot.create!(activity: activity, name: params[:name], location: params[:location], lat: params[:lat], lng: params[:lng], image_url: params[:image_url], rating:params[:rating])
      when "restaurant"
        Restaurant.create!(activity: activity, name: params[:name], location: params[:location], lat: params[:lat], lng: params[:lng], image_url: params[:image_url], rating:params[:rating])
      when "transportation_plan"
        TransportationPlan.create!(activity: activity, method: params[:method], company: params[:company], departure_city: params[:departure_city], destination_city: params[:destination_city], departure_location: params[:departure_location], departure_lat: params[:departure_lat], departure_lng: params[:departure_lng], destination_lat: params[:destination_lat], destination_lng: params[:destination_lng], departure_time: params[:departure_time], arrival_time: params[:arrival_time], ticket_price: params[:ticket_price])
      when "hotel_booking"
        HotelBooking.create!(activity:activity, name: params[:name], location: params[:location], lat: params[:lat], lng: params[:lng], image_url: params[:image_url], rating:params[:rating], price: params[:price])
      else
      end
    byebug
    activity
  end
end
