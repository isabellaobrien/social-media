# Share

![web app on different screensizes](readme-images/amiresponsive.png)


Share is a social media app where users can share images, thoughts and easily interact with other users. Users can register for an account which gives them access to the full functionality of the app. With a Share account a user can:
* Create,edit and delete posts 
* Like / unlike posts
* Create, edit and delete comments on posts 
* Like / unlike comments 
* Create, edit and delete replies to comments  
* See other users replies 
* Like other users replies
* Follow / unfollow users 
* Have their own profile and image where users can find out a bit more about them.

take a look at [Share](https://react-social-media-app-3baabd8c3ebb.herokuapp.com/)!

take a look at the [api](https://pp5-api-backend-822273010b59.herokuapp.com/)!

![website wireframe](readme-images/wireframe.jpg)
![api model structure](readme-images/models.jpg)

These are images of the initial wireframes for  my project. I created the wireframes using a platform called [Miro](https://miro.com/). The yellow post-it contain containing the app model structure for the api which was created using the django rest framework.

## Features:

#### Sign up page:
![sign up form](readme-images/signup.png)
* It allows the user to sign up for an account  on share.
* The user will be asked to provide their username, password and to confirm their password. 
* The registration form gives the user the chance to join share and  have full access to the app.

#### Sign in page 
![sign in form](readme-images/signin.png)
* It allows the user to login to share  and access their profile.
* Once the user has logged in, the user has access to all the navbar links.

#### Navigation
* The navigation bar is situated at the top of each page and contains the website logo which links to the home page.
* If the user is logged in the navigation bar contains links to the add post, home, liked, feed, sign out and user profile.
![logged in navbar](readme-images/loggedin-navbar.png)
* If the user is not logged in the navbar contains links to home, sign in and sign up.
![logged out navbar](readme-images/loggedout-navbar.png)
* The navigation bar gives the user easy access to each part of the website, on all devices.

#### Home page
* The home page can be accessed via the app logo or the home link in the navbar.
* The home page contains a list of all the posts underneath the search bar.
* Each post contains: the post author's profile image and name which links to their profile, a post image  or  default placeholder image, a like and a comment button,  the  post title , the post content , and the post date .
[screenshots of homepage ]

* #### Navigation:
The navigation bar is situated at the top of each page and contains the website logo which links to the home page.
The navigation bar also contains links to the add post, home, liked, feed, sign out and profile (if the user is logged in). The navbar contains links to home, sign in and sign up (if the user is not logged in).

* The navigation bar gives the user easy access to each part of the website, on all devices.

### Home page / landing page:
* The landing page contains a list of all the posts underneath the search bar.Each post contains: the user's profile, an image  or  default placeholder image, followed by a like and a comment button,  the title , the post’s content , and the post’s date .

### Post page
* Once you click the post image or comment button you reach the post  page. And the comment section can be accessed. 
* On desktops the popular profiles can be seen.

### Comment section
* If the user is not logged in, there’ll be a message letting them know to login.
* If the user is logged in and there are no comments the user there will be a message suggesting that the user leave one via a form. If there are any comments they will appear under the form. 
* Each comment is composed of: profile picture and username, the comment, the like and reply buttons and the date. 
* The comment owner can edit( takes the user to the edit form)  and delete ( removes the comment from the comment section )the comment via a drop down menu. 
* The edit form is pre-filled with the comment content and button to cancel(go back to the comment section without making an edit ) and a save button. 
* Via the like button the user can like and unlike comments consequently the like count will go up and down by one. And the icon will change from outline to filled and vice versa.
* Once the reply button is clicked the comment reply form appears and all the previous replies to the comment appear if there are any.
* The comment owner can edit( takes the user to the edit form)  and delete ( removes the comment from the comment section )the reply via a drop down menu. 
* The edit form is pre-filled with the reply  content and button to cancel(go back to the comment section without making an edit ) and a save button. 

### Popular profiles 
* The popular profiles section appears on the home page, the post page and the profile page on the desktop view .
* On mobile the popular profiles section only appears at the top of the home page. 
* The section contains profiles to follow and unfollow via the follow/unfollow buttons .

### Profile page
* The profile page is reached via the link in the navbar or by clicking any of the profile pictures around the app.  
* The profile page contains a section about the user:  large profile picture, the number of posts a user has made, the number of followers the user has and the number of profiles the user follows. On the same page there’s a list of posts made by the user. 
* The profile owner can edit their profile picture, username and password via a drop down menu. 
* The edit forms are pre-filled  and there are buttons to cancel(go back to the comment section without making an edit ) and a save button. 

### Register
* It allows the user to sign up for an account  on share.
* The user will be asked to provide their username, password and to confirm their password. 
* The registration form gives the user the chance to join share and  have full access to the app.

### Login
* It allows the user to login to share  and access their profile.
* Once the user has logged in, the user has access to all the navbar links ( which are…)

### Add  post page 
* It allows the user to create a post. Each post can contain a title, image and content. If an image isn’t provided there’ll be a default.

### Edit  post page 
* It allows the user to edit  a post of theirs. Any field of the post can be updated.

### Delete post
* It allows a user to delete a post.


| action | expected behaviour | pass/fail |
|--------|--------------------|-----------|
| Enter URL in browser |the landing page of the website should display on the screen | pass |
| Click Home on the navigation bar | the home page should show up on the screen | pass |
| Click the logo on the navbar | the home page should appear | pass |
| Click add post on the navigation bar | The form to add a post should appear | pass |
| Click liked on the navigation bar | All the posts that have been liked by a user should appear | pass |
| Click feed on the navbar | all the posts by users the user follows should appear | pass |
| Click the profile on the nav bar | the user should be redirected to their profile page | pass |
| Click sign out on the navigation bar | You should be redirected to the home page. You’ll only be able to see “sign in”, “sign up”, and home. | pass |
| (logged out) Click Sign up. | You should be redirected to a registration form. | pass |
| Enter URL in browser |the landing page of the website should display on the screen | pass |
| Click Sign in (logged out) | You should be redirected to a login form. | pass |
| Click the dropdown in the user’s profile page. | Three options should appear: edit profile, edit username and change password. | pass |
| Click the ‘follow’ button on a post. | The follow button will become an unfollow button. | pass |
| Click the “like” button under the post or comment | The like count should go up. If the button gets clicked again the count should go down. | pass |
| Click the comment button | you should be redirected to post page where the comment section can be found | pass |
| If you create a comment via the form and click the comment button | the comment count should increase by one. | pass |
| Click the dropdown near the username | Two options should appar: “edit”, “delete”. | pass |
| Click the “edit” link. | The user should be redirected to the edit post form | pass |
| Click the edit button  | the post should appear edited | pass |
| Click the cancel button | the user should be taken back to the post | pass |
| Click the “delete link” | the post, comment or reply should be removed from the app | pass |
| Click the reply icon | the reply form should appear and if there are any previous replies they’ll appear too. | pass |
| Click the hide button | the reply form should disappear and if there are any previous replies they’ll disappear too | pass |

## Deployment(back end)
steps:
* I made sure the libraries used were stored in the requirements.txt file.
* I clicked on "create an app" in heroku, I named the app and selected my region.
* I went to settings and added the config vars I needed.
* I then went to deploy, connected to github.
*  I then manually deploy my project.




















