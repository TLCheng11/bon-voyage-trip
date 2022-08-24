class DailyPlansController < ApplicationController
  before_action :find_daily_plan, only: [:show, :destroy]

  def show
    render json: @daily_plan, include: ["activities", "activities.sight_spot", "activities.restaurant", "activities.transportation_plan", "activities.hotel_booking"]
  end

  private

  def find_daily_plan
    @daily_plan = DailyPlan.find(params[:id])
  end
end
