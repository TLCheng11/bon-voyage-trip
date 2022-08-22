class TripsController < ApplicationController
  def index
    render json: Trip.all
  end

  def create
    trip = Trip.new_trip(params)
    render json: trip
  end

  private

  def trip_create_params
    params.permit(:user_id, :title, :start_date, :end_date, :country, :city, :city_lat, :city_lng)
  end
end
