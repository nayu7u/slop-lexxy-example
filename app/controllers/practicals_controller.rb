class PracticalsController < ApplicationController
  def index
    if params[:submitted].present?
      @submitted = params
    end
  end
end
