require "date"
class WetherController < ApplicationController

  def index
    
  end

  def show
    region = Region.find_by(alfabet_record_point: params[:alfabet_record_point])
    past_month_weather_save(region)
    @wethers = region.wethers.where(date: Date.today - 31..Date.today - 1).order('date ASC')
    respond_to do |format|
      format.json
    end
  end
end
