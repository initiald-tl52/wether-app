class WetherController < ApplicationController
  def index
    
  end

  def show
    respond_to do |format|
      format.html 
      format.json 
    end
  end
  
end
