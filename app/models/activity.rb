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
        country = params[:departure_country]
        city = params[:departure_city]
        lat = params[:departure_lat]
        lng = params[:departure_lng]

        daily_plan = DailyPlan.find(params[:daily_plan_id])
        tran = daily_plan.transportation_plans.order(:arrival_time).last
        
        if tran
          if params[:departure_time] > tran[:arrival_time]
            country = tran[:destination_country]
            city = tran[:destination_city]
            lat = tran[:destination_lat]
            lng = tran[:destination_lng]
          end
        end

        TransportationPlan.create!(activity: activity, transportation_type: params[:transportation_type], company: params[:company], departure_country: country, destination_country: params[:destination_country], departure_city: city, destination_city: params[:destination_city], departure_location: params[:departure_location], destination_location: params[:destination_location], departure_lat: lat, departure_lng: lng, destination_lat: params[:destination_lat], destination_lng: params[:destination_lng], departure_time: params[:departure_time], arrival_time: params[:arrival_time], ticket_price: params[:ticket_price])
      when "hotel_booking"
        HotelBooking.create!(activity:activity, name: params[:name], location: params[:location], lat: params[:lat], lng: params[:lng], image_url: params[:image_url], rating:params[:rating], price: params[:price])
      else
      end
    
    activity
  end
end
