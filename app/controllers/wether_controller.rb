class WetherController < ApplicationController
  def index
  end

  def show
    region = Region.find_by(record_point: params[:record_point])
    wethers = region.wethers.order('date ASC').group(:date)
    @dates = wethers.pluck(:date)
    @tempratures = wethers.pluck(:temprature)
    respond_to do |format|
      format.html 
      format.json 
    end
  end
  
end
