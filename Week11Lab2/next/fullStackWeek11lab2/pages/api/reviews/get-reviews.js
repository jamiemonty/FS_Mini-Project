async function handler(req, res) {
  try {
    const response = await fetch('http://localhost:8000/getReviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mountainId: req.body.mountainId })
    });
    
    if (!response.ok) {
      return res.json([]);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.json([]);
  }
}

export default handler;
