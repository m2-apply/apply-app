import React, { useState } from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
//import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

const CLIENT_ID = 'linkedin-client-id';
// const REDIRECT_URI = 'http://localhost:3000';
const SCOPES = ['r_liteprofile', 'r_emailaddress']; // Adjust scopes as needed

const LoginPage: React.FC = () => {
    const [userProfile, setUserProfile] = useState<any | null>(null);

    const handleSuccess = (data: any) => {
        // 'data' contains access_token and other user-related info
        console.log('LinkedIn Data:', data);

        // Make API calls to LinkedIn endpoints using 'data.access_token' if needed

        setUserProfile(data);
    };

    const handleFailure = (error: any) => {
        console.error('LinkedIn Error:', error);
    };

    const { linkedInLogin } = useLinkedIn({
        clientId: CLIENT_ID,
        redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
        onSuccess: handleSuccess,
        onError: handleFailure,
    });

    return (
        <div>
            {userProfile ? (
                <div>
                    <h1>Welcome, {userProfile.localizedFirstName}!</h1>
                    {/* You can display user details here */}
                </div>
            ) : (
                <img
                    onClick={linkedInLogin}
                    //src={linkedin}
                    alt="Sign in with Linked In"
                    style={{ maxWidth: '180px', cursor: 'pointer' }}
                />
            )}
        </div>
    );
};

export default LoginPage;