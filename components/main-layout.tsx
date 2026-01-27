import ChildrenInterface from '@/interfaces/children-interface'
import  { FC } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import 'animate.css';

const MainLayout: FC<ChildrenInterface> = ({children}) => {
  return (
    
    <AntdRegistry>
        <div>
            {children}
        </div>
    </AntdRegistry>
  )
}

export default MainLayout