'use client'
import { useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../redux/store'
import { setUser } from '../redux/userSlice'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Image from 'next/image'
import { kanit } from '../utils/Fonts'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const { data: session, status } = useSession()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  useEffect(() => {
    const initializeUser = async () => {
      try {
        if (status === 'authenticated' && session?.user?.email) {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/get-user`, { email: session.user.email })
          const user = response.data.data.user
        
          if (user) {
            storeRef.current?.dispatch(setUser({
              id: user._id.toString(),
              email: user.email,
              username: user.username,
              imageUrl: user.imageUrl,
              bioDesc: user.bioDesc,
            }))
          }
        }
      } catch (error) {
        console.error('Failed to initialize user:', error)
      } finally {
        setIsInitialized(true)
      }
    }

    initializeUser()
  }, [session, status])

  if (!isInitialized) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <div className="lg:w-[120px] lg:py-0 max-w-[80px] min-w-[80px] py-2 h-auto rounded-full overflow-hidden">
          <Image src="/logo.png" width={200} height={500} alt="Logo" priority={true} />
        </div>
        <div className={` lg:text-4xl text-3xl logo-text font-bold ${kanit.className}`}>Kartal</div>
      </div>
    )
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
