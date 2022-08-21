class DailyPlan < ApplicationRecord
  belongs_to :trip
  has_many :activities
end
