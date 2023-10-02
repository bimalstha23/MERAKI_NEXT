export const getGoogleUrl = (from: string) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

    const origin = location?.origin;
    const redirectUrl = `${origin + from}`;
    console.log(redirectUrl, 'redirectUrl')
    const options = {
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL as string,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID as string,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
        state: redirectUrl,
    };


    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
};


export const truncateText = (text: string, maxCharacters: number) => {
    if (text.length > maxCharacters) {
        return text.substring(0, maxCharacters) + '...';
    }
    return text;
}
