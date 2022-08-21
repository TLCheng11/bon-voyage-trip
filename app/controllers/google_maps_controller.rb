require "uri"
require "net/http"

class GoogleMapsController < ApplicationController
  def search
    url = URI("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{params[:lat]}%2C#{params[:lng]}&radius=#{params[:radius]}&type=#{params[:type]}&key=#{params[:key]}")

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Get.new(url)

    response = https.request(request)
    
    render json: response.read_body
  end
end
