Nodejs Backend
## Available Scripts
before **'npm install'** please install below decencies for bcrypt

**npm install -g node-gyp**<br/>
***npm install --g --production windows-build-tools**

### Public Api End points
<ul>
<li>POST: api/authenticateuser <b>(To validate user login, request-body ({username:'email@.com',password:'password'}))</b></li>
<li>POST: api/user <b>(To create user account, request-body ({username:'email@.com',password:'password',fullName:'test'}))</b></li>
</ul>

### Private Api End Points ( These end point need Authorization header)
<ul>
<li>GET: api/authenticate <b>(To check whether request token is valid or not)</b></li>
<li>GET: api/user/:fullName <b>(To get user by Full Name)</b></li>
</ul>