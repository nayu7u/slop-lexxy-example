class PracticalsController < ApplicationController
  def index
    @submitted = params if params[:submitted].present?
  end
end
