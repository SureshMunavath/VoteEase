import AdminLoginPage from './AdminLoginPage'
import VoterLoginPage from './VoterLoginPage'
export default  function LoginPage()
{
    return (
        <div className="login" style={{display:'flex'}}>
            <VoterLoginPage/>
            <AdminLoginPage/>
        </div>
    )
}