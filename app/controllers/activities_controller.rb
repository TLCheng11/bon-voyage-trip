class ActivitiesController < ApplicationController
  before_action :find_activity, only: [:show, :destroy]
  def index
    render json: Activity.all
  end

  def create
    activity = Activity.new_activity(params)
    render json: activity
  end

  def show
    render json: @activity
  end

  def destroy
    @activity.destroy
    render json: {deleted_activity_id: @activity.id}, status: :accepted
  end

  private

  def find_activity
    @activity = Activity.find(params[:id])
  end
end
