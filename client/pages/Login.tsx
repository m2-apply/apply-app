import React, { useState } from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

const CLIENT_ID = 'linkedin-client-id';
// const REDIRECT_URI = 'http://localhost:3000';
const SCOPES = ['r_liteprofile', 'r_emailaddress']; // Adjust scopes as needed

interface LinkedInLoginProps {
    children: (props: { linkedInLogin: () => void }) => React.ReactNode;
}

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

    return (
        <div>
            {userProfile ? (
                <div>
                    <h1>Welcome, {userProfile.localizedFirstName}!</h1>
                    {/* You can display user details here */}
                </div>
            ) : (
                <LinkedIn
                    clientId={CLIENT_ID}
                    redirectUri={`${window.location.origin}/linkedin`}
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                >
                    {({ linkedInLogin }: { linkedInLogin: () => void }) => (
                        <img
                            onClick={linkedInLogin}
                            src={linkedin}
                            alt="Sign in with LinkedIn"
                            style={{ maxWidth: '180px', cursor: 'pointer' }}
                        />
                    )}
                </LinkedIn>
            )}
        </div>
    );
};

export default LoginPage;