class DailyPlansController < ApplicationController
  before_action :find_daily_plan, only: [:show, :destroy]

  def show
    render json: @daily_plan
  end

  private

  def find_daily_plan
    @daily_plan = DailyPlan.find(params[:id])
  end
end
