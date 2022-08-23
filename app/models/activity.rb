class Activity < ApplicationRecord
  belongs_to :daily_plan
  has_one :transportation_plan, dependent: :destroy
  has_one :hotel_booking, dependent: :destroy
  has_one :restaurant, dependent: :destroy
  has_one :sight_spot, dependent: :destroy

  def self.new_activity(params)
    activity = Activity.create!(daily_plan_id: params[:daily_plan_id], start_time: params[:start_time], end_time: params[:end_time], city: params[:city], city_lat: params[:city_lat], city_lng:params[:city_lng], description: params[:description])
    
    if params[:type] == "sight_spot"
      SightSpot.create!(activity:activity, name: params[:name], location: params[:location], lat: params[:lat], lng: params[:lng], image_url: params[:image_url], rating:params[:rating])
    end
    
    activity
  end
end
