angular.module('maryhillConstants', [])


.constant('ApiEndpoint',{
  url: 'http://52.210.15.63/'
}) 


.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
 
.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role',
  super: 'super_role',
});