import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'

const AppBar=()=>{
    return (
            <div className="border-b flex px-10 py-4 justify-between ">
                <div className="font-bold">
                    MyDraw
                </div>
                <div className='flex'>
                    <div className='mx-3'>Hello</div>
                    <div><FontAwesomeIcon icon={faUser} /></div>
                </div>
                
            </div>
        
    )
}

export default AppBar;