class TripsController < ApplicationController
  before_action :find_trip, only: [:show, :update, :destroy]
  def index
    render json: Trip.all
  end

  def create
    trip = Trip.new_trip(params)
    render json: trip
  end

  def show
    render json: @trip, serializer: TripShowSerializer
  end

  def update
    @trip.update_trip(params)
    render json: @trip, status: :accepted, serializer: TripShowSerializer
  end

  def destroy
    @trip.destroy
    render json: {deleted_trip_id: @trip.id}, status: :accepted
  end

  private

  def find_trip
    @trip = Trip.find(params[:id])
  end

  # def trip_create_params
  #   params.permit(:user_id, :title, :start_date, :end_date, :country, :city, :city_lat, :city_lng)
  # end
end
