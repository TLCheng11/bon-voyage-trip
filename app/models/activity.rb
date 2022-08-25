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
        
        # if new adding tran departure later then the last tran arrival time, set departure location to last destination
        if tran
          if params[:departure_time] > tran[:arrival_time]
            country = tran[:destination_country]
            city = tran[:destination_city]
            lat = tran[:destination_lat]
            lng = tran[:destination_lng]
          end
        end

        TransportationPlan.create!(activity: activity, transportation_type: params[:transportation_type], company: params[:company], departure_country: country, destination_country: params[:destination_country], departure_city: city, destination_city: params[:destination_city], departure_location: params[:departure_location], destination_location: params[:destination_location], departure_lat: lat, departure_lng: lng, destination_lat: params[:destination_lat], destination_lng: params[:destination_lng], departure_time: params[:departure_time], arrival_time: params[:arrival_time], ticket_price: params[:ticket_price])

        # to update all the days location after today to the new destination
        daily_plan = DailyPlan.find(params[:daily_plan_id])
        tran = daily_plan.transportation_plans.order(:arrival_time).last

        original_country = daily_plan.country
        original_city = daily_plan.city
        country = tran[:destination_country]
        city = tran[:destination_city]
        lat = tran[:destination_lat]
        lng = tran[:destination_lng]

        trip = daily_plan.trip
        stop_change = false

        trip.daily_plans.sort{|a, b| a.day_index <=> b.day_index}.each do |plan|
          if plan.day_index == daily_plan.day_index
            plan.update!(country: country, city: city, city_lat: lat, city_lng: lng)
          end
          if plan.day_index > daily_plan.day_index && !stop_change
            if plan.transportation_plans.count == 0
              plan.update!(country: country, city: city, city_lat: lat, city_lng: lng)
            else
              stop_change = true
            end
          end
        end

      when "hotel_booking"
        HotelBooking.create!(activity:activity, name: params[:name], location: params[:location], lat: params[:lat], lng: params[:lng], image_url: params[:image_url], rating:params[:rating], price: params[:price])
      else
      end
    
    activity
  end

  def self.update_activity(params)
    activity = Activity.find(params[:id])
    activity.update!(start_time: params[:start_time], end_time: params[:end_time], city: params[:city], city_lat: params[:city_lat], city_lng:params[:city_lng], description: params[:description])
    
    case params[:type]
      when "sight_spot"
        sight_spot = activity.sight_spot
        sight_spot.update!(name: params[:name], location: params[:location], lat: params[:lat], lng: params[:lng], image_url: params[:image_url], rating:params[:rating])
      when "restaurant"
        restaurant = activity.restaurant
        restaurant.update!(name: params[:name], location: params[:location], lat: params[:lat], lng: params[:lng], image_url: params[:image_url], rating:params[:rating])
      when "transportation_plan"
        country = params[:departure_country]
        city = params[:departure_city]
        lat = params[:departure_lat]
        lng = params[:departure_lng]

        daily_plan = DailyPlan.find(params[:daily_plan_id])
        tran = daily_plan.transportation_plans.order(:arrival_time).last
        
        # if new adding tran departure later then the last tran arrival time, set departure location to last destination
        if tran
          if params[:departure_time] > tran[:arrival_time]
            country = tran[:destination_country]
            city = tran[:destination_city]
            lat = tran[:destination_lat]
            lng = tran[:destination_lng]
          end
        end

        tran_plan = activity.transportation_plan
        tran_plan.update!(transportation_type: params[:transportation_type], company: params[:company], departure_country: country, destination_country: params[:destination_country], departure_city: city, destination_city: params[:destination_city], departure_location: params[:departure_location], destination_location: params[:destination_location], departure_lat: lat, departure_lng: lng, destination_lat: params[:destination_lat], destination_lng: params[:destination_lng], departure_time: params[:departure_time], arrival_time: params[:arrival_time], ticket_price: params[:ticket_price])
        
        # to update all the days location after today to the new destination
        daily_plan = DailyPlan.find(params[:daily_plan_id])
        tran = daily_plan.transportation_plans.order(:arrival_time).last

        original_country = daily_plan.country
        original_city = daily_plan.city
        country = tran[:destination_country]
        city = tran[:destination_city]
        lat = tran[:destination_lat]
        lng = tran[:destination_lng]

        trip = daily_plan.trip
        stop_change = false
        
        trip.daily_plans.sort{|a, b| a.day_index <=> b.day_index}.each do |plan|
          if plan.day_index == daily_plan.day_index
            plan.update!(country: country, city: city, city_lat: lat, city_lng: lng)
          end
          if plan.day_index > daily_plan.day_index && !stop_change
            if plan.transportation_plans.count == 0
              plan.update!(country: country, city: city, city_lat: lat, city_lng: lng)
            else
              stop_change = true
            end
          end
        end

      when "hotel_booking"
        hotel = activity.hotel_booking
        hotel.update!(activity:activity, name: params[:name], location: params[:location], lat: params[:lat], lng: params[:lng], image_url: params[:image_url], rating:params[:rating], price: params[:price])
      else
      end
    
    activity
  end

  def reverse_daily_plan_destination()
    country = self.transportation_plan[:departure_country]
    city = self.transportation_plan[:departure_city]
    lat = self.transportation_plan[:departure_lat]
    lng = self.transportation_plan[:departure_lng]

    if self.daily_plan.transportation_plans.count == 1
      if self.daily_plan.day_index == 1
        user = User.find(self.daily_plan.trip.created_by)
        country = user[:home_country]
        city = user[:home_city]
        lat = user[:home_city_lat]
        lng = user[:home_city_lng]
      else
        index = self.daily_plan.day_index - 1
        daily_plan = self.daily_plan.trip.daily_plans.where(day_index: index).first
        country = daily_plan[:country]
        city = daily_plan[:city]
        lat = daily_plan[:city_lat]
        lng = daily_plan[:city_lng]
      end

      trip = self.daily_plan.trip
      stop_change = false
      
      trip.daily_plans.sort{|a, b| a.day_index <=> b.day_index}.each do |plan|
        if plan.day_index == self.daily_plan.day_index
          plan.update!(country: country, city: city, city_lat: lat, city_lng: lng)
        end
        if plan.day_index > self.daily_plan.day_index && !stop_change
          if plan.transportation_plans.count == 0
            plan.update!(country: country, city: city, city_lat: lat, city_lng: lng)
          else
            stop_change = true
          end
        end
      end
      return true
    end

    tran = self.daily_plan.transportation_plans.order(:arrival_time).last
    tran_sec = self.daily_plan.transportation_plans.order("arrival_time DESC").second

    if self.transportation_plan.id == tran.id
      country = tran_sec[:destination_country]
      city = tran_sec[:destination_city]
      lat = tran_sec[:destination_lat]
      lng = tran_sec[:destination_lng]

      trip = self.daily_plan.trip
      stop_change = false
      
      trip.daily_plans.sort{|a, b| a.day_index <=> b.day_index}.each do |plan|
        if plan.day_index == self.daily_plan.day_index
          plan.update!(country: country, city: city, city_lat: lat, city_lng: lng)
        end
        if plan.day_index > self.daily_plan.day_index && !stop_change
          if plan.transportation_plans.count == 0
            plan.update!(country: country, city: city, city_lat: lat, city_lng: lng)
          else
            stop_change = true
          end
        end
      end
    end
  end

end
