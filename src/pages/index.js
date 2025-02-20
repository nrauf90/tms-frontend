// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

export const getHomeRoute = role => {

  //console.log(":::::: IN ROLE ::::::::::", role);
  
  if (role !== undefined) return '/SuperAdminHome'

  //else if(role.label === 'company_admin') return '/SuperAdminHome'

  else return '/acl'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    //console.log("::::: IN USE EFFECT 1 :::::::::");
    if (!router.isReady) {
      return
    }

    //console.log("::::::: IN USE EFFECT 2 ::::::::");
    //console.log(auth);
    //console.log(auth.user);
    if (auth.user && auth.user.role) {
      //console.log(":::::::: IN IF :::::::::");
      const homeRoute = getHomeRoute(auth.user.role)

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner />
}

export default Home
