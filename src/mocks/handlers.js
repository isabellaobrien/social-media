import { rest } from "msw";

const baseURL = "https://drf-api-rec.herokuapp.com/";


export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk:7,
        username:"apple",
        email:"",
        first_name:"",
        last_name:"",
        profile_id:7,
        profile_image:"https://res.cloudinary.com/dfj3ee3tl/image/upload/v1/media/../default_profile_tl2tw0"}
      )
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];