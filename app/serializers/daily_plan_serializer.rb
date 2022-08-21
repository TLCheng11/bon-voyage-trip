class DailyPlanSerializer < ActiveModel::Serializer
  attributes :id, :day
  has_one :trip
end
