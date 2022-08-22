class TripShowSerializer < ActiveModel::Serializer
  attributes :id, :created_by, :title, :start_date, :end_date

  has_many :daily_plans
end
