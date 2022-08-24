class DailyPlan < ApplicationRecord
  belongs_to :trip
  has_many :activities, dependent: :destroy
  has_many :transportation_plans, through: :activities
end
