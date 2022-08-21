class Trip < ApplicationRecord
  has_many :daily_plans
  has_many :trip_plans
  has_many :users, through: :trip_plans
end
