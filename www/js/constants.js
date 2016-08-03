angular.module('maryhillConstants', [])


.constant('ApiEndpoint',{
  url: 'http://ec2-52-49-221-88.eu-west-1.compute.amazonaws.com:5555/'
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