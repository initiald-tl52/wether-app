class WetherController < ApplicationController
  def index
    @regions = Region.all
  end

  def show
    region = Region.find_by(alfabet_record_point: params[:alfabet_record_point])
    @wethers = region.wethers.order('date ASC').group(:date)
    respond_to do |format|
      format.html
      format.json
    end
  end
end
