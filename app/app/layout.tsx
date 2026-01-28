import AppLayout from '@/components/app/app-layout'
import ChildrenInterface from '@/interfaces/children-interface'
import  { FC } from 'react'

const AppLayoutRouter: FC<ChildrenInterface> = ({children}) => {
  return (
    <AppLayout>
        {children}
    </AppLayout>
  )
}

export default AppLayoutRouter