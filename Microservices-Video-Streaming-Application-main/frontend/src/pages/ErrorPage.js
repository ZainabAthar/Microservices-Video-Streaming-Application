import {useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation/MainNavigation.js";
import PageContent from "../components/PageContent.js"
import { RequireAuth } from "react-auth-kit";
const ErrorPage=()=>{
const error=useRouteError()
let title="An error Occured";
let message="Something went wrong";
if(error.status===500){
    message=error.data.message
}
if(error.status===400){
    title="Page or Resource not Found"
    message="There is No page or resource present at the current url"
}


return (
    <>
    <RequireAuth loginPath="/login">
        <MainNavigation />
    <PageContent title={title}> {message} </PageContent>
      </RequireAuth>
    </>
)

}
export default ErrorPage;