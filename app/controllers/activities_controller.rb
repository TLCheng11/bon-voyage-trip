class ActivitiesController < ApplicationController
  before_action :find_activity, only: [:show, :destroy]
  def index
    render json: Activity.all
  end

  def create
    activity = Activity.new_activity(params)
    render json: activity, status: :created
  end

  def show
    render json: @activity
  end

  def update
    activity = Activity.update_activity(params)
    render json: activity, status: :accepted
  end

  def destroy
    if @activity.transportation_plan
      @activity.reverse_daily_plan_destination()
    end
    @activity.destroy
    render json: {deleted_activity_id: @activity.id}, status: :accepted
  end

  private

  def find_activity
    @activity = Activity.find(params[:id])
  end
end
