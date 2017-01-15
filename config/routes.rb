Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html  



  root :to => 'site#home'

  get '/manager', to: 'manager#main', as: 'manager_main'

end
