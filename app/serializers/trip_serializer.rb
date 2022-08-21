class TripSerializer < ActiveModel::Serializer
  attributes :id, :created_by, :title, :start_date, :end_date
end
