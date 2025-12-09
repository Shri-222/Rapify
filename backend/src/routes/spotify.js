

router.get('/me', async (req, res) => {
    const access_token = req.headers.authorization?.split(' ')[1];

    if(!access_token) { 
        return res.status(401).json({ error: "Missing access token" });
    } 
    
    try {
        
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers : {
                Authorization : `Bearer ${access_token}`
            }
        });

        res.json(response.data);

    } catch (error) {
        console.log("Profile Error:", error);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
})

export default router;