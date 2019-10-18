class WetherController < ApplicationController
  def index
    @chart_data = Wether.order('date ASC')
  end

  def show
    respond_to do |format|
      format.html 
      format.json 
    end
  end
  
end
