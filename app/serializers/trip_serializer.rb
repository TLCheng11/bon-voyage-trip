class TripSerializer < ActiveModel::Serializer
  attributes :id, :created_by, :start_date, :end_date
end
