class WetherController < ApplicationController
  def index
    @chart_data = Wether.order('date ASC').group(:date).pluck(:date,:temprature)
  end

  def show
    respond_to do |format|
      format.html 
      format.json 
    end
  end
  
end
