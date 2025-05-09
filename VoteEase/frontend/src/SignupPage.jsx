import AdminSignup from './AdminSignup';
import VoterSignup from './VoterSignup';
export default function SignupPage()
{
  return (
  <di style={{display:'flex'}}>
  <VoterSignup/>
  <AdminSignup/>
    </di>
  )
}